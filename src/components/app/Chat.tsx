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
import { Language, Message } from "@/lib/types";
import { continueChat } from "@/app/actions";
import { readStreamableValue } from "ai/rsc";

export const Chat = (params: { selectedLanguage: Language }) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState("");

  const handleSendMessage = async () => {
    if (chatInput.trim() !== "") {
      const { messages, newMessage } = await continueChat([
        ...chatMessages,
        { role: "user", content: chatInput },
      ]);
      setChatMessages([...chatMessages, { role: "user", content: chatInput }]);

      let textContent = "";
      for await (const delta of readStreamableValue(newMessage)) {
        textContent = `${textContent}${delta}`;

        setChatMessages([
          ...messages,
          { role: "assistant", content: textContent },
        ]);
      }
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
                message.role === "user" ? "justify-end" : "justify-start"
              } mb-2`}
            >
              <div
                className={`rounded-lg p-2 max-w-[70%] ${
                  message.role === "user"
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
