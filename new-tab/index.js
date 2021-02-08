const noOfKanjiVocabFiles = 1030;
const noOfImages = 17;
const colors = [
  "blue",
  "green",
  "indigo",
  "orange",
  "pink",
  "purple",
  "red",
  "teal",
  "yellow",
];

document.addEventListener("DOMContentLoaded", () => {
  // Add Random Colors to Boxes
  let boxes = document.querySelectorAll(".button");
  boxes.forEach((box) => {
    box.classList.add(colors[Math.floor(Math.random() * colors.length)]);
  });

  // Add Random Images from Media Folder
  const image = document.getElementById("image");
  const img = document.createElement("img");
  img.src = `../media/images/${Math.floor(Math.random() * noOfImages)}.jpg`;
  image.appendChild(img);

  // Add Random Kanji Vocab
  fetch(
    `../media/vocab/${Math.floor(Math.random() * noOfKanjiVocabFiles)}.json`
  )
    .then((data) => data.json())
    .then((data) => {
      addVocab(data);
    });

  //  Display Time
  realTime();
});

function addVocab(data) {
  const vocabDiv = document.getElementById("kanji");
  const h1 = document.createElement("h1");
  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  const p = document.createElement("p");

  h1.innerHTML = data.vocab;
  h2.innerHTML = data.hiragana;
  p.innerHTML = data.english;

  div.appendChild(h2);
  div.appendChild(p);

  vocabDiv.appendChild(h1);
  vocabDiv.appendChild(div);
}

function realTime() {
  const date = new Date();
  document.getElementById("time").innerText = date.toLocaleTimeString();
  setTimeout(realTime, 1000);
}
