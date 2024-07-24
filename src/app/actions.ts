"use server";

import { generateText, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { Language, Message } from "@/lib/types";
import { createStreamableValue } from "ai/rsc";

export async function generateSentence(
  topic: string,
  selectedLanguage: Language
) {
  const { text, finishReason, usage } = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: "Generate a sentence about " + topic + " in " + selectedLanguage,
  });

  return { text, finishReason, usage };
}

export async function continueChat(history: Message[]) {
  "use server";

  const stream = createStreamableValue();

  (async () => {
    const { textStream } = await streamText({
      model: openai("gpt-4o-mini"),
      system:
        "You are a dude that doesn't drop character until the DVD commentary.",
      messages: history,
    });

    for await (const text of textStream) {
      stream.update(text);
    }

    stream.done();
  })();

  return {
    messages: history,
    newMessage: stream.value,
  };
}
