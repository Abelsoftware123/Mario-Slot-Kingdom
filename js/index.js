window.onload = init;

const images = ["0.png", "1.png", "2.png", "3.png", "4.png"];
const sounds = ["0.mp3", "1.mp3", "2.mp3"];
var display = [];
var initialCoins;
const min = 0;
const max = images.length;
var randomNumber;

function init() {
    prizeTable();
    receiveInitialCoins();
    updateCoinDisplay();
    document.getElementById("throw").onclick = spin;
    document.getElementById("cross").onclick = messageOff;
};

function receiveInitialCoins() {
    initialCoins = Math.floor((Math.random() * 11) + 20);
};

function updateCoinDisplay() {
    document.getElementById("money").innerHTML =
        `<div id="available">
            <div>${initialCoins}</div>
            <div class="euros"> €</div>
        </div>`;
    document.getElementById("coins").innerHTML = "";
    for (let n = 0; n < initialCoins; n++) {
        document.getElementById("coins").innerHTML += `<img src="img/coin.png">`;
    };
};

function spin() {
    spendCoin();
    if (initialCoins >= 1) {
        updateCoinDisplay();
        display = [];
        getRandomValue();
        display.push(randomNumber);
        document.querySelector("#window1 img").src = `img/${display[0]}.png`;
        getRandomValue();
        display.push(randomNumber);
        document.querySelector("#window2 img").src = `img/${display[1]}.png`;
        getRandomValue();
        display.push(randomNumber);
        document.querySelector("#window3 img").src = `img/${display[2]}.png`;
        document.getElementById("b0").onclick = random1;
        document.getElementById("b1").onclick = random2;
        document.getElementById("b2").onclick = random3;
        checkPrize();
    } else {
        checkPrize();
        gameOver();
    };
    document.getElementById("cross").onclick = messageOff;
};

function random1() {
    spendCoin();
    updateCoinDisplay();
    if (initialCoins >= 1) {
        getRandomValue();
        document.getElementById("window1").innerHTML = `<img src="img/${randomNumber}.png">`;
        display[0] = randomNumber;
        checkPrize();
    } else {
        checkPrize();
        gameOver();
    };
};

function random2() {
    spendCoin();
    updateCoinDisplay();
    if (initialCoins >= 1) {
        getRandomValue();
        document.getElementById("window2").innerHTML = `<img src="img/${randomNumber}.png">`;
        display[1] = randomNumber;
        checkPrize();
    } else {
        checkPrize();
        gameOver();
    };
};

function random3() {
    spendCoin();
    updateCoinDisplay();
    if (initialCoins >= 1) {
        getRandomValue();
        document.getElementById("window3").innerHTML = `<img src="img/${randomNumber}.png">`;
        display[2] = randomNumber;
        checkPrize();
    } else {
        checkPrize();
        gameOver();
    };
};

function checkPrize() {
    if (display[0] == display[1] && display[1] == display[2]) {
        document.getElementById("veil").style.display = "flex";
        document.getElementById("veil").style.userSelect = "active";
        document.getElementById("message").innerHTML = `Congratulations, you have won ${display[0]} coins`;
        initialCoins = initialCoins + display[0];
        sound(n = 1);
    } else {
        sound(n = 0);
    };
    updateCoinDisplay();
};

function payPrize() {
    initialCoins = initialCoins + display[0];
    updateCoinDisplay();
};

function messageOff() {
    document.getElementById("cross").onclick = document.getElementById("veil").style.display = "none";
    payPrize();
};

function gameOver() {
    document.querySelector("#audio").src = `audios/2.mp3`;
    document.querySelector("#audio").play();
    updateCoinDisplay(0);
    document.getElementById("throw").onclick = "none";
    document.getElementById("b0").onclick = "none";
    document.getElementById("b1").onclick = "none";
    document.getElementById("b2").onclick = "none";
};

function spendCoin() {
    if (initialCoins >= 1) {
        document.getElementById("money").innerHTML = "";
        document.getElementById("coins").innerHTML = "";
        initialCoins--;
    } else {
        gameOver();
    };
};

function receiveInitialCoins() {
    initialCoins = Math.floor((Math.random() * 5) + 10);
};

function getRandomValue() {
    randomNumber = Math.floor((Math.random() * (max - min) + min));
};

function sound() {
    document.querySelector("#audio").src = `audios/${sounds[n]}`;
    document.querySelector("#audio").play();
};

function prizeTable() {
    document.getElementById("logo").innerHTML = `<img src="img/mariopad.png"></img>`;
    document.getElementById("prizeTable").innerHTML = `<div id="coins">Prize Table:</div>`;
    for (n = 1; n < images.length; n++) {
        document.getElementById("prizeTable").innerHTML +=
            `<div id="coins">
                <div id="available"><img src="img/${images[n]}">+<img src="img/${images[n]}">+<img src="img/${images[n]}"> = <img src="img/coin.png">x${n}</div>
            </div>`;
    };
};

