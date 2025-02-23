import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../../store/features/userSlice";
import conversationService from "../../../../services/conversation";
import { useSocket } from "../../../../Components/hooks/use-socket";
import { RenderIf } from "../../../../Components/RenderIf";
import { cn } from "../../../../lib/utils";
import { QUERY_KEYS } from "../../../../constants/query-keys";
import { log } from "console";

const ChatPage = () => {
  // const { user,loading,error } = useSelector(selectUserData);
  const user = JSON.parse(localStorage.getItem('user')!)
  console.log(user)
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: conversationData, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.ADMIN_CONVERSATIONS],
    queryFn: conversationService.getAll,
  });
  
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
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
    };
    fetchMessages();
  }, [selectedConversation]);

  useEffect(() => {
    console.log(socket)
    if (!socket) return;
    socket.on("message", (message) => {
      // if (message.conversation !== selectedConversation?._id) return;
      setMessages((prev) => [...prev, message]);
    });
  }, [socket]);




  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(socket,selectedConversation)
    if (!socket || !selectedConversation) return;
    const message = inputRef.current?.value.trim();
  
    const to = selectedConversation.userId;
  
    const from = user?._id;
    console.log(to,from)
    if (!message || !to || !from) return;
    inputRef.current!.value = "";
    
    socket.emit("message", { message, to, from });
    setMessages((prev) => [...prev, { text: message, userId: from, createdAt: new Date().toISOString() }]);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-4 border-r overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Conversations</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          conversationData?.data?.items.map((conv) => (
            <div
              key={conv._id}
              className={cn(
                "p-3 rounded cursor-pointer",
                selectedConversation?._id === conv._id ? "bg-indigo-200" : "hover:bg-gray-100"
              )}
              onClick={() => setSelectedConversation(conv)}
            >
              {conv.userName}
            </div>
          ))
        )}
      </div>

      {/* Chat Window */}
      <div className="w-3/4 flex flex-col bg-gray-100 h-full">
        <div className="p-4 bg-white border-b">{selectedConversation?.userName || "Select a chat"}</div>
        <div ref={wrapperRef} className="flex-1 p-4 overflow-y-auto">
          {messages.map((message, idx) => (
            <MessageItem key={idx} message={message.text} owner={message.userId === user?._id} />
          ))}
        </div>
        <form onSubmit={handleSubmit} className="p-4 bg-white border-t flex">
          <input ref={inputRef} type="text" className="flex-1 p-2 border rounded mr-2" />
          <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded">Send</button>
        </form>
      </div>
    </div>
  );
};

const MessageItem = ({ message, owner }) => {
  return (
    <div className={cn("p-3 rounded-lg", owner ? "bg-indigo-100 self-end" : "bg-white self-start")}>
      {message}
    </div>
  );
};

export default ChatPage;
