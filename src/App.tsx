import React from 'react';
import ChartBox from './components/charts-box';
import SearchBar from "./components/search-bar";
const App = () => {

  return (
    <div className="App">
      <SearchBar/>
      <ChartBox />
    </div>
  )
}

export default App;
