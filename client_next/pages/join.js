import React, { useState } from "react";
import Link from "next/link";
import { notification } from "antd";

export default function SignIn() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  //   function handleClick() {
  //     navigate("/chat", { state: { name, room } });
  //   }
  return (
    <div className="joinOuterContainer">
      hi
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link
          href={{
            pathname: "/chat",
            query: { name, room },
          }}
        >
          <button className={"button mt-20"} type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}
