import React from "react";
import axios from "axios";

class LoginUser extends React.Component {
    state = { 
        usernameInput: "", 
        passwordInput: "", 
        message: "",
    };

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value,
            message: ""
        });
    };

    submitForm = e => {
        e.preventDefault();
        const { usernameInput, passwordInput } = this.state;

        if (passwordInput.length < 6) {
            this.setState({
                message: "Password must be at least 6 characters"
            });
            return;
        }

        axios
        .post("/users/login", {
            username: usernameInput,
            password: passwordInput
        })
        .then(res => {
            this.props.setUser(res.data.user);
        })
        .catch(err => {
            console.log("error: ", err);
            this.setState({
                usernameInput: "",
                passwordInput: "",
                message: "Error signing in"
            });
        });
    };

    render() {
        const { usernameInput, passwordInput, message } = this.state;
        
        return (
        <div>
            <h1> Login </h1>

            <form onSubmit={this.submitForm}>
            <label>
                Username: {" "}
                <input
                type="text"
                name="usernameInput"
                value={usernameInput}
                onChange={this.handleInput}
                />
            </label>
            {" "}
            <label>
                Password: {" "}
                <input
                type="password"
                name="passwordInput"
                value={passwordInput}
                onChange={this.handleInput}
                />
            </label>
            {" "}
            <input type="submit" value="Submit" />
            </form>
            <p>{message}</p>
        </div>
        );
    }
};

export default LoginUser;