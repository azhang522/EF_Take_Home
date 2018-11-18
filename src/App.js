import React, { Component } from 'react';
import './App.css';
import UserTable from './UserTable';

class App extends Component {
  render() {
    return (
      <div className="App">
	  	<div className="table-cont">
        	<UserTable />
		</div>
      </div>
    );
  }
}

export default App;
