import React from "react";
import { useRouter } from "next/router";

const InfoBar = ({ room, socket }) => {
  const router = useRouter();
  const exit = () => {
    console.log("clicked", socket);
    socket.emit("wantout", { room }, function () {
      console.log("disconnect client event....");
    });
     if (typeof window !== "undefined") {
       localStorage.removeItem("token");
       localStorage.removeItem("user");
     }
     router.push("/");
  };
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img
          className="onlineIcon"
          src="/icons/onlineIcon.png"
          alt="online icon"
        />
        <h3>Room: {room}</h3>
      </div>
      <div className="rightInnerContainer">
        <button onClick={exit}>
          <img src="/icons/closeIcon.png" alt="close icon" />
          Exit
        </button>
      </div>
    </div>
  );
};

export default InfoBar;
