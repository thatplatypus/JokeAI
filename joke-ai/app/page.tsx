import { JokeGenerator } from "@/components/joke-generator";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center space-y-4 mb-12">
        <div className="flex items-center justify-center gap-2 text-4xl md:text-5xl font-bold">
          <Sparkles className="h-8 w-8 md:h-10 md:w-10 text-purple-500" />
          <h1>AI Joke Generator</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Generate unique, AI-powered jokes tailored to your preferences. 
          From dad jokes to puns, we&apos;ve got your humor covered.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <JokeGenerator />
      </div>
    </div>
  );
}
