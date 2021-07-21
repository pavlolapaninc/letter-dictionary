import { makeAutoObservable } from 'mobx'
const randomPictionaryWords = require('word-pictionary-list');

class AppState {

  letter = {
    letter: '',
    firstLetter: 0,
    lastLetter: 0,
    appearing: 0,
    repeating: 0,
  }
  oldLetter = {}
  words = []

  constructor() {
    makeAutoObservable(this)
  }


  setWords() {
    //Gives 10 random words from dictionary
    this.words = randomPictionaryWords({ min: 10, max: 10 })
  }

  findWordsByLetter(letter) {
    this.setWords()
    this.letter.letter = letter;

    this.words.map(word => {
      /*eslint no-unused-expressions: [2, { allowTernary: true }]*/
      letter == word.slice(0, 1) ? this.letter.firstLetter++ : null
      letter == word.slice(-1) ? this.letter.lastLetter++ : null

      const arr = word.split('')
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == arr[i + 1]) {
          this.letter.repeating++
        }
        /*eslint no-unused-expressions: [1, { allowTernary: true }]*/
        arr[i] == letter ? this.letter.appearing++ : null
      }
    })
  }

  setNewArray(letter) {
    this.oldLetter = this.letter
    this.letter = {
      letter: '',
      firstLetter: 0,
      lastLetter: 0,
      appearing: 0,
      repeating: 0,
    }

  }

}

export default new AppState()
