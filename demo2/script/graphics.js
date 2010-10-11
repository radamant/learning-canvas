const FPS = 30;
const SECONDSBETWEENFRAMES = 1/FPS;

var context
var mySquare;

var initGraphics = function(){
  var canvas = document.getElementById("graphics");
  context = canvas.getContext('2d');
  mySquare = square(context);

  setInterval(function(){ draw(context); }, SECONDSBETWEENFRAMES * 1000)
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
      currentTime = 0,
      width = 100,
      height = 100,
      rotation = 0,
      speed = (Math.PI * 2) / (FPS * 2);

  that.draw = function(){
    currentTime += SECONDSBETWEENFRAMES;

    context.save();
    context.translate((canvasWidth / 2), (canvasHeight / 2))
    context.rotate(angle());
    context.translate(-(width / 2), -(height / 2));
    context.fillStyle = "rgb(:red, :green, 0)".replace(":red", red()).replace(":green", green())
    context.fillRect(0, 0, width, height)
    context.restore();
  };

  var red = function(){
    var red =  Math.abs(Math.sin(currentTime / 15)) * 255;
    red = Math.ceil(red);
    return red;
  }

  var green = function(){
    var green = Math.abs(Math.sin(currentTime / 10)) * 150;
    green = Math.ceil(green);
    green += 50;
    return green;
  }

  var angle = function(){
    rotation += speed;
    if(rotation > (Math.PI * 2)){ rotation = 0 }
    return rotation;
  }

  return that;
}

var drawSquare = function(context, color, x, y){
  context.fillStyle = color;
  context.fillRect(0, 0, 50, 50);
};