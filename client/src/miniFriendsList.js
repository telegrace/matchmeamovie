import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsList } from "./actions";

import { Link } from "react-router-dom";

export default function MiniFriendsList() {
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

    return (
        <div className="mini-friends-list-container">
            <Link to="/get-friendslist/">FRIENDS</Link>

            <div id="mini-friends-list">
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
