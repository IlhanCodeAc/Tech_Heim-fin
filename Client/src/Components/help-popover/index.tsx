import { useEffect, useRef, useState } from "react";
import { RenderIf } from "../RenderIf";
import { User2Icon } from "lucide-react";
import { Spinner } from "../Spinner";
import { useQuery } from "@tanstack/react-query";
import { CreateConversation } from "./CreateConversation";
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
  const socket = useSocket();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const {
    data: conversationData,
    isLoading: conversationLoading,
    status,
  } = useQuery({
    queryKey: ["userConversation"],
    queryFn: () => conversationService.getByUserId({ userId } as any),
    enabled: !!userId,
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
      to: "67af9837b1b8fe6d459c9f68",
      from: userId,
    });
    setMessages((prev) => [...prev, { text: message, userId, createdAt: new Date().toISOString() }]);
  };

  return (
    <div id="help-popover" className="fixed bottom-4 right-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center text-sm font-medium border rounded-full w-16 h-16 bg-black hover:bg-gray-700"
      >
        <User2Icon size={30} color="white" />
      </button>
      <RenderIf condition={isOpen}>
        <div className="fixed bottom-[calc(4rem+1.5rem)] right-4 bg-white shadow-lg p-4 rounded-lg border w-[360px] h-[500px] flex flex-col">
          <div className="flex flex-col space-y-1.5 pb-4 border-b">
            <h2 className="font-semibold text-lg">TechHeim Help Chat</h2>
            <p className="text-sm text-gray-500">Powered by PF401</p>
          </div>
          <div ref={wrapperRef} className="flex-1 overflow-y-auto p-2 space-y-2 bg-gray-100 rounded-md">
            {messages.map((message, index) => (
              <MessageItem key={index} owner={message.userId === userId ? "You" : "Admin"} message={message.text} />
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex items-center gap-2 p-2 border-t">
            <input
              ref={inputRef}
              className="flex-1 h-10 rounded-lg border px-3 text-sm"
              placeholder="Type your message..."
            />
            <button type="submit" className="h-10 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Send
            </button>
          </form>
        </div>
      </RenderIf>
    </div>
  );
};

const MessageItem = ({ message, owner }: { message: string; owner: "You" | "Admin" }) => (
  <div className={`flex ${owner === "You" ? "justify-end" : "justify-start"}`}>
    <div
      className={`max-w-[75%] p-2 rounded-lg text-sm ${
        owner === "You" ? "bg-green-500 text-white self-end" : "bg-white border"
      }`}
    >
      <span className="font-bold block mb-1">{owner}</span>
      {message}
    </div>
  </div>
);
