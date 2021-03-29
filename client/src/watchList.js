import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsList, acceptRequest, unfriend } from "./actions";

export default function WatchList() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFriendsList());
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
        <div>
            <h1>FRIENDS AND FRIEND REQUESTS</h1>
            {friend.map((friend) => (
                <div className="unfriend-list" key={friend.id}>
                    <p>
                        {friend.name} {friend.surname}
                        <img src={friend.profile_pic}></img>
                    </p>
                    <button onClick={() => dispatch(unfriend(friend.id))}>
                        UNFRIEND
                    </button>
                </div>
            ))}
            {wannabe.map((friend) => (
                <div className="accept-list" key={friend.id}>
                    <p>
                        {friend.name} {friend.surname}
                        <img src={friend.profile_pic}></img>
                    </p>
                    <button onClick={() => dispatch(acceptRequest(friend.id))}>
                        ACCEPT
                    </button>
                </div>
            ))}
        </div>
    );
}
