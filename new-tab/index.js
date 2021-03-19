document.addEventListener("DOMContentLoaded", () => {
  const noOfKanjiVocabFiles = 1;
  const noOfImages = 1;
  const noOfChapters = 1;
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

  changeBorders(colors);
  addPoster(noOfImages);
  addTime();
  addVocab(noOfKanjiVocabFiles);
  addChapter(window.localStorage.getItem("chapter"), noOfChapters);
  addQuote();
  addAudio();

  const nextBtn = document.getElementById("Next");
  nextBtn.onclick = () => {
    const chapter = window.localStorage.getItem("chapter");
    if (parseInt(chapter, 10) === noOfChapters) {
      document.getElementById("Text").innerHTML =
        "No More Chapters From This Book";
    } else {
      const nextChapter = parseInt(chapter, 10) + 1;
      window.localStorage.setItem("chapter", nextChapter);
      addChapter(nextChapter, noOfChapters);
    }
  };

  themeChanger();
});

function changeBorders(colors) {
  let boxes = document.querySelectorAll(".grid__item");
  boxes.forEach((box) => {
    box.classList.add(colors[Math.floor(Math.random() * colors.length)]);
  });
}

function addPoster(noOfImages) {
  const Poster = document.getElementById("Poster");
  const img = document.createElement("img");
  img.src = `./media/images/${Math.floor(Math.random() * noOfImages)}.jpg`;
  Poster.appendChild(img);
}

function addTime() {
  const date = new Date();
  document.getElementById("Time").innerText = date.toLocaleTimeString();
  setTimeout(addTime, 1000);
}

function addVocab(noOfKanjiVocabFiles) {
  fetch(`./media/vocab/${Math.floor(Math.random() * noOfKanjiVocabFiles)}.json`)
    .then((data) => data.json())
    .then((data) => {
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
    });
}

function addChapter(chapter, noOfChapters) {
  const Text = document.getElementById("Text");
  const current = document.getElementById("currentChapter");
  const p = document.createElement("p");

  if (chapter) {
    fetch(`./media/book/${chapter}.json`)
      .then((data) => data.json())
      .then((data) => {
        p.innerHTML = data.body;
        current.innerHTML = data.title + `/${noOfChapters}`;

        Text.innerHTML = "";
        Text.appendChild(p);

        window.localStorage.setItem("chapter", chapter);
      });
  } else {
    fetch("./media/book/0.json")
      .then((data) => data.json())
      .then((data) => {
        p.innerHTML = data.body;
        current.innerHTML = data.title + `/${noOfChapters}`;

        Text.innerHTML = "";
        Text.appendChild(p);

        window.localStorage.setItem("chapter", 0);
      });
  }
}

function addQuote() {
  fetch("./media/quotes.json")
    .then((data) => data.json())
    .then((data) => {
      const text = document.querySelector(".quote__text");
      const author = document.querySelector(".quote__author");

      const randNum = Math.round(Math.random() * data.length);
      const quote = data[randNum];

      text.innerHTML = quote.text;
      author.innerHTML = `-- ${quote.author}`;
    });
}

function addAudio() {
  fetch("./media/audio.json")
    .then((data) => data.json())
    .then((data) => {
      const audioTitle = document.querySelector(".audio__title");
      const audioTrack = document.querySelector(".audio__track");

      const audio = document.createElement("audio");

      const randNum = Math.round(Math.random() * data.length);
      audio.src = data[randNum].path;
      audio.controls = true;

      audioTitle.innerHTML = data[randNum].title;
      audioTrack.appendChild(audio);
    });
}

function themeChanger() {
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
