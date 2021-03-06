var Snake = function (board, dimension) {
  this.dimension = dimension;
  this.segments = [[1,1]]; //this is the starting point
  this.direction = [0,0]; // this is the default starting direction
  this.board = board;
  this.addTo = 0;

  this.eat = new Audio();
  this.eat.src = "extras/eat.wav";
  this.die = new Audio();
  this.die.src = "extras/gameover.wav";
  this.die.play();
}

Snake.prototype.move = function() {

  var new_spot = [this.segments[0][0] + this.direction[0], this.segments[0][1] + this.direction[1]];

  this.segments.unshift(new_spot);

  // if youre not eating something, you pop.
  if (!this.board.checkEat(new_spot)) {
    if(this.addTo === 0) {
    this.segments.pop();
  }
  } else { //if you ARE eating something, you increment the addTo
    this.addTo += 3;
  }

  if (this.addTo > 0) {
    this.addTo--;
  }

  return this.checkCollision(new_spot);
}

Snake.prototype.checkCollision = function (new_spot) {
  //if snake went off board
  if (new_spot[0] > this.dimension-1 || new_spot[0] < 0 || new_spot[1] > this.dimension-1 || new_spot[1] < 0 ){
    this.die.play();
    return true;
  }

  //if snake collided with self
  for(var i = 1; i < this.segments.length; i++){
    if(this.segments[i][0] === new_spot[0] && this.segments[i][1] === new_spot[1]){
      this.die.play();
      return true;
    }
  }
  return false;
}
/////////////////////////////////////////////////////////////

var Board = function (dimension) {
  this.dimension = dimension;
  this.snake = new Snake(this, dimension);
  this.apples = [];
}

Board.prototype.generateApple = function(){
  while(this.apples.length === 0){
    var x = Math.floor(Math.random()*this.dimension);
    var y = Math.floor(Math.random()*this.dimension);
    var hit = false;
    for(var i = 0; i < this.snake.segments.length; i++){
      if(hit === true || (this.snake.segments[i][0] === x && this.snake.segments[i][1] === y)){
        var hit = true;
      }
    }
    if(hit === false){
      this.apples = [x,y];
    }
  }
}

Board.prototype.checkEat = function (new_spot) {
  if (new_spot[0]=== this.apples[0] && new_spot[1]=== this.apples[1]) {
    this.apples = [];
    this.snake.eat.play();
    return true;
  }
}
