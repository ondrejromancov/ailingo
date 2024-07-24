"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Chat } from "@/components/app/Chat";
import { Flashcards } from "@/components/app/Flashcards";
import { Sentences } from "@/components/app/Sentences";
import { Language } from "@/lib/types";
// import { Quiz } from "@/components/app/Quiz";

const App = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("spanish");

  const handleLanguageChange = (value: Language) => {
    setSelectedLanguage(value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">
            AILingo - language learning with AI
          </h1>
          <Select
            onValueChange={handleLanguageChange}
            defaultValue={selectedLanguage}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
              <SelectItem value="italian">Italian</SelectItem>
              <SelectItem value="japanese">Japanese</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="chat" className="w-full">
          <TabsList>
            <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="sentences">Sentences</TabsTrigger>
            {/* <TabsTrigger value="quiz">Quiz</TabsTrigger> */}
          </TabsList>

          <TabsContent value="chat">
            <Chat selectedLanguage={selectedLanguage} />
          </TabsContent>

          <TabsContent value="flashcards">
            <Flashcards selectedLanguage={selectedLanguage} />
          </TabsContent>

          <TabsContent value="sentences">
            <Sentences selectedLanguage={selectedLanguage} />
          </TabsContent>

          {/* <TabsContent value="quiz">
            <Quiz />
          </TabsContent> */}
        </Tabs>
      </div>
    </main>
  );
};

export default App;
