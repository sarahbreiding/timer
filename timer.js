var userTime;
var previousTime;
var isPaused = false;
var timeSegments = [];
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
    //console.log(t);
    $(clockDiv).html(t.minutes + ':' + t.seconds);
    for (var j = 0; j < timeSegments.length; j++){
      if (t.total <= timeSegments[j]){
        drawHourGlass(hourGlassCords,j);
      }
    }
    if (isPaused){
      $(clockDiv).html(t.minutes + ':' + t.seconds);
      clearInterval(timeinterval);
    } else if (t.seconds < 0 && t.total < 0){
      $(clockDiv).html('0:00');
      clearInterval(timeinterval);
      timeSegments = [];
      var sound = new Howl({
        urls: ['TempleBell.mp3']
      }).play();
      $('.startButton').show();
      $('.resetButton').hide();
      $('.pauseButton').hide();
    }
    $('.resetButton').click(function(){
      $(clockDiv).empty();
      clearInterval(timeinterval);
      drawHourGlass(hourGlassCords, 4);
      timeSegments = [];
      if ($(this).attr('id') === 'resetWork'){
        $('#startWork').show();
        $('#pauseWork').hide();
        $('#resetWork').hide();
      } else {
        $('#startBreak').show();
        $('#pauseBreak').hide();
        $('#resetBreak').hide();
      }
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
    var timeFifths = userTime/4;
    for (var i = 4; i >= 0; i--){
      timeSegments.push(timeFifths * i);
    }
    if ($('.fa-hourglass-o').hasClass('fa-hourglass-180')){
      $('.fa-hourglass-o').removeClass('fa-hourglass-180');
    } else {
      $('.fa-hourglass-o').addClass('fa-hourglass-180');
    }
    createClock('.' + clockClass);
  }
  if ($(this).attr('id') === 'startWork'){
    $('#startWork').hide();
    $('#pauseWork').show();
    $('#resetWork').show();
  } else {
    $('#startBreak').hide();
    $('#pauseBreak').show();
    $('#resetBreak').show();
  }
})

$('.pauseButton').click(function(){
  isPaused = true;
  if ($(this).attr('id') === 'pauseWork'){
    $('#startWork').show();
    $('#pauseWork').hide();
    $('#resetWork').show();
  } else {
    $('#startBreak').show();
    $('#pauseBreak').hide();
    $('#resetBreak').show();
  }
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
})

hourGlassCords = [
  [25, 13, 50, 48, 75, 13],
  [31.25, 21.75, 50, 48, 68.75, 21.25, 25, 83, 50, 74.25, 75, 83],
  [37.5, 30.5, 50, 48, 62.5, 30.5, 25, 83, 50, 65.5, 75, 83],
  [43.75, 39.25, 50, 48, 56.25, 39.25,25, 83, 50, 56.75, 75, 83],
  [25, 83, 50, 48, 75, 83]
];

function drawHourGlass(cords, x) {
    var canvas = document.getElementById('hourglass');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,150,150);
    ctx.beginPath();
    ctx.moveTo(cords[x][0],cords[x][1]);
    ctx.lineTo(cords[x][2],cords[x][3]);
    ctx.lineTo(cords[x][4],cords[x][5]);
    ctx.fill();
    ctx.moveTo(cords[x][6],cords[x][7]);
    ctx.lineTo(cords[x][8],cords[x][9]);
    ctx.lineTo(cords[x][10],cords[x][11]);
    ctx.fill();
  }
drawHourGlass(hourGlassCords, 4);

