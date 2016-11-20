const fs = require('fs');
const twitter = require('twitter');
const followers = require('./followers.json');
const moment = require('moment');

let curTweets, aim = 0;
let config = require('./config.json');
let tweet, user = "";

var client = new twitter({
  consumer_key: config.consumerKey,
  consumer_secret: config.consumerSecret,
  access_token_key: config.accessToken,
  access_token_secret: config.accessTokenSecret
});

setInterval(function () {
  for (var i = 0; i < followers.f.length; i++) {
    user = followers.f[i];
    client.get('search/tweets', {q: "#watch"+user}, function(error, tweets, response) {
      curTweets = tweets.statuses[0].user.statuses_count;
      aim = curTweets + 5;
      aim.toString();
      // console.log(tweets.statuses[0].user.statuses_count);
    });
    if(aim.endsWith('00') || aim.endsWith('000') || aim.endsWith('0000') || aim.endsWith('00000')){
      tweetIt(user, 'curTweets')
    }
    let first = aim[0];
    for(i=0; i<aim.length, i++){
      
    }
  }
  // if(){
  //   if(tweets.t.length == countMe && bufferCount != bufferTweets.length){
  //     tweet = bufferTweets[bufferCount];
  //     bufferCount++;
  //     countMe--;
  //     console.log("first if "+tweet);
  //     console.log(tweets.t[0]+"   __"+tweets.t.length+"__"+countMe);
  //   }else if(bufferCount == bufferTweets.length){
  //     countMe = 0;
  //     bufferCount = 0;
  //     tweet = tweets.t[countMe];
  //     console.log("else if "+tweet);
  //   }else{
  //     tweet = tweets.t[countMe];
  //     console.log("else "+tweet+" -- "+countMe);
  //   }
  //   // if(true){
  //
  //   // }//
  //
  // }
// }, 1000);
}, 15000);

function tweetIt(user, number) {
  client.post('statuses/update', {status: "Hey, @"+user+" \nYou have tweeted "+number+" already!"},  function(error, tweet, response) {
    if(error){
      /* lol nothing */
    }else{
      console.log(moment().format("HH:mm:ss_")+"tweeted "+user+" tweeted "+number);
    }
  });
}
