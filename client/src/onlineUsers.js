import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsList } from "./actions";

import { Link } from "react-router-dom";

export default function MiniOnlineUsers() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFriendsList());
    }, []);

    const friend = useSelector(
        (state) => state.users && state.users.filter((user) => user.accepted)
    );

    if (!friend) {
        return null;
    }

    // 2 arrays - 1 array will be just wannabes and the 2nd array is friends.

    return (
        <div className="mini-online-list-container">
            <Link to="/get-friendslist/">ONLINE USERS</Link>

            <div id="mini-online-list">
                {friend.map((friend) => (
                    <div className="unfriend" key={friend.id}>
                        <Link to={`/user/${friend.id}`}>
                            <img src={friend.profile_pic} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
