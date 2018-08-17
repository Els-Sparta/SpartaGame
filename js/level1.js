$(function(event){
  //Reference to the html element
  // $("#start").on("click" draw());
  // var canvas = document.getElementById("#canvas")
  var canvas = $("#canvas");
  // var scores = getElementByI

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
  var turn = 0
  var player1 = false;
  var player2 = false;
  var score1;
  var score2;
  var player = {
      x: 0,
      y: 0
  }
  var timer;
  //whenever this function is called, set timer to run and if a parameter is being passed through, clear the interval.
  var time = 0;
  function scoreTimer(){
    timer = setInterval(function(){
      time++;
      $('.time').html(time);
    }, 1000)
    // if(firstscore){
    //   clearInterval(timer);
    // }
    // console.log(timer);
  }
  //function which will draw the maze, player and exit
  function draw(firstdude){
    $('#start').hide();
    if (firstdude==1) {
      // debugger;
      player1 = true;
    }
    else if (firstdude == 2) {
      player2 = true;
    }
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
      //set timer
  }
  //Call the draw function so the maze, player and exit can be drawn on cavas
  $('#start').on('click', function(){
    draw(1);
    scoreTimer();
  });
  //function checks if the new space is open or a wall
  // local.Storage.setItem("Player 1", timer);
  function canMove(x, y){
    if ((y >= 0) && (y < board.length) && (x >= 0) && (x < board[y].length) && (board[y][x] != 1) && (board[y][x] != -1)){
      return true;
    }
    else if(board[y][x] == -1){
      $("#win").html("You have completed the maze!");
      // debugger;
      if(player1==true){
        score1 = time;
        console.log(score1);
        // localStorage.setItem("player1", "" + $(".time").text() + "");
        clearInterval(timer);
        time = 0;
        scoreTimer();
        player1 = false;
      }
      if(player2==true){
        // debugger;
        score2 = time;
        console.log(score2);
        clearInterval(timer);
        // var player2score = parseInt($(".time").text()) - parseInt(localStorage.getItem("player1"));
        // console.log(player2score);
        // localStorage.setItem("player2", player2score);
      }
      // $("#victory").html("Time for a victory lap!!!");

      if(player1==false && player2==true){
        // clearInterval(timer);
        if(score1 < score2){
          $("#win").html("Player1 win")
        }
        else if(score2 < score1){
          $("#win").html("Player2 win")
        }
      }
      resetPlayer();
      // scoreTimer();
      draw(2);
      // reset these:-
      // document.getElementById("win").innerHTML = "You have completed the maze!"
      // document.getElementById("victory").innerHTML = "Time for a victory lap!!!"
      // show star button again
      // restart or next players
      // && (document.getElementById("result".innerHTML=localStorage.getItem(timer)))
    }

  }
  //Set apart keypressed and released as two different events
  document.addEventListener("keydown", keysPressed, false);
  document.addEventListener("keyup", keysReleased, false);
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
    // calls the draw function to draw the movement
    draw();
  }
  //The funciton which states the key pressed as false when it is released
  function keysReleased(e){
    //mark keys that are keysReleased
    keys[e.keyCode] = false;
  }
  function resetPlayer(){
    player = {
      x: 0,
      y: 0
    }
  }
  function displayScore(){
    
  }
})
