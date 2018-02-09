import React from "react";
import axios from "axios";

class NewUser extends React.Component {
    state = { 
        usernameInput: "", 
        passwordInput: "", 
        message: "" 
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
        };

        axios
            .post("/users/new", {
                username: usernameInput,
                password: passwordInput
            })
            .then(res => {
                console.log(res.data);
                this.setState({
                usernameInput: "",
                passwordInput: "",
                message: "You're all signed up!"
                });
            })
            .catch(err => {
                console.log(err.response)
                if (err.response && err.response.data) {
                    this.setState({
                        usernameInput: "",
                        passwordInput: "",
                        message: err.response.data.message,
                    });
                } else {
                    this.setState({
                        usernameInput: "",
                        passwordInput: "",
                        message: "Error signing up"
                    });
                };
            });
    };

    render() {
        const { usernameInput, passwordInput, message } = this.state;
        return (
        <div>
            <h1> Join Us! </h1>

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
}

export default NewUser;
