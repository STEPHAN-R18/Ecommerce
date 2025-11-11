import { useState } from "react";
import { useChat } from "../context/ChatContext.jsx";
import { MessageCircle, X } from "lucide-react";
import "../styles/chatWidget.css";
export default function ChatWidget() {
  const { messages, addMessage } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  // 🧠 Simple rule-based chatbot logic
  const getBotResponse = (userMsg) => {
    const msg = userMsg.toLowerCase();

    if (msg.includes("hello") || msg.includes("hi"))
      return "Hey there 👋! How can I help you today?";
    if (msg.includes("order"))
      return "You can check your orders in your Profile > My Orders section.";
    if (msg.includes("payment"))
      return "We support UPI, Credit/Debit Card, and Cash on Delivery 💳.";
    if (msg.includes("return"))
      return "You can request a return from your order details page within 7 days.";
    if (msg.includes("contact"))
      return "You can contact us via email at support@ecommerce.com 📧.";
    return "I'm not sure about that 🤔, but I’ll learn more soon!";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    addMessage({ sender: "user", text: input });
    const botReply = getBotResponse(input);
    setTimeout(() => {
      addMessage({ sender: "bot", text: botReply });
    }, 500);

    setInput("");
  };

  return (
    <div className="chatbot-container">
      {isOpen ? (
        <div className="chatbox">
          <div className="chatbox-header">
            <h4>💬 Chatbot</h4>
            <button onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="chatbox-body">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`msg ${msg.sender === "user" ? "user" : "bot"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form className="chatbox-input" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      ) : (
        <button className="chat-toggle" onClick={() => setIsOpen(true)}>
          <MessageCircle size={28} />
        </button>
      )}
    </div>
  );
}
