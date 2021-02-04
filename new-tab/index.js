const colors = ["red", "yellow", "blue"];
let boxes = document.querySelectorAll(".box");

boxes.forEach((box) => {
  box.classList.add(colors[Math.floor(Math.random() * 3)]);
});
