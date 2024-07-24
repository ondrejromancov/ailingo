export type Language = "spanish" | "french" | "german" | "italian" | "japanese";

export interface Message {
  role: "user" | "assistant";
  content: string;
}
