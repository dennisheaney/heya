var Twit = require('twit');

var app = new Twit({
    consumer_key:         process.env.TWIT_API_KEY,
    consumer_secret:      process.env.TWIT_API_SECRET,
    access_token:         process.env.TWIT_ACCESS_TOKEN,
    access_token_secret:  process.env.TWIT_ACCESS_TOKEN_SECRET
  });

var stream = app.stream('statuses/filter', { track: '#lol', language: 'en' });
stream.on('tweet', function (tweet) {
  console.log(tweet.text);
});
