const noOfAudios = 0

chrome.browserAction.onClicked.addListener(function () {
  const audioURL = Math.round(Math.random() * noOfAudios)
  const audio = new Audio(`assets/media/audio/${audioURL}.mp3`)

  audio.play()
})
