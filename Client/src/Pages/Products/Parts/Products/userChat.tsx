import React, { useRef } from "react";
import { Button } from "../../../../Components/components/ui/button";
import { Input } from "../../../../Components/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../../../../Components/components/ui/dialog";

const UserChatDialog: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white">Contact Admin</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>Chat with Admin</DialogHeader>
        <div className="flex flex-col h-80 overflow-y-auto p-2 bg-white border rounded-md">
          <div className="p-2 my-1 rounded-md text-right bg-blue-100">
            <p className="inline-block p-2 rounded-md">User message</p>
          </div>
          <div className="p-2 my-1 rounded-md text-left bg-gray-200">
            <p className="inline-block p-2 rounded-md">Admin response</p>
          </div>
          <div ref={messagesEndRef} />
        </div>
        <div className="flex items-center gap-2 border-t p-2 bg-white">
          <Input className="flex-1" placeholder="Type a message..." />
          <Button className="bg-blue-500 text-white">Send</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserChatDialog;
