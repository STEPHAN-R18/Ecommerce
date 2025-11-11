import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);

  // ✅ Function used by ChatWidget
  const addMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

// ✅ Custom hook to use chat context easily
export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
