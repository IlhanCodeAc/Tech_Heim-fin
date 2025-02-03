import { DefaultEventsMap, Socket } from "socket.io";
import Message from "../mongoose/schemas/message";
import User from "../mongoose/schemas/user";
import Conversation from "../mongoose/schemas/conversation";

const socketUsers: Record<string, string> = {};
export function socketHandlers(
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) {
  socket.on("register", (userId: string) => onRegister(userId, socket));

  socket.on("message", (data: { message: string; to: string; from: string }) =>
    onMessage(data, socket)
  );

  socket.on("disconnect", () => onDisconnect(socket));
}

function onRegister(userId: string, socket: Socket) {
  socketUsers[userId] = socket.id;
  console.log("a user connected", userId, socket.id);
  console.log("socketUsers", socketUsers);
}

async function onMessage(
  { message, to, from }: { message: string; to: string; from: string },
  socket: Socket
) {
  try {
    const socketId = socketUsers[to];
    console.log("socketUsers", socketUsers);
    console.log("to", to);

    const conversation = await Conversation.findOne({
      $or: [{ userId: from }, { userId: to }],
    });

    if (!conversation) return;

    const messageItem = await Message.create({
      text: message,
      userId: from,
      userName: conversation.userName,
      conversation: conversation._id,
    });

    conversation.messages.push(messageItem._id);
    await conversation.save();

    console.log("messageItem", messageItem);
    console.log("socketId", socketId);

    if (socketId) {
      socket.to(socketId).emit("message", messageItem);
    }
  } catch (e) {
    console.log(e);
  }
}

function onDisconnect(socket: Socket) {
  console.log("a user disconnected", socket.id);
  Object.entries(socketUsers).forEach((item) => {
    if (item[1] === socket.id) {
      delete socketUsers[item[0]];
    }
  });
}
