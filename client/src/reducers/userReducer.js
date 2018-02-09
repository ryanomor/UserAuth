const defaultState = {
    user: "",
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case "SET_USER": {
            const newState = {
                user: action.user,
            };
            return newState;
        }
        case "UPDATE": {
            const newState = {
                user: action.newUsername,
            };
            return newState;
        } 
        default: 
            return state;
    }
};