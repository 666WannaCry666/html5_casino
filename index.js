let wager = 5;
let bet = new Object();
let numbersBet = [];

let wheelnumbersAC = [0, 26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16, 24, 5, 10, 23, 8, 30, 11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32];

const wheel = document.querySelector('.wheel');
const ballTrack = document.querySelector('.ballTrack');
const test = document.querySelector(".betting-board_row-2");

const createChip = function(node) {
	let chip = document.createElement('div');
	chip.setAttribute('class', 'chip');
	chip.innerHTML
	node.append(chip);
};

const setEventListeners = function(nodeArray) {
	nodeArray.forEach(node => {
		node.addEventListener("click", () => {
			if (node.children.length < 2) {
				createChip(node);
			}

			let betNumber = node.getAttribute("id").split("_").pop();
			if (bet.hasOwnProperty(betNumber)) {
				bet[betNumber] = Number((bet[betNumber] + 0.01).toFixed(2));
				document.querySelector(`#${node.getAttribute('id')} .chip`).innerHTML = bet[betNumber];
			}
			else {
				bet[betNumber] = 0.01;
				document.querySelector(`#${node.getAttribute('id')} .chip`).innerHTML = bet[betNumber];
			}
			console.log(bet);
		});
	});
};

const setEventListenersRow = function(nodeArray) {
	nodeArray.forEach(node => {
		node.addEventListener("click", () => {
			if (node.children.length < 2) {
				createChip(node);
			}

			let betNumber = node.getAttribute("id").split("_").pop();
			if (bet.hasOwnProperty(betNumber)) {
				bet[betNumber] = Number((bet[betNumber] + 0.01).toFixed(2));
				document.querySelector(`#${node.getAttribute('id')} .chip`).innerHTML = bet[betNumber];
				document.querySelector(`#${node.getAttribute('id')} .vertical`).style.cssText = "transform: rotate(0);";
			}
			else {
				bet[betNumber] = 0.01;
				document.querySelector(`#${node.getAttribute('id')} .chip`).innerHTML = bet[betNumber];
				document.querySelector(`#${node.getAttribute('id')} .vertical`).style.cssText = "transform: rotate(0);";
			}
			console.log(bet);
		});
	});
};

window.onload = function() {
	setEventListeners(document.querySelectorAll(".betting-board_line"));
	setEventListeners(document.querySelectorAll(".betting-board_line-nums"));
	setEventListenersRow(document.querySelectorAll(".betting-board_line-row"));
	spinWheel(4);
};

function setBet(e, n, t, o){
	var obj = {
		amt: wager,
		type: t,
		odds: o,
		numbers: n
	};
	bet.push(obj);
	let numArray = n.split(',').map(Number);
	for(i = 0; i < numArray.length; i++){
		if(!numbersBet.includes(numArray[i])){
			numbersBet.push(numArray[i]);
		}
	}
	let chip = document.createElement('div');
	chip.setAttribute('class', 'chip');
	e.append(chip);
}

// function spin(){
// 	console.log(numbersBet);
// 	var winningSpin = Math.floor(Math.random() * 36);
// 	spinWheel(winningSpin);
// 	setTimeout(function(){
// 		if(numbersBet.includes(winningSpin)){
// 			for(i = 0; i < bet.length; i++){
// 				var numArray = bet[i].numbers.split(',').map(Number);
// 				if(numArray.includes(winningSpin)){
// 					console.log(winningSpin);
// 					console.log('odds ' + bet[i].odds);
// 					console.log('payout ' + ((bet[i].odds * bet[i].amt) + bet[i].amt));
// 				}
// 			}
// 		}else{
// 			console.log(winningSpin);
// 			console.log('no win');
// 		}

// 		bet = [];
// 		numbersBet = [];
// 		removeChips();
// 	}, 9000);
// }

function spinWheel(winningSpin){
	for(i = 0; i < wheelnumbersAC.length; i++){
		if(wheelnumbersAC[i] == winningSpin){
			var degree = (i * 9.73) + 362;
		}
	}
	wheel.style.cssText = 'animation: wheelRotate 5s linear infinite;';
	ballTrack.style.cssText = 'animation: ballRotate 1s linear infinite;';

	setTimeout(function(){
		ballTrack.style.cssText = 'animation: ballRotate 2s linear infinite;';
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerText = '@keyframes ballStop {from {transform: rotate(0deg);}to{transform: rotate(-'+degree+'deg);}}';
		document.head.appendChild(style);
	}, 2000);
	setTimeout(function(){
		ballTrack.style.cssText = 'animation: ballStop 3s linear;';
	}, 6000);
	setTimeout(function(){
		ballTrack.style.cssText = 'transform: rotate(-'+degree+'deg);';
	}, 9000);
	setTimeout(function(){
		wheel.style.cssText = '';
		style.remove();
	}, 10000);
}

function removeChips(){
	var chips = document.getElementsByClassName('chip');
	if(chips.length > 0){
		for(i = 0; i < chips.length; i++){
			chips[i].remove();
		}
		removeChips();
	}
}

