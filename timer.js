var userWorkTime = 1;
var userBreakTime = 1;
var msArr = [msLeft, msBreakLeft];
var msLeft = userWorkTime * 60000;
var msBreakLeft = userBreaktime * 60000;
var previousTime;
$('.pauseButton').hide();
$('.resetButton').hide();
var isPaused = false;

function getTimeRemaining(){
  var currentTime = Date.now();
  var timeElapsed = currentTime - previousTime;
  previousTime = currentTime;
  msLeft = msLeft - timeElapsed;
  var seconds = Math.floor((msLeft/1000) % 60);
  var minutes = Math.floor((msLeft/1000/60) % 60);
  return {
    'total': msLeft,
    'minutes': minutes,
    'seconds': seconds,
  };
}

var oval = [Math.PI/8, Math.PI/4, 3*Math.PI/8, Math.PI/2, 5*Math.PI/8, 3*Math.PI/4, 7*Math.PI/8, Math.PI, 9*Math.PI/8, 5*Math.PI/4, 11*Math.PI/8, 3*Math.PI/2, 13*Math.PI/8, 7*Math.PI/4, 15*Math.PI/8, 2*Math.PI];
// var ovalSegments = [];
// function getOvalSegments(endtime){
//   var t = getTimeRemaining();
//   var segment = t.total/16;
//   for (var i = 15; i >= 0; i--){
//     ovalSegments.push((Math.ceil(segment * i/1000))*1000);
//   }
// }
// getOvalSegments(deadline);

function createWorkClock(clock, circleId){
  var timeinterval = setInterval(function(){
    var t = getTimeRemaining();
    console.log(t);
    $(clock).html(t.minutes + ':' + t.seconds);
    // for (var i = 0; i < ovalSegments.length; i++){
    //   if (t.total === ovalSegments[i]){
    //     drawCircle(oval[i], circleId);
    //   }
    // }
    if (isPaused){
      $(clock).html(t.minutes + ':' + t.seconds);
      clearInterval(timeinterval);
    } else if (t.minutes === 0 && t.seconds === 0){
      clearInterval(timeinterval);
      //and start break interval get additional minutes and seconds and recall the interval and use the other values for seconds and minutes. when add the zero thing here too this reaches zero  start the function again


      //var canvas = document.getElementById('breakCircle');
      //var ctx = canvas.getContext("2d");
      //ctx.clearRect(0, 0, 500, 500);
      //var breaktime = new Date(new Date().getTime() + userBreaktime*60000);
      //createBreakClock('.breakClock', 'breakCircle');
    }
  },1000);
}



$('.startButton').click(function(){
  previousTime = Date.now();
  if (isPaused) {
    isPaused = false;
    createWorkClock('.workClock', 'workCircle');
  } else {
   createWorkClock('.workClock', 'workCircle');
  }
  $('.startButton').hide();
  $('.pauseButton').show();
  $('.resetButton').show();
})

$('.pauseButton').click(function(){
  isPaused = true;
  $('.startButton').show();
  $('.resetButton').show();
  $('.pauseButton').hide();
})

$('.resetButton').click(function(){
  $('.resetButton').hide();
  $('.startButton').show();
})

function drawCircle(angle, id) {
    var mainCanvas = document.getElementById(id);
    var mainContext = mainCanvas.getContext('2d');
    mainContext.beginPath();
    mainContext.arc(200, 200, 150, 0, angle, false);
    mainContext.lineWidth = 5;
    mainContext.strokeStyle = '#66CC01';
    mainContext.stroke();
  }


