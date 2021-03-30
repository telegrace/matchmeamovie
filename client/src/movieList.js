import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieList, acceptRequest, unfriend } from "./actions";
import { Link } from "react-router-dom";

export default function MovieList() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovieList());
        console.log("GRACE");
    }, []);

    const friend = useSelector(
        (state) => state.users && state.users.filter((user) => user.accepted)
    );
    const wannabe = useSelector(
        (state) => state.users && state.users.filter((user) => !user.accepted)
    );

    if (!friend && !wannabe) {
        return null;
    }

    // 2 arrays - 1 array will be just wannabes and the 2nd array is friends.

    return (
        <div className="find-people">
            <h1>To Watch</h1>
            <div id="friends-list">
                <br></br>
                {friend.map((friend) => (
                    <div className="unfriend" key={friend.id}>
                        <p>{friend.title}</p>
                        <button onClick={() => dispatch(unfriend(friend.id))}>
                            UNFRIEND
                        </button>
                    </div>
                ))}
            </div>
            <h1>Already Seen</h1>
            <div id="wannabe-list">
                {wannabe.map((friend) => (
                    <div className="accept-list" key={friend.id}>
                        <Link to={`/user/${friend.id}`}>
                            <img src={friend.profile_pic} />
                        </Link>
                        <p>
                            {friend.name} {friend.surname}
                        </p>
                        <button
                            onClick={() => dispatch(acceptRequest(friend.id))}
                        >
                            ACCEPT
                        </button>
                        <button onClick={() => dispatch(unfriend(friend.id))}>
                            DENY
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
