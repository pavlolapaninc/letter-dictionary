import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled'
import { observer } from "mobx-react-lite"
import store from "../store/appstate";

const SearchBar = () => {

  const [error, setError] = React.useState(false)
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (null !== inputEl.current) {
      inputEl.current.focus()
    }
  }, [store.letter.letter])

  const text = `Enter the 'Letter' here`

  const Div = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  `

  const Card = styled.div`
    margin: 15px auto;
    padding: 10px;
    background: #fff;
    display: inline-block;
    box-shadow: 0 0 3rem -1rem rgba(0,0,0,0.5);
    transition: transform 0.1s ease-in-out, box-shadow 0.1s;
    border-radius: 5px;
    font-family: sans-serif;
    color: #515151;

    &:hover {
      transform: translateY(-0.5rem) scale(1.0125);
	    box-shadow: 0 0.5em 3rem -1rem rgba(0,0,0,0.5);
    }
  `

  const Wrapper = styled.div`
    margin: 15px auto;
    display: flex;
    justify-content: space-between
  `

  const Input = styled.input`
      padding: 5px 10px;
      background-color: #fff;
      font-size: 24px;
      border-radius: 4px;
      border-color: #f7d7e1;
      color: black;
      font-weight: bold;
      width: 300px;
      text-align: center;
      maxlength: 1;
      &:hover {
        color: dark;
      }
      &:focus {
         outline: 0
      }
    `

  const ErrorMsg = styled.span`
      font-weight: bold;
      color: red;
      margin: 0 auto;
      text-transform: capitalize;
  `

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const letter = e.target.value.toLowerCase()
    let error: boolean = false

    const isLetter = /^[a-zA-Z]/.test(letter);
    if (!isLetter && letter) {
      setError(true)
      error = true
    }
    else {
      setError(false)
    }

    if (!error) {
      letter ? store.findWordsByLetter(letter) : store.setNewArray()
    }
  }

  return (
    <>
      <Div>
        <h2>{text}</h2>
        <Input ref={inputEl} maxLength={1}
          onChange={(e) => handleChange(e)}
          value={store.letter.letter} />
        {
          error &&
          <ErrorMsg>Enter the correct Letter</ErrorMsg>
        }
        {store.words.length !== 0 &&
          <p><b>List of words:</b> {store.words.map(word => word + ' ')}</p>}
      </Div>
      <Wrapper>
        {store.letter.firstLetter !== 0 &&
          <Card>Number of words which start with your letter:  {store.letter.firstLetter}</Card>}
        {store.letter.lastLetter !== 0 &&
          <Card>Number of words which end with your letter:  {store.letter.lastLetter}</Card>}
        {store.letter.appearing !== 0 &&
          <Card>Your letter appears {store.letter.appearing} time(s)</Card>}
        {store.letter.repeating !== 0 &&
          <Card>Word has repeated letter in conjunction: {store.letter.repeating} time(s)</Card>}
      </Wrapper>
    </>
  )

};

export default observer(SearchBar)