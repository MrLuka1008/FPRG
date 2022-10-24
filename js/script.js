const startGame = document.getElementById("startGame");
const gameContainer = document.getElementById("game-container");
let rocketImg = document.createElement("img");
let bulletImg = document.createElement("div");
let pointLabel = document.getElementById("points");
let point = 1;
let btnPush = true;

let rocket = {
  img: "./img/rocket.png",
  x: 0,
};

function GameStart() {
  createRocket();
}

function createRocket() {
  rocketImg.setAttribute("src", `${rocket.img}`);
  rocketImg.setAttribute("id", "rocket");
  gameContainer.appendChild(rocketImg);
}

function createBullet() {
  bulletImg = document.createElement("div");
  bulletImg.setAttribute("id", "bullet");
  bulletImg.setAttribute("class", "bullets");
  gameContainer.appendChild(bulletImg);
  gunShooting(bulletImg);
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let createrocks = setInterval(() => {
  const rndInt = randomIntFromInterval(10, 440);
  let rock = document.createElement("img");
  setAttributes(rock, { src: "./img/rock.png", id: "rock", class: "rocks", style: `left: ${rndInt}px` });
  gameContainer.appendChild(rock);
}, 1000);

function setAttributes(el, attrs) {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

//create rock

window.addEventListener("keydown", (e) => {
  trueOrFalse();
  if (e.code === "ArrowLeft") {
    goLeft();
  }
  if (e.code != "ArrowLeft") {
    rocketImg.setAttribute("src", `${rocket.img}`);
  }
  if (e.code === "ArrowRight") {
    goRoght();
  }

  if (e.code === "Space") {
    createBullet();
  }
});

function trueOrFalse() {
  if (rocket.x >= 450) {
    btnPush = false;
    rocket.x = 440;
  } else if (rocket.x === 0) {
    btnPush = false;
    rocket.x = 10;
  } else {
    btnPush = true;
    rocketImg.setAttribute("style", `left: ${rocket.x}px`);
  }
}

function goLeft() {
  if (btnPush) {
    rocket.x -= 10;
    rocketImg.setAttribute("src", `./img/rocketright.png`);
  }
}

function goRoght() {
  if (btnPush) {
    rocket.x += 10;
    rocketImg.setAttribute("src", `./img/rocketright.png`);
  }
}

function gunShooting(bullet) {
  bullet.setAttribute("style", `left: ${rocket.x + 20}px`);
  bullet.style.animation = `gunshooting 0.3s linear`;
}

let movebullet = setInterval(() => {
  let rocks = document.getElementsByClassName("rocks");

  for (let i = 0; i < rocks.length; i++) {
    let rock = rocks[i];
    if (rock != undefined) {
      let rockcoll = rock.getBoundingClientRect();
      let bullet = bulletImg.getBoundingClientRect();

      if (
        bullet.left >= rockcoll.left &&
        bullet.right <= rockcoll.right &&
        bullet.top <= rockcoll.top &&
        bullet.bottom <= rockcoll.bottom
      ) {
        rock.parentElement.removeChild(rock);
        pointLabel.innerHTML = point++;
      }
      if (rockcoll.bottom >= 650) {
        document.getElementById("gameOver").style.display = "flex";
        clearInterval(createrocks);
        document.getElementById("gameOwerPoints").innerText = pointLabel.textContent;
      }
    }
  }
});

GameStart();
