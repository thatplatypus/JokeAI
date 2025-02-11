export type JokeType = "dad" | "pun" | "knock-knock" | "general";
export type AudienceType = "child" | "teen" | "adult";

export interface Joke {
  id: string;
  content: string;
  type: JokeType;
  audience: AudienceType;
  createdAt: string;
} 