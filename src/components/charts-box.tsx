import React from 'react';
import { observer } from "mobx-react-lite"
import { Chart } from 'react-charts'
import store from "../store/appstate";
import styled from '@emotion/styled'


const ChartBox = () => {

  const { firstLetter, lastLetter, appearing, repeating, letter } = store.letter
  const { firstLetter: firstOld, lastLetter: lastOld, appearing: oldApp, repeating: oldRep, letter: oldLetter } = store.oldLetter


  const Div = styled.div`
  width: 400px;
  height: 300px;
  margin: 2rem;
  `

  const Wrapper = styled.div`
  margin: 15px auto;
  display: flex;
  justify-content: space-around
`

  const series = React.useMemo(() => ({ type: 'bar' }), [])

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom' },
      { type: 'linear', position: 'left', stacked: false }
    ],
    []
  )

  let data = [
    {
      data: [
        ['First Letter', firstLetter],
        ['Last Letter', lastLetter],
        ['Appearing', appearing],
        ['Conjunction', repeating]
      ],
    },
  ]

  let oldLetterData = [
    {
      data: [
        ['First Letter', firstOld],
        ['Last Letter', lastOld],
        ['Appearing', oldApp],
        ['Conjunction', oldRep]
      ],
    },
  ]

  return (
    <Wrapper>
      <Div>
        {letter &&
          <>
            <h2>Current Letter: {letter}</h2>
            <Chart data={data} axes={axes} series={series} tooltip />
          </>
        }
      </Div>
      <Div>
        {oldLetter &&
          <>
            <h2>Old Letter: {oldLetter}</h2>
            <Chart data={oldLetterData} axes={axes} series={series} tooltip />
          </>
        }
      </Div>
    </Wrapper>

  )
}

export default observer(ChartBox)