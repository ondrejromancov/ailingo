"use client";
import { useState } from "react";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Input } from "../ui/input";
import { Language } from "@/lib/types";

interface Message {
  type: "user" | "assistant";
  content: string;
}

export const Chat = (params: {selectedLanguage: Language}) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState("");

  const handleSendMessage = () => {
    if (chatInput.trim() !== "") {
      setChatMessages([...chatMessages, { type: "user", content: chatInput }]);
      // In a real app, you would call your backend API here to get the AI response
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          { type: "assistant", content: `AI response to: ${chatInput}` },
        ]);
      }, 1000);
      setChatInput("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat with AI Language Assistant</CardTitle>
        <CardDescription>
          Practice conversation and ask questions in {params.selectedLanguage}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              } mb-2`}
            >
              <div
                className={`rounded-lg p-2 max-w-[70%] ${
                  message.type === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="flex mt-4">
          <Input
            type="text"
            placeholder="Type your message..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            className="flex-grow mr-2"
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </CardContent>
    </Card>
  );
};
