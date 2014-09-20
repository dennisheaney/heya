var Twit = require('twit');

exports = module.exports = {

  run: function () {
    // gute morgen!
    this.twit = new Twit({
      consumer_key:         process.env.TWIT_API_KEY,
      consumer_secret:      process.env.TWIT_API_SECRET,
      access_token:         process.env.TWIT_ACCESS_TOKEN,
      access_token_secret:  process.env.TWIT_ACCESS_TOKEN_SECRET
    });

    // hi!
    this.user = process.env.HEYA_USER;
    this.list_slug = process.env.HEYA_LIST_SLUG;

    // let's go
    setInterval(this.sayHeya.bind(this), process.env.TWIT_INTERVAL);
  },

  sayHeya: function () {
    var self = this;
    this.fetchList(function (err, list) {
      err && console.log(err);
      list.users && self.fetchStatus(list.users, function (err, tweets) {
        tweets.length && console.log(tweets[0].text);
      });
    });
  },

  fetchList: function (next) {
    this.twit.get(
      'lists/members', 
      { slug: this.list_slug, owner_screen_name: this.user },
      function (err, data, res) {
        return next(err, data);
      }
    );
  },

  fetchStatus: function (list, options, next) {
    // h!olle
    if ('function' === typeof options) {
      next = options;
      options = {
        random : false,
        statusCount: 1
      };
    }

    var index = 0;
    if (options.random) {
      index = Math.floor(Math.random() * list.length);
    }

    if (index < list.length) {
      var user = list[index];
      return this.twit.get(
        'statuses/user_timeline', 
        { screen_name: user.screen_name, count: options.statusCount }, 
        next
      );
    }

    return next(null, false);
  }

};
