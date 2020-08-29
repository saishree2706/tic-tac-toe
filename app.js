var origBoard;
const huPlayer = '<img src="me.jpg" alt="">';
const cmPlayer = '<img src="computer.jpg" alt="">';
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
];

const cells = document.querySelectorAll(".cell");
startGame();

function startGame(){
	document.querySelector(".endgame").style.display = "none";
	origBoard = Array.from(Array(9).keys());
	for( var i=0; i<cells.length ; i++){
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);

	}
}



function turnClick(square){
	if(typeof origBoard[square.target.id] == 'number'){
		turn(square.target.id, huPlayer);
		if(!checkTie()) turn(bestSpot(), cmPlayer);
	}
	
}


function turn(squareId, player){
	origBoard[squareId] = player;
	document.getElementById(squareId).innerHTML = player;
	let gameWon = checkWin(origBoard, player);
	if (gameWon) gameOver(gameWon);
}


function checkWin(board, player){
	let plays = board.reduce((a,e,i)=>
		(e === player)? a.concat(i) : a,[]);

	let gameWon = null;
	for(let[index, win] of winCombos.entries()){
		if(win.every(elem => plays.indexOf(elem)> -1)){
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}


function gameOver(gameWon){
	for(let index of winCombos[gameWon.index]){
		document.getElementById(index).style.backgroundColor = gameWon.player == huPlayer ? 'rgba(254,246,122,0.8015581232492998)' : 'rgba(199,252,255,0.8015581232492998)';
	}

	for(var i=0; i<cells.length; i++){
		cells[i].removeEventListener('click', turnClick, false)
	}
	declareWinner(gameWon.player == huPlayer ? "You Won 😍🔥" : "You lost 💩🤐");
}

//We use basic AI player


function declareWinner(who){
	document.querySelector(".endgame").style.display="block";
	document.querySelector(".endgame .text").innerHTML = who;
}



function emptySquares(){
	return origBoard.filter(s=> typeof s == 'number');
}



function bestSpot(){
	
	var emptyOnes = emptySquares();
	var randomBox = Math.floor(Math.random()*emptyOnes.length);
	console.log(emptyOnes[randomBox]);
	return emptyOnes[randomBox];
}

function checkTie(){
	if(emptySquares().length == 0){
		for(var i=0; i<cells.length; i++){
			cells[i].style.backgroundColor = 'rgba(154,219,92,0.8015581232492998)';
			cells[i].removeEventListener('click', turnClick, false);

		}
		declareWinner("Tie Game 🤦🤣");
		return true;
	}
	return false;
}










































