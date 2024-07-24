"use client";
import { useState } from "react";

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

export const Flashcards = (params: { selectedLanguage: Language }) => {
  const [flashcardsTopic, setFlashcardsTopic] = useState<string>("");
  const [flashcardsResult, setFlashcardsResult] = useState("");

  const handleGenerateFlashcards = async () => {
    setFlashcardsResult(`Generated flashcards...`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vocabulary Flashcards</CardTitle>
        <CardDescription>
          Generate flashcards for vocabulary practice
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          type="text"
          placeholder="Enter a topic for flashcards"
          value={flashcardsTopic}
          onChange={(e) => setFlashcardsTopic(e.target.value)}
          className="mb-2"
        />
        <Button onClick={handleGenerateFlashcards}>Generate Flashcards</Button>
        {flashcardsResult && (
          <div className="mt-4">
            <h3 className="font-bold mb-2">Generated Flashcards:</h3>
            <p>{flashcardsResult}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
