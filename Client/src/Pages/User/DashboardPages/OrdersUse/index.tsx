import React, { useState } from "react";
import { Input } from "../../../../Components/components/ui/input";
import { Button } from "../../../../Components/components/ui/button";

interface User {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
}

interface Message {
  id: number;
  sender: "user" | "me";
  content: string;
}

const users: User[] = [
  { id: 1, name: "John Doe", avatar: "/avatar1.jpg", lastMessage: "Hey there!" },
  { id: 2, name: "Jane Smith", avatar: "/avatar2.jpg", lastMessage: "Let's meet up." },
  { id: 3, name: "Alice Brown", avatar: "/avatar3.jpg", lastMessage: "Got it, thanks!" },
];

const ChatPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setMessages([
      { id: 1, sender: "user", content: user.lastMessage },
      { id: 2, sender: "me", content: "Hello!" },
    ]);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: messages.length + 1, sender: "me", content: input }]);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Users List */}
      <div className="w-1/4 bg-white p-4 border-r overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Chats</h2>
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className={`flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-gray-200 ${
                selectedUser?.id === user.id ? "bg-gray-300" : ""
              }`}
              onClick={() => handleUserSelect(user)}
            >
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500 truncate w-40">{user.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-3/4 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-white border-b flex items-center gap-3">
              <img src={selectedUser.avatar} alt={selectedUser.name} className="w-10 h-10 rounded-full" />
              <p className="font-medium text-lg">{selectedUser.name}</p>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.sender === "me" ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-black self-start" 
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-white flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
                placeholder="Type a message..."
              />
              <Button onClick={sendMessage} className="bg-blue-500 text-white">
                Send
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
