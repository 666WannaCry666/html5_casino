let bet = new Object();

let wheelnumbersAC = [0, 26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16, 24, 5, 10, 23, 8, 30, 11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32];

const wheel = document.querySelector('.wheel');
const ballTrack = document.querySelector('.ballTrack');

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

function spinWheel(winningSpin){
	for(i = 0; i < wheelnumbersAC.length; i++){
		if(wheelnumbersAC[i] == winningSpin){
			var degree = (i * 9.73) + 362;
		}
	}

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

const clear = function() {
	bet = new Object();
	document.querySelectorAll(".chip").forEach(node => {
		node.remove();
	})

	document.querySelectorAll(`.betting-board_line-row .vertical`).forEach(node => {
		node.style.cssText = "transform: rotate(-90deg);"
	});
};

window.onload = function() {
	setEventListeners(document.querySelectorAll(".betting-board_line"));
	setEventListeners(document.querySelectorAll(".betting-board_line-nums"));
	setEventListenersRow(document.querySelectorAll(".betting-board_line-row"));
	
	document.querySelector(".clear_btn").addEventListener("click", clear);

	document.querySelector(".spin_btn").addEventListener("click", async function() {
		this.disabled = true;
		document.querySelector(".clear_btn").disabled = true;

		document.querySelector(".win").style.visibility = "hidden";

		wheel.style.cssText = 'animation: wheelRotate 5s linear infinite;';
		ballTrack.style.cssText = 'animation: ballRotate 1s linear infinite;';

		let response = await fetch("./test.json");
		let winOrLose = await response.json();
		spinWheel(winOrLose.value);

		setTimeout(() => {
			document.querySelector(".win").style.visibility = "visible";
			document.querySelector(".win_text").innerText = winOrLose.text;
			this.disabled = false;
			document.querySelector(".clear_btn").disabled = false;
		}, 11000);
	});
};
