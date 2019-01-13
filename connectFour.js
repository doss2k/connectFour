$(document).ready(function(){

const boardWidth = 4;
const boardHeight = 4;
let numOfButtons = 0;
let player1Score = 0;
let player2Score = 0;
let ties = 0;

let player1 = prompt('Player 1 (Red) please enter your name', 'Player 1');
let player2 = prompt('Player 2 (Black) please enter your name', 'Player 2');
let player = 1;
let playerMessage = '<h2>' + player1 + ' (Red) it is your turn</h2>';
let playerScore = '<h2>Score - ' + player1 + ': ' + player1Score + '   ' + player2 + ': ' + player2Score + '   ' + 'Ties: ' + ties + '</h2>';

document.getElementById('player').innerHTML = playerMessage;
document.getElementById('score').innerHTML = playerScore;

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

buildBoard();

function nextChar(letter) {
    return String.fromCharCode(letter.charCodeAt(0) + 1);
}

$(".button").on('click', function(){
    markBox(this.id);    
});

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
    changePlayer();
    setTimeout(checkWinner, 50, boxClicked);
}

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

function checkWinner(id) {
    let boxIDArray = id.split('');
    let boxCount = 0;
    let boxColor = $('#'+id).css("background-color");
    checkRight();
    checkLeft();

    function checkRight() {
        let boxID = id;
        for(var i = 0; i < 4; i++) {
            if($('#'+boxID).css("background-color") === boxColor) {
                boxCount += 1;
                boxIDArray[1] = parseInt(boxIDArray[1]) + 1;
                boxID = boxIDArray.join('');
                console.log(boxID);
                
                console.log(boxCount);
            }  
        }
    }

    function checkLeft() {
        let boxID = id;
        for(var i = 0; i < 4; i++) {
            if($('#'+boxID).css("background-color") === boxColor) {
                boxCount += 1;
                boxIDArray[1] = parseInt(boxIDArray[1]) - 1;
                boxID = boxIDArray.join('');
                console.log(boxID);
                console.log(boxCount);
                
            }  
        }
    }

    if(boxCount === 4) {
        alert('You win!');
        $('.button').prop('disabled', true);
    } else {
        boxCount = 0;
    }


    if(numOfButtons === boardWidth * boardHeight) {
        alert('It is a tie!!');
        ties += 1;
    }

    $('#score').html('<h2>Score - ' + player1 + ': ' + player1Score + '   ' + player2 + ': ' + player2Score + '   ' + 'Ties: ' + ties + '</h2>');
}

$("#startover").on('click', function(){
    resetGame();
});

function resetGame() {
    
    numOfButtons = 0; 
    $('.button').css('background-color', '');
    $('.button').prop('disabled', false);
    return;
}

 


});



/*   $(".button").on('click', function(){
    alert(this.id);
});*/