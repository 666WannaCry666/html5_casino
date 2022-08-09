const createText = function(json) {
	let text = "";
	
	json.forEach(obj => {
		let textBlock = `<div class="text-block"><p>${obj.text}</p></div>`
		text = text + textBlock;
	});

	document.querySelector(".text").style.visibility = "visible";
	document.querySelector(".text-wrapper").innerHTML = text;
};

document.querySelector(".footer_btn").addEventListener("click", async function() {
    let response = await fetch("./text.json");
    let jsonText = await response.json();

    const text_1 = "TEXT1";
    const text_2 = "TEXT2";
    const textTitleClone = document.querySelector(".text_title").cloneNode();

    createText(jsonText);
    document.querySelector(".text_title").innerHTML = text_1;

    this.style.display = "none";

    document.querySelector(".footer-button .text_title:first-of-type").innerHTML = text_1;
    document.querySelector(".footer-button .text_title:last-of-type").innerHTML = text_2;
    document.querySelector(".footer-button .text_title:first-of-type").style.display = "block";
    document.querySelector(".footer-button .text_title:last-of-type").style.display = "block";
});

const moneyModalNode = document.querySelector(".money_modal");
const depositBtnNode = document.querySelector(".deposit_btn");
const withdrawBtnNode = document.querySelector(".withdraw_btn");
const moneyModalBtnNodes = document.querySelectorAll(".money-modal_btn");
const textModalNode = document.querySelector("#text_modal")
const rightBtnNode_1 = document.querySelector(".right_btn-1");
const rightBtnNode_2 = document.querySelector(".right_btn-2");
const textModalBtnNodes = document.querySelectorAll(".text-modal_btn");

depositBtnNode.onclick = function() {
  moneyModalNode.style.display = "block";
  document.querySelector(".money-modal_content-deposit").style.display = "flex";
  document.querySelector(".money-modal_content-withdraw").style.display = "none";
}

withdrawBtnNode.onclick = function() {
    moneyModalNode.style.display = "block";
    document.querySelector(".money-modal_content-deposit").style.display = "none";
    document.querySelector(".money-modal_content-withdraw").style.display = "flex";
}

rightBtnNode_1.onclick = function() {
    textModalNode.style.display = "block";
    document.querySelector(".text-modal_content-1").style.display = "block";
    document.querySelector(".text-modal_content-2").style.display = "none";
}
  
rightBtnNode_2.onclick = function() {
    textModalNode.style.display = "block";
    document.querySelector(".text-modal_content-1").style.display = "none";
    document.querySelector(".text-modal_content-2").style.display = "block";
}

moneyModalBtnNodes.forEach(node => {
    node.onclick = function() {
        moneyModalNode.style.display = "none";
    };
});

textModalBtnNodes.forEach(node => {
    node.onclick = function() {
        textModalNode.style.display = "none";
    };
});

window.onclick = function(event) {
  if (event.target == moneyModalNode) {
    moneyModalNode.style.display = "none";
  }
  else if (event.target == textModalNode) {
    textModalNode.style.display = "none";
  }
}

window.addEventListener("keydown", function(e) {
    if(e.key == "Escape"){
        moneyModalNode.style.display = "none";
        textModalNode.style.display = "none";
    }
});
