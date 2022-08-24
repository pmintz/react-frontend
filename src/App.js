import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TransactionList from './TransactionList';
import TransactionListEdit from "./TransactionListEdit";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/transactions'  component={TransactionList}/>
            <Route path='/add' component={TransactionListEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;