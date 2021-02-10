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
  // Theme Setter and Toggler
  themeChange();

  // Random Border Color
  let boxes = document.querySelectorAll(".grid__item");
  boxes.forEach((box) => {
    box.classList.add(colors[Math.floor(Math.random() * colors.length)]);
  });

  // Random Poster to Poster Section
  const image = document.getElementById("Poster");
  const img = document.createElement("img");
  img.src = `./media/images/${Math.floor(Math.random() * noOfImages)}.jpg`;
  image.appendChild(img);

  // Fetch Random Kanji
  fetch(`./media/vocab/${Math.floor(Math.random() * noOfKanjiVocabFiles)}.json`)
    .then((data) => data.json())
    .then((data) => {
      addVocab(data);
    });

  // Fetch Book Chapter
  const chapter = window.localStorage.getItem("chapter");
  addChapter(chapter);
  const Next = document.getElementById("Next");
  Next.addEventListener("click", () => {
    const nextChapter = parseInt(chapter, 10) + 1;
    window.localStorage.setItem("chapter", nextChapter);
    addChapter(nextChapter);
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

function themeChange() {
  const theme = window.localStorage.getItem("theme");
  const body = document.body;

  const toggleBtn = document.getElementById("Toggle");
  const moon = document.querySelector(".moon");
  const sun = document.querySelector(".sun");

  if (theme) {
    if (theme === "dark") {
      setDarkTheme();
    } else if (theme === "light") {
      setLightTheme();
    }
  } else {
    localStorage.setItem("theme", "light");
  }

  toggleBtn.addEventListener("click", () => {
    if (body.className === "theme__light") {
      setDarkTheme();
      localStorage.setItem("theme", "dark");
    } else if (body.className === "theme__dark") {
      setLightTheme();
      localStorage.setItem("theme", "light");
    }
  });

  function setDarkTheme() {
    body.className = "theme__dark";
    moon.style.display = "block";
    sun.style.display = "none";
    document.getElementById("Toggle").className = "dark";
  }
  function setLightTheme() {
    body.className = "theme__light";
    moon.style.display = "none";
    sun.style.display = "block";
    document.getElementById("Toggle").className = "light";
  }
}

// Add Chapter from Book
function addChapter(chapter) {
  const Text = document.getElementById("Text");
  const current = document.querySelector(".settings__chapter");
  const p = document.createElement("p");

  if (chapter) {
    fetch(`./media/book/${chapter}.json`)
      .then((data) => data.json())
      .then((data) => {
        p.innerHTML = data.body;
        current.innerHTML = data.title;

        Text.innerHTML = "";
        Text.appendChild(p);

        window.localStorage.setItem("chapter", chapter);
      });
  } else {
    fetch("./media/book/0.json")
      .then((data) => data.json())
      .then((data) => {
        p.innerHTML = data.body;
        current.innerHTML = data.title;

        Text.innerHTML = "";
        Text.appendChild(p);

        window.localStorage.setItem("chapter", 0);
      });
  }
}
