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

  // function drawTriangle1() {
  //   //This ensures we clear the code out before attempting to re-draw the triangle
  //   context1.clearRect(0, 0, canvas.width, canvas.height)
  //   //the character
  //   context1.beginPath();
  //   context1.moveTo(300 + xPos1, 200 + yPos1);
  //   context1.lineTo(170 + xPos1, 150 + yPos1);
  //   context1.lineTo(230 + xPos1, 150 + yPos1);
  //   context1.closePath();
  //   //outline
  //   context1.lineWidth = 10;
  //   context1.strokStyle = "rgba(102, 102, 102, 1)"
  //   context1.stroke();
  //   //fill the shape
  //   context1.fillStyle = "rgba(255, 204, 0, 1)"
  //   context1.fill();
  // }
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
// var xPos1 = 0;
// var yPos1 = 0;
//
// var xPos2 = 70;
// var yPos2 = 0;
//
// context2.rect(xPos2, yPos2, 50, 50);
// context2.stroke();
//
// context1.rect(xPos1, yPos1, 50, 50);
// context1.stroke();
//
// function move(e){
//   // alert(e.keyCode);
//
//   if(e.keyCode==39){
//     xPos1+=15;
//   }
//   if(e.keyCode==37){
//     xPos1-=15;
//   }
//   if(e.keyCode==38){
//     yPos1-=15;
//   }
//   if(e.keyCode==40){
//     yPos1+=15;
//   }
//
//   if(e.keyCode==68){
//     xPos2+=15;
//   }
//   if(e.keyCode==65){
//     xPos2-=15;
//   }
//   if(e.keyCode==87){
//     yPos2-=15;
//   }
//   if(e.keyCode==83){
//     yPos2+=15;
//   }
//
//   canvas.width=canvas.width;
//   context1.rect(xPos1, yPos1, 50, 50);
//   context1.stroke();
//
//   context2.rect(xPos2, yPos2, 50, 50);
//   context2.stroke();
// }
//   document.onkeydown = move;
