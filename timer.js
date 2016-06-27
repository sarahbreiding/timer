var userTime;
var previousTime;
$('.pauseButton').hide();
$('.resetButton').hide();
var isPaused = false;

function getTimeRemaining(){
  var currentTime = Date.now();
  var timeElapsed = currentTime - previousTime;
  previousTime = currentTime;
  userTime = userTime - timeElapsed;
  var seconds = Math.floor((userTime/1000) % 60);
  var minutes = Math.floor((userTime/1000/60) % 60);
  return {
    'total': userTime,
    'minutes': minutes,
    'seconds': seconds
  };
}

function createClock(clockDiv){
  var timeinterval = setInterval(function(){
    var t = getTimeRemaining();
    console.log(t);
    $(clockDiv).html(t.minutes + ':' + t.seconds);
    if (isPaused){
      $(clockDiv).html(t.minutes + ':' + t.seconds);
      clearInterval(timeinterval);
    } else if (t.seconds < 0 && t.total < 0){
      $(clockDiv).html('0:00');
      clearInterval(timeinterval);
      $('.startButton').show();
      $('.resetButton').hide();
      $('.pauseButton').hide();
    }
    $('.resetButton').click(function(){
      $(clockDiv).empty();
      clearInterval(timeinterval);
      $('.startButton').show();
      $('.resetButton').hide();
      $('.pauseButton').hide();
    })
  },10);
}

$('.startButton').click(function(){
  previousTime = Date.now();
  var clockClass = $(this).parent().next('div').attr('class');
  if (isPaused) {
    isPaused = false;
    createClock('.' + clockClass);
  } else {
    var inputId = $(this).closest('div.form').find('input').attr('id');
    userTime = $('#' + inputId).val() * 60000;
    createClock('.' + clockClass);
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
  /*if (inputId === 'work-time-input'){
    userTime = newVal * 60000;
  } else if (inputId === 'break-time-input'){
    //userWorkTime = $('#work-time-input').val() * 60000;
    userBreakTime = newVal * 60000 + userWorkTime;
  }*/
})

/*$('#work-time-input').change(function(){
  userTime = $(this).val() * 60000;
  userBreakTime = $('#break-time-input').val() * 60000 + userWorkTime;
});

$('#break-time-input').change(function(){
  userBreakTime = $(this).val() * 60000 + userWorkTime;
})*/

function drawCircle(angle, id) {
    var mainCanvas = document.getElementById(id);
    var mainContext = mainCanvas.getContext('2d');
    mainContext.beginPath();
    mainContext.arc(200, 200, 150, 0, angle, false);
    mainContext.lineWidth = 5;
    mainContext.strokeStyle = '#66CC01';
    mainContext.stroke();
  }
