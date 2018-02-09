import React from "react";
import { connect } from "react-redux";
import User from "../components/User/User";

class UserContainer extends React.Component {
    setUser = (username) => {
        const { dispatch } = this.props;
        const user = username;
        dispatch({type: "SET_USER", user});
    };

    render() {
        return(
            <User 
              store={this.props}
              setUser={this.setUser}
            />
        )
    };

};

export default connect(state => state)(UserContainer);