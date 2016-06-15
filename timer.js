var userWorkTime = $('#work-time-input').val() * 60000;
var userBreakTime = $('#break-time-input').val() * 60000 + userWorkTime;
// var userWorkTime = userWorkTime * 60000;
// var userBreakTime = userBreakTime * 60000 + userWorkTime;
var previousTime;
$('.pauseButton').hide();
$('.resetButton').hide();
var isWorkPaused = false;
var isBreakPaused = false;

function getTimeRemaining(){
  // currentTime = Date.now();
  currentTime = new Date().getTime();
  var timeElapsed = currentTime - previousTime;
  previousTime = currentTime;
  userWorkTime = userWorkTime - timeElapsed;
  userBreakTime = userBreakTime - timeElapsed;
  var seconds = Math.floor((userWorkTime/1000) % 60);
  var minutes = Math.floor((userWorkTime/1000/60) % 60);
  var breakSeconds = Math.floor((userBreakTime/1000) % 60)
  var breakMinutes = Math.floor((userBreakTime/1000/60) % 60);
  return {
    'total': userWorkTime,
    'minutes': minutes,
    'seconds': seconds,
    'breakTotal': userBreakTime,
    'breakSeconds': breakSeconds,
    'breakMinutes': breakMinutes
  };
}

// var oval = [Math.PI/8, Math.PI/4, 3*Math.PI/8, Math.PI/2, 5*Math.PI/8, 3*Math.PI/4, 7*Math.PI/8, Math.PI, 9*Math.PI/8, 5*Math.PI/4, 11*Math.PI/8, 3*Math.PI/2, 13*Math.PI/8, 7*Math.PI/4, 15*Math.PI/8, 2*Math.PI];
// var ovalSegments = [];
// var segment = userWorkTime/16;
// for (var i = 15; i >= 0; i--){
//     ovalSegments.push((Math.ceil(segment * i/1000))*1000);
// }
//console.log(ovalSegments);

function createClock(){
  var timeinterval = setInterval(function(){
    var t = getTimeRemaining();
    //console.log(t);
    $('.workClock').html(t.minutes + ':' + t.seconds);
    // for (var i = 0; i < ovalSegments.length; i++){
    //   if (t.total <= ovalSegments[i]){
    //     drawCircle(oval[i], 'workCircle');
    //   }
    // }
    if (isWorkPaused){
      $('.workClock').html(t.minutes + ':' + t.seconds);
      clearInterval(timeinterval);
    } else if (isBreakPaused){
      $('.breakClock').html(t.breakMinutes + ':' + t.breakSeconds);
      $('.workClock').html('0:00');
      clearInterval(timeinterval);
    } else if (t.breakSeconds <= 0 && t.breakTotal <= 0){
        $('.breakClock').html('0:00');
        userWorkTime = $('#work-time-input').val() * 60000;
        userBreakTime = $('#break-time-input').val() * 60000 + userWorkTime;
        //previousTime = Date.now();
        //t = getTimeRemaining();
        $('.workClock').html(t.minutes + ':' + t.seconds);
     } else if (t.seconds <= 0 && t.total <= 0){
      $('.workClock').html('0:00');
      $('.breakClock').html(t.breakMinutes + ':' + t.breakSeconds);
     }
  //var canvas = document.getElementById('breakCircle');
      //var ctx = canvas.getContext("2d");
      //ctx.clearRect(0, 0, 500, 500);
      //var breaktime = new Date(new Date().getTime() + userBreaktime);
      //createBreakClock('.breakClock', 'breakCircle');
     $('.resetButton').click(function(){
      clearInterval(timeinterval);
      $('.workClock').empty();
      $('.breakClock').empty();
      $('.resetButton').hide();
      $('.pauseButton').hide();
      $('.startButton').show();
    })
  },10);
}

$('.startButton').click(function(){
  //previousTime = Date.now();
  previousTime = new Date().getTime();
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
  if (userWorkTime > 0){
    isWorkPaused = true;
  } else {
    isBreakPaused = true;
  }
  $('.startButton').show();
  $('.resetButton').show();
  $('.pauseButton').hide();
})

$('.incButton').click(function(){
  var $button = $(this);
  var inputId = $button.closest('div.form').find('input').attr('id');
  var oldValue = $button.closest('div.form').find('input').val();
  var newVal;
  if ($button.text() === '+'){
    newVal = parseFloat(oldValue) + 1;
  } else {
    if (oldValue > 0) {
      newVal = parseFloat(oldValue) - 1;
    } else {
      newVal = 0;
    }
  }
  $button.parent().find('input').val(newVal);
  if (inputId === 'work-time-input'){
    userWorkTime = newVal * 60000;
  }
  else if (inputId === 'break-time-input'){
    userBreakTime = newVal * 60000;
  }
})

$('#work-time-input').change(function(){
  userWorkTime = $(this).val() * 60000;
});

$('#break-time-input').change(function(){
  userBreakTime = $(this).val() * 60000 + userWorkTime;
})

//on change of the input change userWorkTime and userBreakTime

function drawCircle(angle, id) {
    var mainCanvas = document.getElementById(id);
    var mainContext = mainCanvas.getContext('2d');
    mainContext.beginPath();
    mainContext.arc(200, 200, 150, 0, angle, false);
    mainContext.lineWidth = 5;
    mainContext.strokeStyle = '#66CC01';
    mainContext.stroke();
  }
