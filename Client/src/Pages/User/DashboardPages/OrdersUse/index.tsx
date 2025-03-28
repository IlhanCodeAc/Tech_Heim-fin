import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import conversationService from "../../../../services/conversation";
import { useSocket } from "../../../../Components/hooks/use-socket";
import { cn } from "../../../../lib/utils";
import { QUERY_KEYS } from "../../../../constants/query-keys";

interface Message {
  text: string;
  userId: string;
  createdAt: string;
}

interface Conversation {
  _id: string;
  userId: string;
  userName: string;
}

const ChatPage = () => {
  const user = JSON.parse(localStorage.getItem("user")!);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { data: conversationData, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.ADMIN_CONVERSATIONS],
    queryFn: conversationService.getAll,
  });

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = useSocket();

  useEffect(() => {
    if (conversationData?.data?.items.length) {
      setSelectedConversation(conversationData.data.items[0]);
    }
  }, [conversationData]);

  useEffect(() => {
    if (!selectedConversation) return;
    const fetchMessages = async () => {
      const response = await conversationService.getById({ id: selectedConversation._id });
      setMessages(response.data.item.messages || []);
      setTimeout(() => {
        wrapperRef.current?.scrollTo({ top: wrapperRef.current.scrollHeight, behavior: "smooth" });
      }, 100);
    };
    fetchMessages();
  }, [selectedConversation]);

  useEffect(() => {
    if (!socket) return;
    socket.on("message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
      setTimeout(() => {
        wrapperRef.current?.scrollTo({ top: wrapperRef.current.scrollHeight, behavior: "smooth" });
      }, 100);
    });
  }, [socket]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socket || !selectedConversation) return;
    const message = inputRef.current?.value.trim();
    if (!message) return;

    const to = selectedConversation.userId;
    const from = user?._id;
    if (!to || !from) return;

    inputRef.current!.value = "";
    socket.emit("message", { message, to, from });
    setMessages((prev) => [...prev, { text: message, userId: from, createdAt: new Date().toISOString() }]);
    setTimeout(() => {
      wrapperRef.current?.scrollTo({ top: wrapperRef.current.scrollHeight, behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-60px)] bg-blue-50">
      <div className="w-full lg:w-1/4 bg-white p-4 border-b lg:border-r overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
        <h2 className="text-xl font-bold mb-4">Conversations</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          conversationData?.data?.items.map((conv: Conversation) => (
            <div
              key={conv._id}
              className={cn(
                "p-3 rounded cursor-pointer",
                selectedConversation?._id === conv._id ? "bg-blue-200" : "hover:bg-gray-100"
              )}
              onClick={() => setSelectedConversation(conv)}
            >
              {conv.userName}
            </div>
          ))
        )}
      </div>

      <div className="w-full lg:w-3/4 flex flex-col bg-blue-100 h-full">
        <div className="p-4 bg-blue-500 text-white border-b">{selectedConversation?.userName || "Select a chat"}</div>
        <div ref={wrapperRef} className="flex-1 p-4 overflow-y-auto flex flex-col gap-2 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
          {messages.map((message, idx) => (
            <MessageItem key={idx} message={message.text} owner={message.userId === user?._id} />
          ))}
        </div>
        <form onSubmit={handleSubmit} className="p-4 bg-white border-t flex">
          <input ref={inputRef} type="text" className="flex-1 p-2 border rounded mr-2" placeholder="Type a message..." />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
        </form>
      </div>
    </div>
  );
};

const MessageItem = ({ message, owner }: { message: string; owner: boolean }) => {
  return (
    <div className={cn("p-3 rounded-lg max-w-xs", owner ? "bg-blue-500 text-white self-end" : "bg-white text-black self-start")}>
      {message}
    </div>
  );
};

export default ChatPage;
