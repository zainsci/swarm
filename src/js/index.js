import "../css/styles.scss"

document.addEventListener("DOMContentLoaded", () => {
  const noOfKanjiVocabFiles = 1
  const noOfImages = 1
  const noOfChapters = 1
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
  ]

  changeBorders(colors)
  addPoster(noOfImages)
  addTime()
  addVocab(noOfKanjiVocabFiles)
  addChapter(window.localStorage.getItem("chapter"), noOfChapters)
  addQuote()
  addNews()

  const nextBtn = document.getElementById("Next")
  nextBtn.onclick = () => {
    const chapter = window.localStorage.getItem("chapter")
    if (parseInt(chapter, 10) === noOfChapters) {
      document.getElementById("Text").innerHTML =
        "No More Chapters From This Book"
    } else {
      const nextChapter = parseInt(chapter, 10) + 1
      window.localStorage.setItem("chapter", nextChapter)
      addChapter(nextChapter, noOfChapters)
    }
  }

  themeChanger()
})

function changeBorders(colors) {
  let boxes = document.querySelectorAll(".grid__item")
  boxes.forEach((box) => {
    box.classList.add(colors[Math.floor(Math.random() * colors.length)])
  })
}

function addPoster(noOfImages) {
  const Poster = document.getElementById("Poster")
  const img = document.createElement("img")
  img.src = `assets/media/images/${Math.floor(Math.random() * noOfImages)}.jpg`
  Poster.appendChild(img)
}

function addTime() {
  const date = new Date()
  document.getElementById("Time").innerText = date.toLocaleTimeString()
  setTimeout(addTime, 1000)
}

function addVocab(noOfKanjiVocabFiles) {
  fetch(
    `assets/media/vocab/${Math.floor(Math.random() * noOfKanjiVocabFiles)}.json`
  )
    .then((data) => data.json())
    .then((data) => {
      const vocabDiv = document.getElementById("Kanji")
      const h1 = document.createElement("h1")
      const div = document.createElement("div")
      const h2 = document.createElement("h2")
      const p = document.createElement("p")

      h1.innerHTML = data.vocab
      h2.innerHTML = data.hiragana
      p.innerHTML = data.english

      div.appendChild(h2)
      div.appendChild(p)

      vocabDiv.appendChild(h1)
      vocabDiv.appendChild(div)
    })
}

function addChapter(chapter, noOfChapters) {
  const Text = document.getElementById("Text")
  const current = document.getElementById("currentChapter")
  const p = document.createElement("p")

  if (chapter) {
    fetch(`assets/media/book/${chapter}.json`)
      .then((data) => data.json())
      .then((data) => {
        p.innerHTML = data.body
        current.innerHTML = data.title + `/${noOfChapters}`

        Text.innerHTML = ""
        Text.appendChild(p)

        window.localStorage.setItem("chapter", chapter)
      })
  } else {
    fetch("assets/media/book/0.json")
      .then((data) => data.json())
      .then((data) => {
        p.innerHTML = data.body
        current.innerHTML = data.title + `/${noOfChapters}`

        Text.innerHTML = ""
        Text.appendChild(p)

        window.localStorage.setItem("chapter", 0)
      })
  }
}

function addQuote() {
  fetch("assets/media/quotes.json")
    .then((data) => data.json())
    .then((data) => {
      const text = document.querySelector(".quote__text")
      const author = document.querySelector(".quote__author")

      const randNum = Math.round(Math.random() * data.length) % data.length
      const quote = data[randNum]

      text.innerHTML = quote.text
      author.innerHTML = `-- ${quote.author}`
    })
}

function addNews() {
  const newsList = document.getElementById("newsList")

  fetch("https://hacker-news.firebaseio.com/v0/newstories.json")
    .then((res) => res.json())
    .then((data) => {
      const bestStories = data.slice(0, 25)

      bestStories.forEach((story) => {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${story}.json`)
          .then((res) => res.json())
          .then((data) => {
            const li = document.createElement("li")
            const title = document.createElement("a")
            title.innerText = data.title
            title.href = data.url
              ? data.url
              : `https://news.ycombinator.com/item?id=${data.id}`
            title.target = "_blank"
            title.rel = "noopener noreferrer"

            li.appendChild(title)
            newsList.appendChild(li)
          })
          .catch((e) => console.log(e))
      })
    })
    .catch((e) => {
      newsList.innerText(e)
    })
}

function themeChanger() {
  const theme = window.localStorage.getItem("theme")
  const body = document.body

  const toggleBtn = document.getElementById("Toggle")
  const moon = document.querySelector(".moon")
  const sun = document.querySelector(".sun")

  if (theme) {
    if (theme === "dark") {
      setDarkTheme()
    } else if (theme === "light") {
      setLightTheme()
    }
  } else {
    localStorage.setItem("theme", "light")
  }

  toggleBtn.addEventListener("click", () => {
    if (body.className === "theme__light") {
      setDarkTheme()
      localStorage.setItem("theme", "dark")
    } else if (body.className === "theme__dark") {
      setLightTheme()
      localStorage.setItem("theme", "light")
    }
  })

  function setDarkTheme() {
    body.className = "theme__dark"
    moon.style.display = "block"
    sun.style.display = "none"
    document.getElementById("Toggle").className = "blue"
  }
  function setLightTheme() {
    body.className = "theme__light"
    moon.style.display = "none"
    sun.style.display = "block"
    document.getElementById("Toggle").className = "orange"
  }
}
