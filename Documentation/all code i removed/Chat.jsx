import React, { useEffect, useState } from "react";
// import io from "socket.io-client";
// import ChatForm from './ChatForm.js';

const Chat = ({ socket, userName, chatRoom }) => {
  const [userMessage, setUserMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [roomInfo, setRoomInfo] = useState("");
  // const socket = io.connect("http://localhost:8000");
  const sendMessage = async () => {
    if (userMessage !== "") {
      const messageData = {
        chatRoom: roomInfo.roomID,
        author: userName,
        message: userMessage,
      };

      await socket.emit("send_message", messageData);
      setMessageList((List) => {
        if (!List.some((item) => item.message === messageData.message)) {
          return [...List, messageData];
        }
        return List;
      });

      setUserMessage("");
    }
  };
  useEffect(() => {
    // Retrieve messages from local storage when the component mounts
    const storedMessages =
      JSON.parse(localStorage.getItem("userMessage")) || [];
    setMessageList(storedMessages);

    // Listen for incoming messages
    socket.on("recieve_message", (data) => {
      setMessageList((list) => {
        if (!list.some((item) => item.message === data.message)) {
          const updatedMessages = [...list, data];

          // Update local storage
          localStorage.setItem("userMessage", JSON.stringify(updatedMessages));

          return updatedMessages;
        }
        return list;
      });

      console.log(data);
    });

    // Listen for room information
    socket.on("room_info", (data) => {
      setRoomInfo(data);
    });

    // Listen for the "user_joined" event
    socket.on("user_joined", (data) => {
      alert(`${data.userName} has joined the room.`);
    });

    // Clean up the socket listener on component unmount
    return () => {
      socket.off("recieve_message");
      socket.off("room_info");
      socket.off("user_joined");
    };
  }, [socket]);

  // useEffect(() => {
  //   socket.on("recieve_message", (data) => {
  //     setMessageList((List) => {
  //       if (!List.some((item) => item.message === data.message)) {
  //         return [...List, data];
  //       }
  //       return List;
  //     });

  //     const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];

  // // Update the state with stored messages
  // setMessageList(storedMessages);

  //     console.log(data);
  //   });

  //   socket.on("room_info", (data) => {
  //     setRoomInfo(data);
  //   });

  //   // Listen for the "user_joined" event
  //   socket.on("user_joined", (data) => {
  //     alert(`${data.userName} has joined the room.`);
  //   });
  // }, [socket]);

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="container mx-auto p-8 bg-white rounded-lg shadow-md border border-gray-200">
          <div className="bg-coral-600 text-gray p-4 text-center font-semibold">
            {roomInfo ? `Live Chat - Room ${roomInfo.roomID}` : "Live Chat"}
          </div>

          {/* Display room ID in the interface */}
          {roomInfo && (
            <div className="bg-gray-100 p-2 mt-2">
              <p>Room ID: {roomInfo.roomID}</p>
              {/* <p>Users in the room: {roomInfo.users.join(", ")}</p> */}
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 class-body">
            {messageList.map((messageContent) => (
              <div
                key={messageContent.message} // Add a unique key for each message
                className={`${
                  userName === messageContent.author
                    ? "flex items-start justify-start my-2"
                    : "flex items-end justify-end my-2"
                }`}
              >
                <div
                  className={`${
                    userName === messageContent.author
                      ? "bg-sky-500 rounded-lg p-3 shadow animate-slide-in-right"
                      : "bg-yellow-300 rounded-lg p-3 shadow animate-slide-in-left delay-200"
                  }`}
                >
                  <p className="text-gray-800">
                    <b>{messageContent.author}</b> : {messageContent.message}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-4">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full p-2 rounded-l border focus:outline-none"
                onChange={(event) => {
                  setUserMessage(event.target.value);
                }}
              />
              <button
                className="bg-coral-600 text-white p-2 rounded-r animate-pulse bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-gradient-to-r from-blue-600 to-blue-700"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
