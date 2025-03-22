import { useEffect, useRef, useState } from "react";
import { RenderIf } from "../RenderIf";
import { MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSocket } from "../hooks/use-socket";
import conversationService from "../../services/conversation";
import authService from "../../services/auth";

interface Message {
  text: string;
  userId: string;
  createdAt: string;
}

export const HelpPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const socket = useSocket();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data: conversationData, isLoading: conversationLoading, refetch, status } = useQuery({
    queryKey: ["userConversation", userId],
    queryFn: async () => {
      if (!userId) return null;
      try {
        return await conversationService.getByUserId({ userId });
      } catch (error: any) {
        if (error.response?.status === 404) {
          const user = JSON.parse(localStorage.getItem("user") || "{}");
          if (!user._id) throw new Error("User not found in localStorage");
          const newConversation = await conversationService.create({
            userId: user._id,
            userName: user.name,
            userEmail: user.email,
          });
          return newConversation;
        }
        throw error;
      }
    },
    enabled: !!userId,
    retry: false,
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const isLoading = conversationLoading;

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!(event.target as HTMLElement).closest("#help-popover")) {
        setIsOpen(false);
      }
    }
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => {
      socket.off("message");
    };
  }, [socket]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : authService.getCurrentUser();
    if (user && user._id) {
      setUserId(user._id);
      setIsAdmin(user.role === "admin");
    }
  }, []);

  useEffect(() => {
    if (status === "success" && conversationData) {
      setMessages(conversationData.data?.item?.messages ?? []);
    }
  }, [status, conversationData]);

  useEffect(() => {
    if (wrapperRef.current && isOpen) {
      wrapperRef.current.scrollTo({
        top: wrapperRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isOpen]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!socket || !userId) return;
    const message = inputRef.current?.value.trim();
    if (!message) return;
    inputRef.current!.value = "";
    socket.emit("message", {
      message,
      to: "67ddf1df0907a8b0b08f8e9c",
      from: userId,
    });
    setMessages((prev) => [...prev, { text: message, userId, createdAt: new Date().toISOString() }]);
  };

  return (
    <div id="help-popover" className="fixed bottom-4 right-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center text-sm font-medium border rounded-full w-16 h-16 bg-gray-700 hover:bg-gray-800"
      >
        <MessageCircle size={30} color="#fff" />
      </button>
      <RenderIf condition={isOpen}>
        <div className="fixed bottom-[calc(4rem+1.5rem)] right-4 bg-white shadow-lg p-4 rounded-lg border w-[360px] h-[500px] flex flex-col">
          <h2 className="font-semibold text-lg text-blue-600">TechHeim Help Chat</h2>
          <p className="text-sm text-gray-500">Powered by PF401</p>
          <div ref={wrapperRef} className="flex-1 overflow-auto p-2 space-y-2 bg-gray-50 rounded-md">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.userId === userId ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[70%] ${msg.userId === userId ? "bg-blue-500 text-white" : "bg-gray-100 text-black self-start border border-gray-300"}`}
                  style={{
                    borderRadius: "20px",
                    padding: "10px 15px",
                    backgroundColor: msg.userId === userId ? "#007bff" : "#f1f1f1", // blue for user and light gray for admin
                    marginBottom: "10px",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          {isAdmin ? (
            <div className="p-2 text-center text-gray-500">Admins can't type here</div>
          ) : (
            <form onSubmit={handleSubmit} className="flex p-2 border-t bg-white">
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded-md">Send</button>
            </form>
          )}
        </div>
      </RenderIf>
    </div>
  );
};
