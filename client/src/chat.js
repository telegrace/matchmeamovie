import { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function Chat() {
    const chatMessages = useSelector((state) => state && state.msgs);
    console.log("chat", chatMessages);

    const elemRef = useRef();

    useEffect(() => {
        console.log("chat mounted...");
        //this is for the scroll
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);
    //refreshes
    const keyCheck = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            console.log("Here is event.target.value: ", event.target.value);
            socket.emit("chatMessage", event.target.value);
            event.target.value = "";
        }
    };
    return (
        <>
            <div id="chat">
                <h1>Chatroom</h1>
            </div>
            <div className="chat-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map((msgs) => (
                        <div className="messages" key={msgs.id}>
                            <img
                                className="chat-img"
                                src={msgs.profile_pic}
                            ></img>
                            <p>
                                {msgs.name} {msgs.surname} said at{" "}
                                {msgs.posted_at}: {msgs.message}
                            </p>
                        </div>
                    ))}
            </div>
            <textarea
                placeholder="write your message and press enter to send..."
                onKeyDown={keyCheck}
            ></textarea>
        </>
    );
}
