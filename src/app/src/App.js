import React from 'react';
// import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import MainHome from './MainHome';
import "./index.css";

class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="maxheight">
        <MainHome />
      </div>
    );
  }
}

export default App;
