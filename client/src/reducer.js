export function reducer(state = {}, action) {
    //series of if statements:

    if (action.type === "GET_MOVIELIST") {
        state = {
            ...state,
            movies: action.movieList,
        };
    }

    if (action.type === "GET_FRIENDSLIST") {
        state = {
            ...state,
            users: action.friendsList,
        };
    }

    if (action.type === "ACCEPT_REQUEST") {
        state = {
            ...state,
            accepted: true,
            users: state.users.map((friend) => {
                if (friend.id == action.id) {
                    return {
                        ...friend,
                        accepted: true,
                    };
                } else {
                    return friend;
                }
            }),
        };
    } else if (action.type === "UNFRIEND") {
        state = {
            ...state,
            accepted: false,
            users: state.users.map((friend) => {
                if (friend.id == action.id) {
                    return {
                        ...friend,
                        accepted: false,
                    };
                } else {
                    return friend;
                }
            }),
        };
    } else if (action.type === "CHAT_MESSAGES") {
        // A conditional for the action with the 10 most recent messages.
        // the reducer return a new object that has all the same properties as the old state object
        // except a an array of chat messages is added
        state = {
            ...state,
            msgs: action.msgs,
        };
    } else if (action.type === "CHAT_MESSAGE") {
        state = {
            ...state,
            msg: [action.msgs],
        };
    }
    return state;
}
