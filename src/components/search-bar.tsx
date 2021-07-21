import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled'
import { observer } from "mobx-react-lite"
import store from "../store/appstate";

const SearchBar = () => {

  const text = `Enter the 'Letter' here`

  const Div = styled.div`
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;`

  const Card = styled.div`
      margin: 15px auto;
      padding: 10px;
      background: #51cc6163;
      width: 80%;
      display: flex;
      border: 2px solid white;
      flex-direction: column;
      `

    const Input = styled.input`
      padding: 5px 10px;
      background-color: #ff9a90;
      font-size: 24px;
      border-radius: 4px;
      border-color: #f7d7e1;
      color: black;
      font-weight: bold;
      width: 300px;
      text-align: center;
      maxlength: 1;
      &:hover {
        color: white;
      }
      &:focus {
         outline: 0
      }
    `

  const handleChange = (e: any) =>{
    const letter = e.target.value
    store.findWordsByLetter(letter)
    if(letter === "") {
      store.setNewArray()
      store.findWordsByLetter(letter)
    }
  }

    return(
    <>
        <Div>
            <h2>{text}</h2>
            <Input maxLength={1}
            onChange={(e) => handleChange(e)}/>
        </Div>
        <Card>
          {store.letter.firstLetter !== 0 &&
          <p>Words starts with your letter:  {store.letter.firstLetter}</p>}
          {store.letter.lastLetter !== 0 &&
          <p>Words ends with your letter:  {store.letter.lastLetter}</p>}
          {store.letter.appearing !==0 &&
          <p>Your letter appear {store.letter.appearing} time(s)</p>}
          {store.letter.repeating !==0 &&
          <p>Your letter repeated in conjunction {store.letter.repeating} time(s)</p>}
        </Card>
      </>
    )

};

export default observer(SearchBar)