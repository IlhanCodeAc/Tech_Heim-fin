import { DefaultEventsMap, Socket } from "socket.io";
import Message from "../mongoose/schemas/message";
import Conversation from "../mongoose/schemas/conversation";

const socketUsers: Record<string, string> = {};

export function socketHandlers(
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) {
  socket.on("register", (userId: string) => onRegister(userId, socket));
  socket.on("message", async (data) => await onMessage(data, socket));
  socket.on("disconnect", () => onDisconnect(socket));
}

function onRegister(userId: string, socket: Socket) {
  socketUsers[userId] = socket.id;
  console.log("User registered:", userId, "Socket ID:", socket.id);
  console.log("Connected Users:", socketUsers);
}

async function onMessage(
  { message, to, from, userName }: { message: string; to: string; from: string; userName: string },
  socket: Socket
) {
  try {
    const receiverSocketId = socketUsers[to];
    console.log("Sending message from:", from, "to:", to, "Socket ID:", receiverSocketId);

    let conversation = await Conversation.findOne({
      $or: [
        { userId: from, receiverId: to },
        { userId: to, receiverId: from },
      ],
    }).populate("messages");

    if (!conversation) {
      conversation = await Conversation.create({
        userId: from,
        receiverId: to,
        userName: userName,
        userEmail: "placeholder@email.com",
        messages: [],
      });
    }

    const messageItem = await Message.create({
      text: message,
      userId: from,
      userName: userName,
      conversation: conversation._id,
    });

    conversation.messages.push(messageItem._id);
    await conversation.save();

    console.log("Saved Message:", messageItem);

    socket.emit("message", messageItem); // Send to sender
    if (receiverSocketId) {
      socket.to(receiverSocketId).emit("message", messageItem); // Send to receiver
    } else {
      console.log(`User ${to} is offline. Message stored.`);
    }
  } catch (e) {
    console.error("Error in onMessage:", e);
  }
}

function onDisconnect(socket: Socket) {
  console.log("User disconnected:", socket.id);

  Object.entries(socketUsers).forEach(([userId, socketId]) => {
    if (socketId === socket.id) {
      delete socketUsers[userId];
    }
  });

  console.log("Updated Users:", socketUsers);
}
