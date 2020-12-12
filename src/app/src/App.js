import React from 'react';
// import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import MainHome from './MainHome';

class App extends React.Component{
  
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div id="MapApp">
        <MainHome />
      </div>
    );
  }
}

export default App;