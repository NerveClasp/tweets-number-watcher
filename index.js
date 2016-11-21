const fs = require('fs');
const twitter = require('twitter');
const followers = require('./followers.json');
const moment = require('moment');

let curTweets, aim = 0;
let informed;
let config = require('./config.json');
let tweet, user = "";

var client = new twitter({
  consumer_key: config.consumerKey,
  consumer_secret: config.consumerSecret,
  access_token_key: config.accessToken,
  access_token_secret: config.accessTokenSecret
});

setInterval(function () {
  // for (var i = 0; i < followers.f.length; i++) {
    user = followers.f[0];
    client.get('search/tweets', {q: "#watch"+user}, function(error, tweets, response) {
      if (error) {
        console.log(error);
      } else {
        curTweets = tweets.statuses[0].user.statuses_count;
        // curTweets = 8883;
        if (curTweets != NaN) {
          aim = curTweets + 5;
          aim = aim.toString();
        }else{
          aim = "error";
        }

      }

      // console.log(tweets.statuses[0].user.statuses_count);
    });
    // if(aim.endsWith('00') || aim.endsWith('000') || aim.endsWith('0000') || aim.endsWith('00000')){
    //   tweetIt(user, curTweets);
    // }
    if(aim == '8888'){
      tweetIt(user, curTweets, Boolean(aim == informed));
      informed = aim;
    }
  // }
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

function tweetIt(user, number, informed) {
  if (!informed) {
    client.post('statuses/update', {status: "Hey, @"+user+" \nYou have tweeted "+number+" already!"},  function(error, tweet, response) {
      if(error){
        /* lol nothing */
      }else{
        console.log(moment().format("HH:mm:ss_")+"tweeted "+user+" tweeted "+number);
      }
    });
  }else{
    console.log(user+" has tweeted "+number+" times.\nInformed already or milestone was not reached yet.");
  }
  //
  // console.log(user+" tweeted "+number+" tweets!");
}
