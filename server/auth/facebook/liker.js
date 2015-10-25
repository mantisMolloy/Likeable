var config = require('../../config/environment');

//calculates liking ratio
module.exports = function(data, likeCallBack, awesomeCallBack, lastLikesCallBack) {

  //count number of pages and scan for traces of kardashian or biebs
  var detected = [];
  var notAwesome = config.notCool;
  var count = 0;

  data.sort(function(a,b){
    return b.created_time.split('-')[0] - a.created_time.split('-')[0];
  });

  data.forEach(function(obj, i) {
    var name = obj.name.toLowerCase();
    notAwesome.forEach(function(notCool, i){
      if(name.indexOf(notCool) > -1) detected.push(obj);
    });
    count++;
  });

  //parse dates and calculate ratio of likes based on the count calculated above
  var end = (data[count-1].created_time).split('-');
  var now = new Date().toLocaleDateString().split('/');

  if(now[2]-end[0] > 1) last = now[2]-end[0] + ' years';
  else if(now[2]-end[0] == 1 && now[0] < end[1]) last = (end[1]-now[0])%12 + ' months';
  else if (now[0] - end[1] > 1) last = now[0] - end[1] + ' months';
  else last = month;

  last25=(data.length>24) ? data.slice(0,25):data;

  awesomeCallBack(detected);
  likeCallBack("liked " + count + " pages in the past " + last);
  lastLikesCallBack(last25);
};
