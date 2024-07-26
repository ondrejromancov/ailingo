"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function generateFlashcards(userPrompt: string, language: string) {
  const { text } = await generateText({
    system: `You are a language teacher. 
    Your goal is to generate a 
    list of words in a given area
    and in ${language} which I will give you.
     
    Please separate each word with a comma.

     YOU MUST GENERATE ONLY UP TO 10 WORDS.`,
    prompt: `The topic of the chat:` + userPrompt,
    model: openai("gpt-4o-mini"),
  });

  return text;
}
