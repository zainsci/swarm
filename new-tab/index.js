// Add Random Colors to Boxes
const colors = ["red", "yellow", "blue"];
let boxes = document.querySelectorAll(".box");

boxes.forEach((box) => {
  box.classList.add(colors[Math.floor(Math.random() * 3)]);
});

// Add Random Images from Media Folder
const image = document.getElementById("image");
const img = document.createElement("img");
img.src = `../media/images/${"1"}.jpg`;
image.appendChild(img);
