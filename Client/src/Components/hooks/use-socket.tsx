import { getUserId } from "../../lib/utils";
import { selectUserData } from "../../store/features/userSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Socket, io } from "socket.io-client";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket>();
  const { user, loading } = useSelector(selectUserData);

  useEffect(() => {

    if (!loading) return;
    const id = getUserId(user);

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
  }, [loading]);

  useEffect(() => {
    return () => {
      socket?.disconnect();
    };
  }, []);

  return socket;
};
