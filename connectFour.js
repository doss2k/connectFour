$(document).ready(function(){   // Function to make sure all HTML has loaded before running this script

const boardWidth = 10;  // Sets the Board Width
const boardHeight = 6;  // Sets the Board Height
let numOfButtons = 0;   // Tracks the number of squares clicked in a game (to determine a tie)
let player1Score = 0;   //  Player 1's Score
let player2Score = 0;   //  Player 2's Score
let ties = 0;  // Number of ties

let player1 = prompt('Player 1 (Red) please enter your name', 'Player 1');  // Prompts Player 1 for their name
let player2 = prompt('Player 2 (Black) please enter your name', 'Player 2');  // Prompls Player 2 for their name
let player = 1;  // Starts game with Player 1, used to track which player turn it is
let playerMessage = '<h2>' + player1 + ' (Red) it is your turn</h2>';  // Sets initial message for whose turn it is
let playerScore = '<h2>Score - ' + player1 + ': ' + player1Score + '   ' + player2 + ': ' + player2Score + '   ' + 'Ties: ' + ties + '</h2>';  // Sets initial score message

document.getElementById('player').innerHTML = playerMessage;  // Sets player message for whose turn it is in HTML file
document.getElementById('score').innerHTML = playerScore;  // Sets score message in HTML file

/* This function builds the initial game board based on width and height set above.
   Adds HTML to each button with jQuery to set the ID to row and column.  
   For instance a1, a2, a3, b1, b2, etc.
*/

function buildBoard() {  
    let row = 'a';
    for(var i = 0; i < boardHeight; i++) {
        for(var j = 0; j < boardWidth; j++) {
            $('.board').append("<button class='button' id='" + row + j + "'></button>");
            if(j === boardWidth - 1) {
                $('.board').append("<br>"); 
                row = nextChar(row);
            }
        }
    }
}

buildBoard();  // Calls the function to build the initial game board

/* This checks for when a button is clicked and passes the id of the button
   to the markBox function
*/

$(".button").on('click', function(){
    markBox(this.id);    
});

/*  This function takes in the id of the button clicked.  It then checks to
    see which player's turn it is and changes the box at that id red or black accordingly.
    It then disables that button for the remainder of game.  It then increments the numOfButtons
    by 1 to track when all have been selected in case of a tie game.  Lastly it calls the
    checkWinner function and passes it the id of the box that was clicked.  It does this
    on a slight delay (50ms) so it will be sure to display the box color change in case
    there is a winner before it alerts the user
*/

function markBox(id) {
    let boxClicked = id;
    if(player === 1) {
        $('#'+id).css('background-color', 'red');
        $('#'+id).prop('disabled', true);
    } else if(player === 2){
        $('#'+id).css('background-color', 'black');
        $('#'+id).prop('disabled', true);
    }
    numOfButtons += 1;
    setTimeout(checkWinner, 50, boxClicked);
}

//  This function changes which player's turn it is and updates the message on the screen after each turn

function changePlayer() {
    if(player === 1) {
        player = 2;
        $('#player').html("<h2>" + player2 + " (Black) it is your turn</h2>")
    } else if (player === 2){
        player = 1;
        $('#player').html("<h2>" + player1 + " (Red) it is your turn</h2>");
    }
    return;           
}

/*  This function checks to see if a player won the game after taking their turn.
    It sets the initial boxCount to 1 and boxColor to the players color.
    It then counts to the right and then left of the box to see if those boxes also match the players color.
    If it counts 4 or more in a row it declares that player the winner.
    It then counts up and down from the box to see if those boxes also match the players color.
    If it counts 4 or more in a row it declares that player the winner.
*/

function checkWinner(id) {
    let boxCount = 1;
    let boxColor = $('#'+id).css("background-color");
    checkRight();
    checkLeft();
    winCond();
    checkDown();
    checkUp();
    winCond();

    // Checks how many squares to the right of the box match a players color

    function checkRight() {
        let boxID = id;
        let boxIDArray = id.split('');
        boxIDArray[1] = parseInt(boxIDArray[1]) + 1;
        boxID = boxIDArray.join('');
        for(var i = 1; i <= 3; i++) {
            if($('#'+boxID).css("background-color") === boxColor) {
                boxCount += 1;
                boxIDArray[1] = parseInt(boxIDArray[1]) + 1;
                boxID = boxIDArray.join('');
            }  
        }
    }

    // Checks how many squares to the left of the box match a players color

    function checkLeft() {
        let boxID = id;
        let boxIDArray = id.split('');
        boxIDArray[1] = parseInt(boxIDArray[1]) - 1;
        boxID = boxIDArray.join('');
        for(var i = 1; i <= 3; i++) {
            if($('#'+boxID).css("background-color") === boxColor) {
                boxCount += 1;
                boxIDArray[1] = parseInt(boxIDArray[1]) - 1;
                boxID = boxIDArray.join('');
            }  
        }
    }

    // Checks how many squares below the box match a players color

    function checkDown() {
        let boxID = id;
        let boxIDArray = id.split('');
        boxIDArray[0] = nextChar(boxIDArray[0]);
        boxID = boxIDArray.join('');
        for(var i = 1; i <= 3; i++) {
            if($('#'+boxID).css("background-color") === boxColor) {
                boxCount += 1;
                boxIDArray[0] = nextChar(boxIDArray[0]);
                boxID = boxIDArray.join('');
            }  
        }
    }

    /* Checks how many squares above the box match a players color
       Stops at the top 'a' column to avoid error since 'a' is start of char set
    */ 

    function checkUp() {
        let boxID = id;
        let boxIDArray = id.split('');
        if(boxIDArray[0] !== 'a') {
            boxIDArray[0] = prevChar(boxIDArray[0]);
            boxID = boxIDArray.join('');
            for(var i = 1; i <= 3; i++) {
                if($('#'+boxID).css("background-color") === boxColor) {
                    boxCount += 1;
                    if(boxIDArray[0] !== 'a') {
                        boxIDArray[0] = prevChar(boxIDArray[0]);
                        boxID = boxIDArray.join('');
                    } else {
                        return;
                    }
                }  
            }
        }
    }

    /* After checking right/left or up/down determines if there the player had at least 4 in a row to win the game.
       Alerts the user that a player has won and disables all buttons so game is over and updates the score.
       Also checks to see if every box has been selected and if no winner declares a tie.
    */

    function winCond() {
        if(boxCount >= 4) {
            if(player === 1) {
                alert('Congrats ' + player1 + ' you win!!');
                player1Score += 1;
                $('.button').prop('disabled', true);
            
            } else if (player === 2) {
                alert('Congrats ' + player2 + ' you win!!');
                player2Score += 1;
                $('.button').prop('disabled', true);
            }
            $('#score').html('<h2>Score - ' + player1 + ': ' + player1Score + '   ' + player2 + ': ' + player2Score + '   ' + 'Ties: ' + ties + '</h2>');  // Updates the 
        } else if(numOfButtons === boardWidth * boardHeight) {
            alert('It is a tie!!');
            ties += 1;
            }
        
        boxCount = 1;   //  Resets boxCount if there was no winner  
    }
    changePlayer();  // Changes the player after a turn
}   

// This function increments a character  a -> b, b -> c, etc.

function nextChar(letter) {
    return String.fromCharCode(letter.charCodeAt(0) + 1);
}

// This function decrements a character  c -> b, b -> a, etc.

function prevChar(letter) {
    return String.fromCharCode(letter.charCodeAt(0) - 1);
}

// Checks to see if the newgame button has been pressed and if so calls resetGame function 
    
$("#newgame").on('click', function(){
    resetGame();
});

// This function resets the game by setting all box colors back to default and enabling all buttons and setting 

function resetGame() {
    numOfButtons = 0; 
    $('.button').css('background-color', '');
    $('.button').prop('disabled', false);
    return;
}

});



