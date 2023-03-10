let direction = "";
function getDirection() {
  let choice = Math.random();
  if (choice < 0.5) {
    return "left";
  } else {
    return "right";
  }
}

if (localStorage.getItem("highScore") === null)
  localStorage.setItem("highScore", "0");
let high_score_number = document.getElementById("high-score-number");
high_score_number.innerHTML = localStorage.getItem("highScore");
console.log(localStorage);
let start = document.getElementById("start-btn");
let menuItem = document.getElementById("menuItem");

let container = document.getElementById("container");

let clickSound = new Audio("click.mp3");
let errorSound = new Audio("error.mp3");

start.addEventListener("click", () => {
  onStart();
});

function handleEnter(event) {
  if (event.key == "Enter") {
    onStart();
    removeEventListener("keypress", handleEnter);
  }
}
addEventListener("keypress", handleEnter);

function onStart() {
  menuItem.style.display = "none";
  container.style.display = "flex";
  let score_container = document.getElementById("score-container");
  score_container.style.display = "block";
  afterStart();
}
function afterStart() {
  let left = document.getElementById("left");
  let right = document.getElementById("right");

  let elements = [left, right];
  let timId;
  function showDirection() {
    direction = getDirection();
    let rndm = Math.random();
    rndm = rndm > 0.5 ? 1 : 0;
    (left.innerHTML = ""), (right.innerHTML = "");
    elements[rndm].innerHTML = direction;
  }

  showDirection();
  timId = setInterval(timerHandler, 1);
  console.log(`first timer set id=${timId}`);

  let score = 0;
  let gameOn = true;
  let score_number = document.getElementById("score-number");
  let lost_message = document.getElementById("lost-message");
  let timebar = document.getElementById("timebar");

  function endGame() {
    timebar.style.display = "none";

    lost_message.style.display = "inline";
    container.style.display = "none";
  }
  function timerHandler() {
    timebar.value = timebar.value - 1;
    if (timebar.value == 0) {
      clearInterval(timId);
      endGame();
    }
  }
  elements.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.id == direction) {
        clickSound.play();
        console.log(`trying to clear timer with id ${timId}`);
        clearInterval(timId);

        score += Math.round(timebar.value / 100);
        timebar.value = 3000;
        timId = setInterval(timerHandler, 1);
      } else {
        errorSound.play();
        let lastHighScore = parseInt(localStorage.getItem("highScore"));
        console.log(`Last High Score ${lastHighScore}`);
        if (score > lastHighScore) {
          // new high score tada
          localStorage.setItem("highScore", score);
        }

        gameOn = false;
      }

      if (gameOn) {
        score_number.innerHTML = score;

        showDirection();
      } else {
        // score_number.style.display = "none";
        endGame();
      }
      console.log(item);
    });
  });
}
