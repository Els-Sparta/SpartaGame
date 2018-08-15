$(function(event){
  //Reference to the html element
  // var canvas = document.getElementById("#canvas")
  var canvas = $("#canvas");
  //Set a 2d array for the board
  var board = [
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
      [ 0, 0, 0, 0, 1, 1, 1, 0, 1, 0],
      [ 0, 1, 1, 0, 0, 0, 1, 0, 1, 0],
      [ 0, 0, 1, 1, 1, 1, 1, 0, 1, 0],
      [ 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
      [ 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [ 1, 0, 1, 0, 1, 0, 0, 1, 1, 0],
      [ 1, 0, -1, 0, 1, 1, 0, 0, 0, 0]
  ];
  //Set a variable for movement along x and y axis
  var player = {
      x: 0,
      y: 0
  }
  //function which will draw the maze, player and exit
  function draw(){
    var width =  canvas.width();
    var blockSize = width/board.length;
    var context = canvas[0].getContext('2d');
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, width, width);
    context.fillStyle="slategrey";
    //Loop through the board array drawing the walls and the goal
    for(var y = 0; y < board.length; y++){
      for(var x = 0; x < board[y].length; x++){
        //Draw a wall whenever x = 1,
        if(board[y][x] === 1){
          context.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
        }
        //Draw the goal where it is '-1' in the array
        else if(board[y][x] === -1){
          context.beginPath();
          context.lineWidth = 5;
          context.strokeStyle = "red";
          context.moveTo(x*blockSize, y*blockSize);
          context.lineTo((x+1)*blockSize, (y+1)*blockSize);
          context.moveTo(x*blockSize, (y+1)*blockSize);
          context.lineTo((x+1)*blockSize, y*blockSize);
          context.stroke();
        }
      }
    }
      //Draw the player
      context.beginPath();
      var half = blockSize/2;
      context.fillStyle = "rgba(255, 204, 0, 1)";
      context.arc(player.x*blockSize+half, player.y*blockSize+half, half, 0, 2*Math.PI);
      context.fill();
  }
  //Call the draw function so the maze, player and exit can be drawn on cavas
  draw();
  //function checks if the new space is open or a wall
  function canMove(x, y){
    if ((y >= 0) && (y < board.length) && (x >= 0) && (x < board[y].length) && (board[y][x] != 1) && (board[y][x] != -1)){
      return true;
    }
    else if(board[y][x] == -1){
      return (document.getElementById("win").innerHTML = "Win!!!") && (document.getElementById("victory").innerHTML = "Time for the victory lap!!!")
    }

  }
  //Set apart keypressed and released as two different events
  window.addEventListener("keydown", keysPressed, false);
  window.addEventListener("keyup", keysReleased, false);
  //Set an array to store multiple key inputs
  var keys = []
  //function for when the the key which moves the character is pressed
  function keysPressed(e){
    //store an entry for every key pressed
    keys[e.keyCode] = true;
    //left key pressed
    if ((keys[37]) && canMove(player.x-1, player.y)){
      player.x--;
    }
    //right key pressed
    if ((keys[39]) && canMove(player.x+1, player.y)){
      player.x++;
    }
    //up key pressed
    if ((keys[38]) && canMove(player.x, player.y-1)){
      player.y--;
    }
    // down key pressed
    if ((keys[40]) && canMove(player.x, player.y+1)){
      player.y++;
    }
    //Stop the page from using the default input of keyboard inputs
    e.preventDefault()
    // calls the drawTriangle function
    draw();
  }
  //The funciton which states the key pressed as false when it is released
  function keysReleased(e){
    //mark keys that are keysReleased
    keys[e.keyCode] = false;
  }
  //call the draw function
  draw();
})
