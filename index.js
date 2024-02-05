/***************************************************************************************
 * Programmer:  Grant Long
 * Professor:   Dr. Zhao
 * Date:        1/15/2024
 * Assigment:   Individual Project
 * Synopsis:    This JavaScript file contains the code for the functionality of the
 *              game. This includes the board setup, reset game, setting the pieces
 *              and checking/setting the winner.
 ***************************************************************************************/

var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;
var gameOver = false;
var board = [];
var currColumns;
var rows = 6;
var columns = 7;

window.onload = function() {
    setGame();
}

function reset(){
    document.getElementById("board").innerHTML = "";
    board = [];
    setGame();
    $('#myModal').modal('hide');
}


function setGame() {
    // Array to ensure that the columns aren't full
    currColumns = [5, 5, 5, 5, 5, 5, 5]; 
    
    for (let r = 0; r < rows; r++){
        let row = [];
        for (let c = 0; c < columns; c++){
        row.push(' ');

        /* The code below is what is happening in HTML:
            <div id="board">
            <div id="0-0" class="tile"></div>
            </div>                                      */
        let tile = document.createElement("div");
        tile.id = r.toString() + "-" + c.toString();
        tile.classList.add("tile");
        tile.addEventListener("click", setPiece);
        document.getElementById("board").append(tile);
        }
        board.push(row);
    }

    //reset game variables
    gameOver = false;
    currPlayer = playerRed;
}

function setPiece() {
    // If the game is over, do nothing. No one can set piece.
    if(gameOver){
        return;
    }

    //Grab coordinates
    let coords = this.id.split("-"); //"0-0" -> ["0", "0"]"
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    //Obtains the height of each column 
    r = currColumns[c]; 

    //Column is full
    if (r < 0) {
        return;
    }
    
    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());

    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    }
    else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

    r -= 1; //updating the row height for the column
    currColumns[c] = r; //update the array
    checkWinner();
}


function checkWinner() {
  // Horizontally check for 4 in a row:
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
      // make sure board has a piece (not a whitespace) and has 4 in a row
        if (board[r][c] != " " 
                && board[r][c] == board[r][c+1] 
                && board[r][c] == board[r][c+2] 
                && board[r][c] == board[r][c+3]) {
            setWinner(r, c);
            return;
            }
        }
    }

  // Vertically check for 4 in a row:
    for (let c = 0; c < columns; c++){
        for (let r = 0; r < rows - 3; r++){
        if (board[r][c] != " " 
                && board[r][c] == board[r+1][c] 
                && board[r+1][c] == board[r+2][c] 
                && board[r+2][c] == board[r+3][c]) {
            setWinner(r, c);
            return;
            }
        }
    }

  // Diagonally pt.1 check for 4 in a row:
    for (let r = 0; r < rows - 3; r++){
        for (let c = 0; c < columns - 3; c++){
        if (board[r][c] != " " 
                && board[r][c] == board[r+1][c+1] 
                && board[r+1][c+1] == board[r+2][c+2] 
                && board[r+2][c+2] == board[r+3][c+3]) {
            setWinner(r, c);
            return;
            }
        }
    }

  // Diagonally pt.2 check for 4 in a row:
    for (let r = 3; r < rows; r++){
        for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != " " 
                && board[r][c] == board[r-1][c+1] 
                && board[r-1][c+1] == board[r-2][c+2] 
                && board[r-2][c+2] == board[r-3][c+3]){
            setWinner(r, c);
            return;
            }
        }
    }
}

function setWinner(r, c) {
    var myModal = new bootstrap.Modal(document.getElementById("myModal"));
    myModal.show();
    $("#myModal .modal-title").text("Game Over").css({'font-size': "30px"});

    if (board[r][c] == playerRed){
        $("#myModal .modal-body").text("🎉 Winner: Red 🎉").css({color: "#C70039", 'font-size': "30px"});
    }
    else {
        $("#myModal .modal-body").text("🎉 Winner: Yellow 🎉").css({color: "#FFB000", 'font-size': "30px"});
    }
    gameOver = true;
}