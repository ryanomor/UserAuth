import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import UserContainer from "../containers/UserContainer";
import './App.css';

class App extends React.Component {
  homepage = () => {
    return <img width="100%" alt="" src="http://getmespark.com/wp-content/uploads/welcome_thumb_tacks_1600_clr_9661.png" />
  };

  render() {
    return (
      <div className="App">
        <nav className="Navbar">
          <Link className="Navlink" to="/users">Login</Link> {" | "}
          <Link className="Navlink" to="/users/new">Sign Up</Link>
        </nav>

        <Switch>
          <Route exact path="/" render={this.homepage} />
          <Route path="/users"  component={UserContainer} />
        </Switch>

      </div>
    );
  }
}

export default App;
