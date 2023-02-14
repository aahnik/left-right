let prompt_div = document.getElementById("prompt");
let direction = "";
function getDirection() {
  let choice = Math.random();
  if (choice < 0.5) {
    return "left";
  } else {
    return "right";
  }
}
direction = getDirection();
prompt_div.innerHTML = direction;

let left = document.getElementById("left");
let right = document.getElementById("right");

let elements = [left, right];

let container = document.getElementById("container");
let score = 0;
let score_div = document.getElementById("score");
elements.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.id == direction) {
      score += 1;
    } else {
      score = -1;
    }

    if (score > 0) {
      score_div.innerHTML = score;
      direction = getDirection();
      prompt_div.innerHTML = direction;
    } else {
      score_div.innerHTML = "You loose. Refresh the page to restart!";
      container.style.display = "none";
    }
    console.log(item);
  });
});

