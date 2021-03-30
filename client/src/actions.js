// export all our action creator functions
import axios from "./axios";

export async function getMovieList() {
    const { data } = await axios.get("/api/get-movielist");
    return {
        type: "GET_MOVIELIST",
        movieList: data.movies,
    };
}

export async function getFriendsList() {
    const { data } = await axios.get("/api/get-friendslist");
    return {
        type: "GET_FRIENDSLIST",
        friendsList: data.user,
    };
}

export async function acceptRequest(id) {
    await axios.post(`/accept-request/${id}`);
    return {
        type: "ACCEPT_REQUEST",
        id,
    };
}

export async function unfriend(id) {
    await axios.post(`/unfriend/${id}`);
    return {
        type: "UNFRIEND",
        id,
    };
}

export function chatMessages(msgs) {
    // db is done ins server already
    // console.log("Grace actions.js chatMessages", msgs);
    return {
        type: "CHAT_MESSAGES",
        msgs,
    };
}

export function chatMessage(msg) {
    return {
        type: "CHAT_MESSAGE",
        msg,
    };
}
