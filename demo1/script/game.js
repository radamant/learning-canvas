const FPS = 60;
var context
var myCross;

var initGame = function(){
  var canvas = document.getElementById("graphics");
  context = canvas.getContext('2d');
  myCross = cross(context);

  setInterval(draw, 1000 / FPS)
};

var cross = function(context){
  var img = new Image();
  img.src = "images/cross.png";
  var x = 0,
      y = 0,
      width = 16,
      height = 16,
      speed = 2,
      yDir = 1,
      xDir = 1,
      offset = context.canvas.height / 2,
      sweep = context.canvas.height / 3,
      iterations = 0;

  var that = {};
  that.move = function(){
    if(x < 0 || x + width  >= context.canvas.width){ xDir *= -1; }
    // if(y < 0 || y + height >= context.canvas.width){ yDir *= -1; }
    x += xDir * speed;
    y = offset + (sweep * Math.sin(iterations / FPS));
    iterations += speed;
    that.draw();
  }

  that.draw = function(){
    context.drawImage(img, x, y)
  }

  return that;
}

var draw = function(){
  clearBoard(context);
  myCross.move();
};

var clearBoard = function(){
  context.clearRect(0,0, context.canvas.width, context.canvas.height)
  context.fillRect(0,0, context.canvas.width, context.canvas.height)
}

var drawCross = function(){
  context.drawImage(cross, 0, 0);
}