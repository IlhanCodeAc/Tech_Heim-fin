import { Conversation } from "@/types";

export type GetConversationType = {
  item: Conversation;
  message: string;
};

export type GetAllConversationsType = {
  items: Conversation[];
  message: string;
};
