import axios from "./axios";
import { useState, useEffect } from "react";

//using hooks

// SEND FRIEND REQUEST
// CANCEL FRIEND REQUEST <DENY
// ACCEPT FRIEND REQUEST
// UNFRIEND
let data;
export default function FriendButton({ recipient_id }) {
    const [buttonText, setButtonText] = useState();
    console.log("GRACE", recipient_id);

    useEffect(function () {
        axios.get("/api/friendship-status/" + recipient_id).then(({ data }) => {
            setButtonText(data);
        });
    }, []);

    function handleClick() {
        console.log("Grace", buttonText);
        axios
            .post("/friend-button/" + recipient_id, buttonText)
            .then(({ data }) => {
                if (data) {
                    setButtonText(data);
                } else {
                    console.log("data fail");
                }
            })
            .catch((err) => {
                console.log("err in axios POST /handleClick Button: ", err);
            });
    }

    return (
        <div>
            <button onClick={() => handleClick()}>{buttonText}</button>
        </div>
    );
}
