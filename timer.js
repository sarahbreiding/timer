
var userTime = $('.time-input').val() * 60000;
var previousTime;
$('.pauseButton').hide();
$('.resetButton').hide();
var isWorkPaused = false;
var isBreakPaused = false;

function getTimeRemaining(){
  currentTime = Date.now();
  currentTime = new Date().getTime();
  var timeElapsed = currentTime - previousTime;
  previousTime = currentTime;
  userTime = userTime - timeElapsed;
  var seconds = Math.floor((userTime/1000) % 60);
  var minutes = Math.floor((userTime/1000/60) % 60);
  return {
    'total': userTime,
    'minutes': minutes,
    'seconds': seconds,
  };
}


function createClock(){
  var timeinterval = setInterval(function(){
    var t = getTimeRemaining();
    //console.log(t);
    $('.workClock').html(t.minutes + ':' + t.seconds);
    if (isWorkPaused){
      $('.workClock').html(t.minutes + ':' + t.seconds);
      clearInterval(timeinterval);
    } else if (isBreakPaused){
      $('.breakClock').html(t.breakMinutes + ':' + t.breakSeconds);
      $('.workClock').html('0:00');
      clearInterval(timeinterval);
    } else if (t.seconds < 0 && t.total < 0){
      $('.workClock').html('0:00');
      clearInterval(timeinterval);
     }
     $('.resetButton').click(function(){
      clearInterval(timeinterval);
      userWorkTime = $('#work-time-input').val() * 60000;
      userBreakTime = $('#break-time-input').val() * 60000 + userWorkTime;
    })
  },10);
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
    userBreakTime = $('#break-time-input').val() * 60000 + userWorkTime;
  } else if (inputId === 'break-time-input'){
    //userWorkTime = $('#work-time-input').val() * 60000;
    userBreakTime = newVal * 60000 + userWorkTime;
  }
})

$('#work-time-input').change(function(){
  userWorkTime = $(this).val() * 60000;
  userBreakTime = $('#break-time-input').val() * 60000 + userWorkTime;
});

$('#break-time-input').change(function(){
  userBreakTime = $(this).val() * 60000 + userWorkTime;
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

//get oval to work on breaktime, start it at 12o clock
