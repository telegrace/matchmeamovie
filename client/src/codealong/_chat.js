import { useEffect, useRef } from "react";
import { socket } from ".sockets";
import { useSelector } from "react-redux";

export default function Chat() {
    const chatMessages = useSelector((state) => state && state.chatMessages);
    console.log("chat", chatMessages);

    const elemRef = useRef();
    useEffect(() => {
        console.log("chat mounted....");
        console.log("elemRef.current: ", elemRef.current);
        console.log("elemRef.current.scrollTop: ", elemRef.current.scrollTop);
        console.log(
            "elemRef.current.scrollHeight: ",
            elemRef.current.scrollHeight
        );
        console.log(
            "elemRef.current.clientHeight: ",
            elemRef.current.clientHeight
        );
        const newScrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
        elemRef.current.scrollTop = newScrollTop;
    }, []);
    const keyCheck = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            console.log("Here is e.target.value: ", e.target.value);
            socket.emit("the chat message", event.target.value);
            e.target.value = "";
        }
    };
    return (
        <>
            <h1>Chatroom</h1>
            <div className="chat-container" ref={elemRef}>
                {/* loop over chat message for each chat obj */}
                <p>Chat msg wil go here</p>
            </div>
            <textarea
                placeholder="write your message..."
                onKeyDown={keyCheck}
            ></textarea>
        </>
    );
}
