import React from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import LoginUser from "./LoginUser";
import NewUser from "./NewUser";

class User extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
        };
    };

    setUser = (user) => {
        this.props.setUser(user);
        this.setState({
            loggedIn: true,
        });
    };

    logout = () => {
        axios
            .get("/users/logout")
            .then(() => {
                this.setState({
                    loggedIn: false,
                })
            });
    };

    loginUser = () => {
        const { loggedIn } = this.state;
        const user = loggedIn ? this.props.store.user : "";
        return !loggedIn 
                    ? <LoginUser setUser={this.setUser}  />
                    : <div>
                        <h2> {`Welcome back, ${user}!`} </h2>
                        <br />
                        <button onClick={this.logout}> Sign out </button>
                    </div>; 
    };

    render() {
        return(
            <div>
                <Switch>
                    <Route exact path='/users' render={this.loginUser} />
                    <Route path='/users/new' component={NewUser} />
                </Switch>
            </div>
        );
    };
};

export default User;