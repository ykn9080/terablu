import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useRouter } from "next/router";
import TextContainer from "../src/components/chatbox/TextContainer";
import Messages from "../src/components/chatbox/Messages";
import InfoBar from "../src/components/chatbox/InfoBar";
import Input from "../src/components/chatbox/Input";

//const ENDPOINT = "https://project-chat-application.herokuapp.com/";

//const ENDPOINT = "http://localhost:5000";
const ENDPOINT = "http://imcmaster.iptime.org:25000";

let socket;

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const { name, room } = router.query;

    socket = io(ENDPOINT);
    //socket = io.connect("http://localhost:5000");
    console.log(socket, name, room);
    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, router.query]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      console.log(message);
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} socket={socket} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
