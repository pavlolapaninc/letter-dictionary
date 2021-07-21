import { observable, action, makeAutoObservable, computed, transaction } from 'mobx'
//import dict from '../tools/dictionary'

const randomPictionaryWords = require('word-pictionary-list');


 class AppState {

   letter =  {
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


    setWords () {
         this.words = randomPictionaryWords({ min: 3, max: 10 })
     }

     findWordsByLetter(letter) {
       this.setWords()

       this.words.map(word => {
           /*eslint no-unused-expressions: [2, { allowTernary: true }]*/
           letter == word.slice(0,1) ? this.letter.firstLetter++ : null
           letter == word.slice(-1) ? this.letter.lastLetter++ : null

           const arr = word.split('')
           for (let i = 0; i < arr.length; i++){
               if(arr[i] == arr[i + 1]) {
                   this.letter.repeating++
               }
               /*eslint no-unused-expressions: [1, { allowTernary: true }]*/
               arr[i] == letter ? this.letter.appearing++ : null
           }
       })
     }

     setNewArray () {
         this.oldLetter = this.letter
         this.letter = {
             firstLetter: 0,
             lastLetter: 0,
             appearing: 0,
             repeating: 0,
         }
         console.log(this.letter, this.oldLetter)
     }

    // 1. How many words start with the letter <LETTER>
    // 2. How many times does the letter <LETTER> appear in the dictionary?
    // 3. How many words end with the letter <LETTER>?
    // 4. How many words have the same letter repeated in conjunction?
    // For instance, the word professor has ss, and for that, the count is 1.




 }
export default new AppState()
