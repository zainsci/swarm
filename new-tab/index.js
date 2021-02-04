const noOfKanjiVocabFiles = 1030;
const noOfImages = 17;

// Add Random Colors to Boxes
const colors = ["red", "yellow", "blue"];
let boxes = document.querySelectorAll(".box");

boxes.forEach((box) => {
  box.classList.add(colors[Math.floor(Math.random() * 3)]);
});

// Add Random Images from Media Folder
const image = document.getElementById("image");
const img = document.createElement("img");
img.src = `../media/images/${Math.floor(Math.random() * noOfImages)}.jpg`;
image.appendChild(img);

// Add Random Kanji Vocab To Page
fetch(`../media/vocab/${Math.floor(Math.random() * noOfKanjiVocabFiles)}.json`)
  .then((data) => data.json())
  .then((data) => {
    addVocab(data);
  });

function addVocab(data) {
  const vocabDiv = document.getElementById("kanji");
  const h2 = document.createElement("h2");
  const div = document.createElement("div");
  const h4 = document.createElement("h4");
  const p = document.createElement("p");

  h2.innerHTML = data.vocab;
  h4.innerHTML = data.hiragana;
  p.innerHTML = data.english;

  div.appendChild(h4);
  div.appendChild(p);

  vocabDiv.appendChild(h2);
  vocabDiv.appendChild(div);
}
