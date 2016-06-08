var userWorkTime = 1;
var userBreakTime = 1;
var msLeft = userWorkTime * 60000;
var msBreakLeft = userBreakTime * 60000 + msLeft;
var previousTime;
$('.pauseButton').hide();
$('.resetButton').hide();
var isWorkPaused = false;
var isBreakPaused = false;

function getTimeRemaining(){
  var currentTime = Date.now();
  var timeElapsed = currentTime - previousTime;
  previousTime = currentTime;
  msLeft = msLeft - timeElapsed;
  msBreakLeft = msBreakLeft - timeElapsed;
  var seconds = Math.floor((msLeft/1000) % 60);
  var minutes = Math.floor((msLeft/1000/60) % 60);
  var breakSeconds = Math.floor((msBreakLeft/1000) % 60)
  var breakMinutes = Math.floor((msBreakLeft/1000/60) % 60);
  return {
    'total': msLeft,
    'minutes': minutes,
    'seconds': seconds,
    'breakTotal': msBreakLeft,
    'breakSeconds': breakSeconds,
    'breakMinutes': breakMinutes
  };
}

var oval = [Math.PI/8, Math.PI/4, 3*Math.PI/8, Math.PI/2, 5*Math.PI/8, 3*Math.PI/4, 7*Math.PI/8, Math.PI, 9*Math.PI/8, 5*Math.PI/4, 11*Math.PI/8, 3*Math.PI/2, 13*Math.PI/8, 7*Math.PI/4, 15*Math.PI/8, 2*Math.PI];
var ovalSegments = [];
var segment = msLeft/16;
for (var i = 15; i >= 0; i--){
    ovalSegments.push((Math.ceil(segment * i/1000))*1000);
}
console.log(ovalSegments);

function createClock(){
  var timeinterval = setInterval(function(){
    var t = getTimeRemaining();
    console.log(t);
    $('.workClock').html(t.minutes + ':' + t.seconds);
    for (var i = 0; i < ovalSegments.length; i++){
      if (t.total <= ovalSegments[i]){
        drawCircle(oval[i], 'workCircle');
      }
    }
    if (isWorkPaused){
      $('.workClock').html(t.minutes + ':' + t.seconds);
      clearInterval(timeinterval);
    } else if (isBreakPaused){
      $('.breakClock').html(t.breakMinutes + ':' + t.breakSeconds);
      $('.workClock').html('0:00');
      clearInterval(timeinterval);
    } else if (t.breakSeconds <= 0 && t.breakTotal <= 0){
        $('.breakClock').html('0:00');
        msLeft = userWorkTime * 60000;
        msBreakLeft = userBreakTime * 60000 + msLeft;
        previousTime = Date.now();
        t = getTimeRemaining();
        $('.workClock').html(t.minutes + ':' + t.seconds);
     } else if (t.seconds <= 0 && t.total <= 0){
      $('.workClock').html('0:00');
      $('.breakClock').html(t.breakMinutes + ':' + t.breakSeconds);
     }
  //var canvas = document.getElementById('breakCircle');
      //var ctx = canvas.getContext("2d");
      //ctx.clearRect(0, 0, 500, 500);
      //var breaktime = new Date(new Date().getTime() + userBreaktime*60000);
      //createBreakClock('.breakClock', 'breakCircle');
     $('.resetButton').click(function(){
      clearInterval(timeinterval);
      $('.workClock').empty();
      $('.breakClock').empty();
      $('.resetButton').hide();
      $('.pauseButton').hide();
      $('.startButton').show();
    })
  },1000);
}

$('.startButton').click(function(){
  previousTime = Date.now();
  if (isWorkPaused) {
    isWorkPaused = false;
    createClock();
  } else if (isBreakPaused){
    isBreakPaused = false;
    createClock();
  } else {
   createClock();
  }
  $('.startButton').hide();
  $('.pauseButton').show();
  $('.resetButton').show();
})

$('.pauseButton').click(function(){
  if (msLeft > 0){
    isWorkPaused = true;
  } else {
    isBreakPaused = true;
  }
  $('.startButton').show();
  $('.resetButton').show();
  $('.pauseButton').hide();
})
