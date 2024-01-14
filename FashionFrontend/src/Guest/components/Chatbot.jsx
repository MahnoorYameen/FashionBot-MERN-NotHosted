import React, { useEffect, useState } from "react";
import axios from "axios";
// import Footer from "../../User/components/Footer";
// import Footer from "../pages/Footer";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    // Scroll to the bottom of the chat on every update
    const chatMessages = document.getElementById("chat-messages");
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, [messages]);

  const messageChatbot = async (e) => {
    e.preventDefault();

    // Update the state with the user's message
    setMessages([...messages, { type: "user", text: userInput }]);

    // Make an API request to the backend to send the user's message
    try {
      // Simulate a delay to show the thinking animation
      setMessages([...messages, { type: "chatbot", text: "Thinking..." }]);
      setTimeout(async () => {
        const response = await axios.post("http://localhost:1234/send-msg", {
          user_message: userInput,
        });

        // Store the chatbot response in a variable
        const chatbotResponse = response.data.Reply;

        // Update the state with both the user's message and chatbot's response
        setMessages([
          ...messages,
          { type: "user", text: userInput },
          { type: "chatbot", text: chatbotResponse },
        ]);

        // Clear the input field
        setUserInput("");
      }, 1000); // Simulated delay of 1 second
    } catch (error) {
      console.error("Error sending user input to backend:", error);
    }
  };

  return (
    <>
     <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light">
  <div class="container-fluid h-100">
    <div id="chat-messages" class="max-h-80 overflow-auto space-y-2">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`p-3 mt-2 rounded ${
            message.type === "user"
              ? "bg-primary text-white align-self-start"
              : "bg-success text-white align-self-end"
          }`}
        >
          {message.text}
        </div>
      ))}
    </div>

    <div class="d-flex mt-4">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your message..."
        className="d-flex w-100 rounded  bg-secondary border-0 text-white mx-2  px-4 py-2 text-base "
      />
      <button
        onClick={messageChatbot}
        className="ml-2 px-4 py-2 rounded btn btn-outline-primary bg-primary text-white "
      >
        Send
      </button>
    </div>
  </div>
</div>


      {/* <Footer/> */}
    </>
  );
};

export default Chatbot;
