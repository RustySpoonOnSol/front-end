import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const userMsg = { sender: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    const res = await axios.post("https://crush-ai-chatbotv3.onrender.com/chat", { message: input });
    const aiMsg = { sender: "ai", text: res.data.reply };
    setMessages((msgs) => [...msgs, aiMsg]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>💋 Crush AI</h2>
      <div style={{ border: "1px solid #ccc", height: "300px", overflowY: "scroll" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === "ai" ? "left" : "right" }}>
            <p><strong>{msg.sender}:</strong> {msg.text}</p>
          </div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
