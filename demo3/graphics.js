const FPS = 30;
const SECONDSBETWEENFRAMES = 1/FPS;
const TIME_BETWEEN_SWEEPS = 2
var context
var currentTime = 0;
var circles = [];
var maxCircles = 19999;

var initGraphics = function(){
  var canvas = document.getElementById("graphics");
  context = canvas.getContext('2d');

  setInterval(function(){ draw(context); }, SECONDSBETWEENFRAMES * 1000)
};

var draw = function(context){
  currentTime += SECONDSBETWEENFRAMES;

  clearField(context);
  renderCircles(context, currentTime);

  if(currentTime > TIME_BETWEEN_SWEEPS){
    currentTime = 0
    maxCircles = circles.length;
  }
};

var clearField = function(context){
  context.fillStyle = "#fff";
  context.fillRect(0,0, context.canvas.width, context.canvas.height);
};

var renderCircles = function(context, currentTime){
  var circle = Circle(context, currentTime);
  circles.push(circle);

  if(circles.length > maxCircles){
    circles.shift();
  }


  for (var i=0; i < circles.length; i++) {
    circles[i].draw();
  };

};

var Circle = function(context, currentTime){
  var that = {};
  var radius = 15.0;
  var width = context.canvas.width - (radius * 2);
  var height = context.canvas.height - (radius * 2);
  var x        = radius + (width * (currentTime / TIME_BETWEEN_SWEEPS)),
      y          = radius + (height - (height * ((1 + Math.sin(currentTime * 6.4)) / 2))),
      radius     = 15.0,
      startAngle = 0,
      endAngle   = Math.PI * 2,
      color      = "rgb(:red, :green, 0)",
      lineWidth  = 5.0,
      renders    = 0;


  that.draw = function(){
    var rad = renders < 10 ? radius + (radius * ((10 - renders) / 7)) : radius;
    context.fillStyle = color.replace(":red", red()).replace(":green", green());
    context.lineWidth = lineWidth;
    context.beginPath();
    context.arc(x, y, rad, startAngle, endAngle, false);
    context.fill();
    renders += 1;
  };


  var red = function(){
    var red =  255 - (Math.abs(Math.sin(renders/(FPS))) * 100);
    red = Math.ceil(red);
    return red;
  }

  var green = function(){
    var green = 180 - (Math.abs(Math.sin(renders/(FPS))) * 150);//Math.abs(Math.sin(renders / 10 )) * 150;
    green = Math.ceil(green);
    return green;
  }


  return that;
}
