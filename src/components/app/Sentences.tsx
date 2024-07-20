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
import { Textarea } from "../ui/textarea";
import { Language } from "@/lib/types";

export const Sentences = (params: { selectedLanguage: Language }) => {
  const [sentencesTopic, setSentencesTopic] = useState<string>("");
  const [generatedSentence, setGeneratedSentence] = useState<string>("");
  const [userTranslation, setUserTranslation] = useState<string>("");
  const [translationFeedback, setTranslationFeedback] = useState<string>("");

  const handleGenerateSentence = async () => {
    setGeneratedSentence(
      `Generated sentence about ${sentencesTopic} in ${params.selectedLanguage}`
    );
    setUserTranslation("");
    setTranslationFeedback("");
  };

  const handleCheckTranslation = async () => {
    setTranslationFeedback(
      `AI feedback on the translation from ${params.selectedLanguage} to English`
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentences Practice</CardTitle>
        <CardDescription>
          Generate sentences and practice translation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          type="text"
          placeholder="Enter a topic for sentence generation"
          value={sentencesTopic}
          onChange={(e) => setSentencesTopic(e.target.value)}
          className="mb-2"
        />
        <Button onClick={handleGenerateSentence} className="mb-4">
          Generate Sentence
        </Button>
        {generatedSentence && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="font-bold mb-2">Generated Sentence:</h3>
              <Textarea
                value={generatedSentence}
                readOnly
                className="mb-2 pointer-events-none"
              />
            </div>
            <div>
              <h3 className="font-bold mb-2">Your Translation:</h3>
              <Textarea
                value={userTranslation}
                onChange={(e) => setUserTranslation(e.target.value)}
                placeholder="Enter your translation here"
                className="mb-2"
              />
            </div>
          </div>
        )}
        {generatedSentence && (
          <Button onClick={handleCheckTranslation} className="mt-2">
            Check Translation
          </Button>
        )}
        {translationFeedback && (
          <div className="mt-4">
            <h3 className="font-bold mb-2">AI Feedback:</h3>
            <p>{translationFeedback}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
