import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Button } from "../../../../Components/components/ui/button";
import { Input } from "../../../../Components/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../../../../Components/components/ui/dialog";

const socket: Socket = io("http://localhost:5173");

interface Message {
  _id?: string;
  text: string;
  userId: string;
  conversation: string;
}

const UserChatDialog: React.FC<{ userId: string; conversationId: string }> = ({ userId, conversationId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.emit("register", userId);

    socket.on("message", (newMessage: Message) => {
      if (newMessage.conversation === conversationId) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    return () => {
      socket.off("message");
    };
  }, [conversationId, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = { text: message, userId, conversation: conversationId };
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    
    socket.emit("message", { message, to: "adminId", from: userId }); // Change "adminId" dynamically if needed
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white">Contact Admin</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>Chat with Admin</DialogHeader>
        <div className="flex flex-col h-80 overflow-y-auto p-2 bg-white border rounded-md">
          {messages.map((msg, idx) => (
            <div
              key={msg._id || idx}
              className={`p-2 my-1 rounded-md ${msg.userId === userId ? "text-right bg-blue-100" : "text-left bg-gray-200"}`}
            >
              <p className="inline-block p-2 rounded-md">{msg.text}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex items-center gap-2 border-t p-2 bg-white">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
            placeholder="Type a message..."
          />
          <Button onClick={sendMessage} className="bg-blue-500 text-white">Send</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserChatDialog;
