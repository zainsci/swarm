const noOfAudios = 5;

chrome.action.onClicked.addListener(playAudio);

function playAudio() {
  const audioURL = Math.round(Math.random() * noOfAudios);
  const audio = new Audio(`../media/audio/${audioURL}.mp3`);

  audio.play();
}
