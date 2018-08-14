$(function(event){
  //Reference to the html element
  var canvas = document.querySelector("#canvas");
  var context = canvas.getContext('2d');
  var context1 = canvas.getContext('2d');

  var xPos = 0;
  var yPos = 0;

  var xPos1 = 0;
  var yPos1 = 0;

  function drawTriangle() {
    //This ensures we clear the code out before attempting to re-draw the triangle
    context.clearRect(0, 0, canvas.width, canvas.height)
    //the character
    context.beginPath();
    context.moveTo(200 + xPos, 100 + yPos);
    context.lineTo(170 + xPos, 150 + yPos);
    context.lineTo(230 + xPos, 150 + yPos);
    context.closePath();
    //outline
    context.lineWidth = 10;
    context.strokStyle = "rgba(102, 102, 102, 1)"
    context.stroke();
    //fill the shape
    context.fillStyle = "rgba(255, 204, 0, 1)"
    context.fill();
  }

  //call function
  drawTriangle();
  // drawTriangle1();
  //Set apart keypressed and released as two different events
  window.addEventListener("keydown", keysPressed, false);
  window.addEventListener("keyup", keysReleased, false);
  //Set an array to store multiple key inputs
  var keys = []

  function keysPressed(e){
    //store an entry for every key pressed
    keys[e.keyCode] = true;
      //player yellow triangle
      //left key pressed
      if (keys[37]){
        xPos -= 10;
        if (xPos <= -170){
          xPos += 10;
        }
      }
      //right key pressed
      if (keys[39]){
        xPos += 10;
        if (xPos >= 370){
          xPos -= 10;
        }
      }
      //up key pressed
      if (keys[38]){
        yPos -= 10;
        if (yPos <= -100){
          yPos += 10;
        }
      }
      // down key pressed
      if (keys[40]){
        yPos += 10;
        if (yPos >= 450){
          yPos -= 10;
        }
      }
    //Stop the page from using the default input of keyboard inputs
    e.preventDefault()
    drawTriangle();
  }
  function keysReleased(e){
    //mark keys that are keysReleased
    keys[e.keyCode] = false;
  }
})
