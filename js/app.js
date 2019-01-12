// This function defines the Enemy that our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our enemy instances go here
    //x position
    this.x = x;
    //y position
    this.y = y;
    this.speed = speed; // returns a random integer from 1 to 100;

    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //how many pixels the enemy will move on the x axis, enemy only moves in a horizontal/across motion on the x axis
    this.xMove = 101; 
    this.rightYboundary = this.xMove * 5;
    this.restartPos = -this.xMove;
};

// This function is to Update the enemy's position, required method for game. The Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers
    if(this.x < this.rightYboundary){
        // move forward
        // increment x by speed * delta time
        // by dt gives the enemy a constant speed across the game board as the comp loops through code in the game loop
        this.x += this.speed * dt;
    }
    else{
    //reset the Enemy position to a start position. Which i will set off screen so the enemy looks like its running onto the game board
    this.x = this.restartPos;
    }
};

// Draw the enemy on the screen, render() is a required method for the game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Define the Player class with an update(), render() and handleInput() method here i used ES6 to add a Player object with methods on its prototype.
class Player1 {
        constructor(){            
            //the player image so it will show on the gameboard
            this.sprite = 'images/char-boy.png';
            //set how many pixels the player image will move by use the block sizes given in the drawImage function in engine.js
            this.xMove = 50.5; //x axis
            this.yMove = 41.5;  //y axis
            //set a start positions for Player1 on gamebpard canvas so i can reuse it in the game reset method later
            this.xStart = this.xMove * 4;
            this.yStart = this.yMove * 10;
            //x position on gameboard set for player to start on
            this.x = this.xStart;
            //y postion on gamebpard set for player to start on
            this.y = this.yStart;
            //defining a variable for winning the game
            this.won = false;
        }
    //Draw the Player on the screen, this is a required render() method for game and is written in ES6 like this so it is added to the Players  _proto_ chain
    render(){ 
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //handleInput() method is written in ES6 inside the player class and so is added to the players _proto_ chain
    //It handles the input from the arrow keys on the keyboard used to move the player
    //example case 'left' is if x co-ords greater than or equal to xMove co-ord 101 as can be as far over as 404
    //example case 'up' move x co-ordinateds position of player minus 1 xMove whice is -101px to the left
    handleInput(input){     
        switch(input){
            case 'left': 
            if(this.x >= this.xMove){ 
                this.x -= this.xMove; 
            }
            break;

            case 'up': 
            if(this.y >= this.yMove){ //if y co-ords greater than or equal to xMove co-ord 83 as can be as far down board as 415
                this.y -= this.yMove; //move y co-ordinateds position of player minus 1 yMove which is -83px from the top of the game board
            }
            break;
            
            case 'right': 
            if(this.x < this.xMove * 8){
                this.x += this.xMove; //xMoves +101px
            }
            break;

            case 'down': 
            if(this.y < this.yMove * 10){
                this.y += this.yMove;  //yMoves +83px 
            }
            break;
            }
    }         
    //this is the Players update() method written in in ES6 it is added to the Players  _proto_ chain
    //it handles what happens if an Enemy and Player collide in the game and what happens if the player wins
    update(){  
            //Check collision here
            for(let enemy of allEnemies){
            //did player x and y collide with enemy
            //if the players + enemy y axis is the same & enemy x+101 > palyer x & enemy x < player x + 101 reset Player to the begining
            if(this.y === enemy.y && (enemy.x + enemy.xMove/1.5 > this.x && enemy.x < this.x + this.xMove/1.5)){
                    this.resetPlayer1pos();               
                }
            }
            //check if the Player won, did the Player x and y co-ordinates reach final tile
            if(this.y === 0){
                 //console.log('won'); i used this to check if it works at this before i wrote the code below
                this.won = true;
                //After 1 second of player winning open the modal
                setTimeout(function(){
                    openModal();}, 200);               
            };
            
                }
    //Reset Player back to its start position
    resetPlayer1pos(){
        //Set x and y to starting x and y
        this.x = this.xStart;
        this.y = this.yStart;
    } 
};

// Now instantiate your objects so I Placed the Player object in a variable called player and Enemy object in a variable called trolls
const player = new Player1();
const troll1 = new Enemy(-101, 41.5, 325);
const troll2 = new Enemy(-101, 124.5, 250);
const troll3 = new Enemy(-101, 207.5, 400);

// Place all enemy objects in an array called allEnemies
const allEnemies = [];       //empty array called allEnemies
allEnemies.push(troll1, troll2, troll3);    //pushing all the enemy objects i store in the variable called trolls into the allEnemies array   
console.log(allEnemies);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/* Congratulations  Modal will display when player wins*/
function openModal() {   
    modal.style.display = "block";    
}

//the x for closing the modal saved in a variable called closeX
let closeX = document.getElementsByClassName("closeX")[0];

// When the user clicks on <span> (x), close the modal
closeX.onclick = function() {    
    window.location.reload();
};

// reload the page on click of the play again button
const playAgain = document.querySelector(".playAgain");
playAgain.addEventListener("click", function(){
                                    window.location.reload();
});

