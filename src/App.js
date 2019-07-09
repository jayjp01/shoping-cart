import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Cart from './components/Cart'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Cart} />
            <Route path="/cart" component={Cart} />
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
