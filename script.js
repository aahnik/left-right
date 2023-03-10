let direction = "";
function getDirection() {
  let choice = Math.random();
  if (choice < 0.5) {
    return "left";
  } else {
    return "right";
  }
}

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

  function showDirection() {
    direction = getDirection();
    let rndm = Math.random();
    rndm = rndm > 0.5 ? 1 : 0;
    (left.innerHTML = ""), (right.innerHTML = "");
    elements[rndm].innerHTML = direction;
  }

  showDirection();

  let score = 0;
  let score_number = document.getElementById("score-number");
  let lost_message = document.getElementById("lost-message");

  elements.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.id == direction) {
        clickSound.play();
        score += 1;
      } else {
        errorSound.play();
        score = -1;
      }

      if (score >= 0) {
        score_number.innerHTML = score;

        showDirection();
      } else {
        score_number.style.display = "none";
        lost_message.style.display = "inline";

        container.style.display = "none";
      }
      console.log(item);
    });
  });
}
