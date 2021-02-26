# SWARM

A little useful or a very distracting NewTabPage.
Also Supports Dark Mode.

## Sections

1. Poster
2. Current Time
3. Kanji
4. Book Reader
5. Audio
6. Icon Links

#### Poster

Poster Tab shows the random image it will fetch from `./media/images/` folder and all the images should be renamed to numbers starting from zero. The `noOfImages` varibale in the `index.js` should be set to the number of images you have in the `./media/images/` folder.

There can a better way of doing this by having a sinlge json file in the folder with the links of all the images and the reason I didn't did it that way was because it will fetch, process, select and send a request to other server every time i will open my NewTab. So i just download the images with enough resolution in the fodler and run a simple python script to rename and change the `noOfImages` variable for me.

#### Kanji

Kanji Tab shows a random kanji vocabulary by fetching a single json file from the `./media/vocab/` folder. I scraped a vocabulary list from a website and separated each with its own file ordering them all in numbers from 0 and so on. The reason to separate all into their own files is to not fetch and process the whole file every time a NewTab is opened. You also have to change the `noOfKanjiVocabFiles` variable according to the files you have in the folder.

#### Book Reader

Book Reader shows the current chapter of the book you are reading. I took a PDF book and then using Ptyhon separated the book into smaller 300 words chapter and stored them in json files. Then fethced the current chapter and stored that number in the `window.localStorage("chapter")` varibale.

The next button will change the chapter number and also the `window.localStorage("chapter")` variable. Same goes for `noOfChapters` variable in the `index.js`.

#### Audio

Audio tab fetches another json file from the `./meida/` folder and selects randomly an audio from the json file and injects it into the HTML.

#### Icon Links

This lists displays all the most common website that i visit.

### Color Scheme

Color Scheme is taken from Apple's [Website](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/color/)
