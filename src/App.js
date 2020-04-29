import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Main'

class App extends React.Component{
  constructor(props){
    super(props)
  }
  
  render(){
    return (
      <div className="App">
        <Main/>
      </div>
    );
  }
}

export default App;
