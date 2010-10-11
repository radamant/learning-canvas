const FPS = 30;
var context
var mySquare;

var initGraphics = function(){
  var canvas = document.getElementById("graphics");
  context = canvas.getContext('2d');
  mySquare = square(context);

  setInterval(function(){ draw(context); }, 1000 / FPS)
};

var draw = function(context){
  context.fillStyle = "#000";
  context.fillRect(0,0, context.canvas.width, context.canvas.height);
  mySquare.draw();
};

var square = function(context){
  var that = {};
  var canvasWidth = context.canvas.width,
      canvasHeight = context.canvas.height,
      iterations = 0,
      width = 100,
      height = 100,
      red = 250,
      speed = 1;

  that.draw = function(){
    context.save();
    context.translate((canvasWidth / 2), (canvasHeight / 2))
    context.rotate(angle());
    context.shadowOffsetX = 20.0;
    context.shadowOffsetY = 5.0;
    context.shadowBlur = 500.0;
    context.shadowColor = "#630";
    context.translate(-(width / 2), -(height / 2));
    context.fillStyle = "rgb(:red, :green, 0)".replace(":red", red()).replace(":green", green())
    context.fillRect(0, 0, width, height)
    context.restore();
    iterations += 1;
  };

  var red = function(){
    var red =  Math.abs(Math.sin(iterations / 500)) * 255;
    red = Math.ceil(red);
    return red;
  }

  var green = function(){
    var green = Math.abs(Math.sin(iterations / 200)) * 150;
    green = Math.ceil(green);
    green += 50;
    return green;
  }

  var angle = function(){
    // var sineWave = (Math.sin(iterations / FPS) + 1) / 2
    var sineWave = Math.sin(iterations / 5000);
    // console.log(Math.abs(sineWave));
    var angle = Math.abs(sineWave) * 360;
    return angle;
  }

  return that;
}

var drawSquare = function(context, color, x, y){
  context.fillStyle = color;
  context.fillRect(0, 0, 50, 50);
};