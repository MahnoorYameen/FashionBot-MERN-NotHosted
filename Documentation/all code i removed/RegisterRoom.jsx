import React, { useState } from "react";
import axios from "axios";

const RegisterRoom = () => {
  // const [userName_1, setUserName_1] = useState("");
  // const [userName, setUserName] = useState("");

  const [roomID, setRoomID] = useState("");

  const handleCreateRoom = async () => {
    // Add your logic to create a room here
    try {
        // Make an HTTP POST request to your server to register the user and create a room
        const response = await axios.post("http://localhost:5000/create-room", {
            // userName,
            roomID,
          }, {
            headers: {
              "Content-Type": "application/json",
            },
          });
  
        console.log(response.data); // Log the response from the server
      } catch (error) {
        console.error("Error creating room:", error);
      }
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="container mx-auto p-8 bg-white rounded-lg shadow-md border border-gray-200">
          <h3 className="text-2xl font-semibold mb-8 text-purple-500">
            Register A room For Chat
          </h3>
          {/* <div className="mb-4">
            <input
              type="text"
              placeholder="Enter your User Name"
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
              value={userName}
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
          </div> */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter room ID"
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
              value={roomID}
              onChange={(event) => {
                setRoomID(event.target.value);
              }}
            />
          </div>
          <button
            onClick={handleCreateRoom}
            className="bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600"
          >
            Create Room
          </button>
        </div>
      </div>
    </>
  );
};

export default RegisterRoom;
