import { useState } from "react";

export default function AIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { sender: "user", text: input }]);

    const res = await fetch("http://localhost:5000/api/ai/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    setMessages(prev => [...prev, { sender: "ai", text: data.reply }]);
    setInput("");
  };

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">Chat with AI</h1>

      <div className="h-[70vh] overflow-y-auto bg-gray-900 p-4 rounded-xl">
        {messages.map((msg, i) => (
          <p key={i} className={msg.sender === "user" ? "text-right text-blue-400" : "text-left text-green-400"}>
            {msg.text}
          </p>
        ))}
      </div>

      <div className="flex mt-4">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 p-2 rounded bg-gray-800"
        />
        <button onClick={sendMessage} className="ml-2 bg-blue-600 px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
