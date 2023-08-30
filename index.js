/* Keydown:
      1. Determine which row and box you are positioned on
      2. Determine which key is pressed
        a. If it is Delete Key
            If (classlist contains "startrow") -> make content = ""
            Else -> make content = "" and move active box back one

        b. If it is Enter Key
            If (classlist does not contain "endrow") -> Do nothing
            Else -> Check each box in the row against the character from the set word -> checkWord()

        c. If it is any other key
            If (classlist contains "endrow") -> Set box to input and stay there
            Else -> Set box to input and move to the next box
*/

let count = 0;

function lightToggle() {
    let togglebtn = document.querySelector('.lightbtn');
    togglebtn.classList.toggle('night');

    if (count % 2 == 0) {
        togglebtn.innerHTML = "<i class=\"fa-regular fa-sun\"></i>";
    }
    else {
        togglebtn.innerHTML = "<i class=\"fa-solid fa-moon\"></i>";
    }
    
    let hr = document.querySelector('hr');
    let body = document.getElementById('body');
    let h1 = document.querySelector('h1');
    let popup = document.querySelector('.popup');
    let p = document.querySelector('.flip-card-back p');
    let time = document.getElementById('bb');

    let inputs = document.querySelectorAll('input');
    inputs.forEach(element => {
        if (count % 2 == 0 && element.value == "") {
            element.style.border = "2px solid rgb(63, 63, 63)";
        }
        else if (count % 2 == 0 && element.value != "") {
            element.style.border = "2px solid gray";
        }
        else if (count % 2 != 0 && element.value != "") {
            element.style.border = "2px solid gray";
        }
        else {
            element.style.border = "2px solid lightgrey";
        }
        element.classList.toggle('night');
    });

    let keys = document.querySelectorAll('.keyboard button');
    keys.forEach(element => {
        if (count % 2 == 0 && element.style.backgroundColor == "darkgray") {
            element.style.backgroundColor = "rgb(63, 63, 63)";
            element.style.color = "white";
        }
        else if (count % 2 == 0 && element.style.backgroundColor != "darkgray") {
            element.style.backgroundColor = "rgb(110, 110, 110)";
            element.style.color = "white";
        }
        else if (count % 2 != 0 && element.style.backgroundColor == "rgb(63, 63, 63)") {
            element.style.backgroundColor = "darkgray";
            element.style.color = "black";
        }
        else {
            element.style.backgroundColor = "lightgray";
            element.style.color = "black";
        }
    });

    hr.classList.toggle('night');
    p.classList.toggle('night');
    popup.classList.toggle('night');
    body.classList.toggle('night');
    h1.classList.toggle('night');
    time.classList.toggle('night');

    count += 1;
}


let rowcount = 0;
let boxnum = 0;

const todaysWord = "HELLO";

document.addEventListener("keydown", (e) => {
    keyPress(e, "keydown");
});

const keyboard = document.querySelector('.keyboard');
keyboard.addEventListener("click", (e) => {
    const isButton = e.target.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    }
    else {
        keyPress(e, "click");
    }
})

function keyPress(e, type) {
    let divputs = document.querySelectorAll('.row');
    let backs = divputs[rowcount].querySelectorAll('p');
    let inner = divputs[rowcount].querySelectorAll('.flip-card-inner');
    let inputs = divputs[rowcount].querySelectorAll('input');

    let key = "";

    if (type == "keydown") {
        key = e.key;
    }
    else {
        key = e.target.id;
    }

    let currentBox = inputs[boxnum];
    let lastBox = inputs[boxnum - 1];
    let nextBox = inputs[boxnum + 1];

    /* Key Code 69 == Enter | Key Code 66 == Delete */
    if (key == "Enter") {
        if (inputs[4].value != "") {
            checkRow(inputs, backs, inner);
            e.preventDefault();
            return;
        }
        else {jk
            return;
        }
    }
    else if (key == "Backspace") {
        if (currentBox.classList.contains('startrow')) {
            currentBox.value = "";
            if (count % 2 == 0) {
                currentBox.style.border = "2px solid lightgrey";
            }
            else {
                currentBox.style.border = "2px solid rgb(90, 90, 90";
            }
        } 
        else if (currentBox.value != "") {
            currentBox.value = "";
            if (count % 2 == 0) {
                currentBox.style.border = "2px solid lightgrey";
            }
            else {
                currentBox.style.border = "2px solid rgb(90, 90, 90";
            }
            boxnum -= 1;
        }
        else {
            lastBox.value = "";
            if (count % 2 == 0) {
                lastBox.style.border = "2px solid lightgrey";
            }
            else {
                lastBox.style.border = "2px solid rgb(90, 90, 90";
            }
            boxnum -= 1;
        }
    }
    else if (key == "CapsLock" || key == "Shift") {
        return;
    }
    else if (key.charCodeAt(0) < 65 || (key.charCodeAt(0) > 91 && key.charCodeAt(0) < 97) || key.charCodeAt(0) > 122) {
        return;
    }
    else {
        if (currentBox.classList.contains('endrow')) {
            currentBox.value = key;
            if (count % 2 == 0) {
                currentBox.style.border = "2px solid gray";
            }
            else {
                currentBox.style.border = "2px solid gray";
            }
        }
        else if (currentBox.value != "") {
            nextBox.value = key;
            if (count % 2 == 0) {
                nextBox.style.border = "2px solid gray";
            }
            else {
                currentBox.style.border = "2px solid gray";
            }
            boxnum += 1;
        }
        else {
            currentBox.value = key;
            if (count % 2 == 0) {
                currentBox.style.border = "2px solid gray";
            }
            else {
                currentBox.style.border = "2px solid gray";
            }
            boxnum += 1;
        }
    }
}


/* Check Function:
    1. Move left to right. Find the children of the parent div and check values against the array.
    2. If the value matches the index, background = green
    3. If the value does not match the index but is in the array somewhere, background = yellow
    4. If the value is not in the array, background = grey
*/

function checkRow(inputs, backs, inner) {
    let correctCount = 0;
    let popupdivs = document.querySelectorAll('.poprow');
    let boxes = popupdivs[rowcount].querySelectorAll('p');

    let greenIndices = [];
    let yellowIndices = [];

    for (let i = 0; i < 5; i++) {
        backs[i].innerText = inputs[i].value.toUpperCase();

        if (inputs[i].value.toUpperCase() === todaysWord[i]) {
            greenIndices += i;
            backs[i].style.backgroundColor = "#479c44";
            boxes[i].style.backgroundColor = "#479c44";
            correctCount += 1;
        }
        else {
            for (let j = 0; j < 5; j++) {
                if (inputs[j].value.toUpperCase() === todaysWord[i] && yellowIndices.includes(i) == false && greenIndices.includes(j) == false) {
                    yellowIndices += i;
                    backs[j].style.backgroundColor = "#c9c751";
                    boxes[j].style.backgroundColor = "#c9c751";
                    break;
                }
            }
        }

        if (i == 0) {
            setTimeout(() => {
                inner[i].classList.toggle('active');
            }, 0)
        }
        else if (i == 1) {
            setTimeout(() => {
                inner[i].classList.toggle('active');
            }, 400)
        }
        else if (i == 2) {
            setTimeout(() => {
                inner[i].classList.toggle('active');
            }, 800)
        }
        else if (i == 3) {
            setTimeout(() => {
                inner[i].classList.toggle('active');
            }, 1200)
        }
        else if (i == 4) {
            setTimeout(() => {
                inner[i].classList.toggle('active');
            }, 1600)
        }

        setTimeout(() => {
            for (let r = 0; r < 5; r++) {
                if (backs[r].style.backgroundColor !== 'rgb(71, 156, 68)' && backs[r].style.backgroundColor !== 'rgb(201, 199, 81)') {
                    let keybox = document.getElementById(inputs[r].value);
                    if (count % 2 != 0) {
                        keybox.style.backgroundColor = 'rgb(63, 63, 63)';
                    }
                    else {
                        keybox.style.backgroundColor = 'darkgray';
                    }
                }
            }
        }, 1800);
    }

    if (correctCount == 5) {
        setTimeout(() => {
            const popup = document.querySelector('.popup');
            const layer = document.querySelector('.layer');
            popup.style.display = "block";
            layer.style.display = "block";
        }, 3000);
        return;
    }

    if (rowcount == 5) {
        setTimeout(() => {
            const popuptitle = document.getElementById('title');
            title.innerHTML = "Try Again Tomorrow";
            const popup = document.querySelector('.popup');
            const layer = document.querySelector('.layer');
            popup.style.display = "block";
            layer.style.display = "block";
        }, 3000);
    }

    rowcount += 1;
    boxnum = 0;
}

function removePopup() {
    const popup = document.querySelector('.popup');
    const layer = document.querySelector('.layer');
    popup.style.display = "none";
    layer.style.display = "none";
}

var div=document.getElementById("bb");
 
setInterval(function(){ 
  var toDate=new Date();
  var tomorrow=new Date();
  tomorrow.setHours(24,0,0,0);
  var diffMS=tomorrow.getTime()/1000-toDate.getTime()/1000;
  var diffHr=Math.floor(diffMS/3600);
  diffMS=diffMS-diffHr*3600;
  var diffMi=Math.floor(diffMS/60);
  diffMS=diffMS-diffMi*60;
  var diffS=Math.floor(diffMS);
  var result=((diffHr<10)?"0"+diffHr:diffHr);
  result+=":"+((diffMi<10)?"0"+diffMi:diffMi);
  result+=":"+((diffS<10)?"0"+diffS:diffS);
  div.innerHTML=result;
  
},1000);
