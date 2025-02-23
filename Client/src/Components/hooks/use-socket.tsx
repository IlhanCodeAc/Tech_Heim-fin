import { getUserId } from "../../lib/utils";
import { selectUserData } from "../../store/features/userSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Socket, io } from "socket.io-client";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket>();
  // const { user, loading } = useSelector(selectUserData);
  const user = JSON.parse(localStorage.getItem('user') || "")

  useEffect(() => {

    // if (!loading) return;
    const id = getUserId(user || null);

    const newSocket = io("http://localhost:3000", {
      withCredentials: true,
    });

    newSocket.on("connect", () => {
      newSocket.emit("register", id);
      setSocket(newSocket);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    return () => {
      socket?.disconnect();
    };
  }, []);

  return socket;
};
