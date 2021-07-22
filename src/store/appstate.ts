import { makeAutoObservable } from 'mobx'
const randomPictionaryWords = require('word-pictionary-list');

export interface Letter {
  letter: string;
  firstLetter: number;
  lastLetter: number;
  appearing: number;
  repeating: number;
}

class AppState {

  letter : Letter = {
    letter: '',
    firstLetter: 0,
    lastLetter: 0,
    appearing: 0,
    repeating: 0,
  }

  oldLetter : any = {}

  words : string[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setWords() {
    //Gives 10 random words from dictionary
    this.words = randomPictionaryWords({ min: 10, max: 10 })
  }

  findWordsByLetter(letter: string) {
    this.setWords()
    this.letter.letter = letter;

    this.words.forEach(res  => {
      let word : string = res.toLowerCase()
      
      if(letter === word.slice(0, 1)) this.letter.firstLetter++ 
      if(letter === word.slice(-1)) this.letter.lastLetter++ 

      const arr = word.split('')
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === arr[i + 1]) {
          this.letter.repeating++
        }
        
        if(arr[i] === letter) this.letter.appearing++
      }
    })
  }

  setNewArray() {
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
