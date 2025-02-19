import { useEffect, useRef, useState } from "react";
import { RenderIf } from "../RenderIf";
import { User2Icon } from "lucide-react";
import { Spinner } from "../Spinner";
import { useQuery } from "@tanstack/react-query";
import { CreateConversation } from "./CreateConversation";
import { useSocket } from "../hooks/use-socket";
import conversationService from "../../services/conversation";
import authService from "../../services/auth";

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
    queryKey: ["USER_CONVERSATION"],
    queryFn: () => conversationService.getByUserId({ userId }),
    enabled: !!userId,
  });

  const [messages, setMessages] = useState<
    { text: string; userId: string; createdAt: string }[]
  >([]);

  const isLoading = conversationLoading;

  useEffect(() => {
    function handleOutsideClick() {
      setIsOpen(false);
    }
    window.addEventListener("click", handleOutsideClick);

    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, [socket]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : authService.getCurrentUser();
    if (user && user._id) { // Ensure we're using _id as the userId
      setUserId(user._id);
    }
  }, []);

  useEffect(() => {
    if (status === "success" && conversationData) {
      setMessages(conversationData.data?.item?.messages ?? []);
    }
  }, [status]);

  useEffect(() => {
    if (wrapperRef.current && isOpen) {
      wrapperRef.current.scrollTo({
        top: wrapperRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!socket || !userId) return;
    e.preventDefault();
    const message = inputRef.current?.value.trim();
    if (!message) return;
    inputRef.current!.value = "";
    socket.emit("message", {
      message,
      to: "67399e3e515fc0ef8074b52e", // Assuming this is the target user/admin ID
      from: userId,
    });
    setMessages((prev) => [
      ...prev,
      { text: message, userId, createdAt: new Date().toISOString() },
    ]);
  };
console.log(userId)
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium border rounded-full w-16 h-16 bg-black hover:bg-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
        </svg>
      </button>
      <RenderIf condition={isOpen}>
        <div className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border w-[440px] h-[634px]">
          <div className="flex flex-col space-y-1.5 pb-6">
            <h2 className="font-semibold text-lg tracking-tight">Morent Help Chat</h2>
            <p className="text-sm text-[#6b7280]">Powered by PF401</p>
          </div>
          <RenderIf condition={isLoading}>
            <div className="flex justify-center items-center h-full w-full -translate-y-16">
              <Spinner />
            </div>
          </RenderIf>
          <RenderIf condition={!isLoading}>
            <RenderIf condition={!conversationData}>
              <CreateConversation />
            </RenderIf>
            <RenderIf condition={!!conversationData}>
              <div ref={wrapperRef} className="pr-4 h-[474px] overflow-y-auto">
                {messages.map((message) => (
                  <MessageItem
                    owner={message.userId === userId ? "You" : "Admin"}
                    message={message.text}
                  />
                ))}
              </div>
              <div className="flex items-center pt-0">
                <form onSubmit={handleSubmit} className="flex w-full space-x-2">
                  <input
                    ref={inputRef}
                    className="h-10 w-full rounded-md border px-3 py-2 text-sm"
                    placeholder="Type your message"
                  />
                  <button className="h-10 px-4 py-2 bg-black text-white rounded-md">
                    Send
                  </button>
                </form>
              </div>
            </RenderIf>
          </RenderIf>
        </div>
      </RenderIf>
    </div>
  );
};

const MessageItem = ({ message, owner }: { message: string; owner: "You" | "Admin" }) => (
  <div className="flex gap-3 my-4 text-gray-600 text-sm">
    <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
      <div className="rounded-full bg-gray-100 border p-1">
        {owner === "You" ? <User2Icon /> : <svg fill="black" height="20" width="20"><path d="M9.813 15.904L9 18.75..."/></svg>}
      </div>
    </span>
    <p className="leading-relaxed">
      <span className="font-bold text-gray-700">{owner}</span>
      {message}
    </p>
  </div>
);
