/*
 * Constants For NewTab
 */
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
  // Random Border Color
  let boxes = document.querySelectorAll(".grid__item");
  boxes.forEach((box) => {
    box.classList.add(colors[Math.floor(Math.random() * colors.length)]);
  });

  // Random Poster to Poster Section
  const image = document.getElementById("Poster");
  const img = document.createElement("img");
  img.src = `../media/images/${Math.floor(Math.random() * noOfImages)}.jpg`;
  image.appendChild(img);

  // Fetch Random Kanji
  fetch(
    `../media/vocab/${Math.floor(Math.random() * noOfKanjiVocabFiles)}.json`
  )
    .then((data) => data.json())
    .then((data) => {
      addVocab(data);
    });

  // Time
  realTime();
});

/*
 * Add Vocabulary Word To NewTab
 */
function addVocab(data) {
  const vocabDiv = document.getElementById("Kanji");
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

/*
 * Add RealTime to NewTab
 */
function realTime() {
  const date = new Date();
  document.getElementById("Time").innerText = date.toLocaleTimeString();
  setTimeout(realTime, 1000);
}
