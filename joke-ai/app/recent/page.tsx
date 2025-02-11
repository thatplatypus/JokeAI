import { Sparkles } from "lucide-react";
import { JokeList } from "@/components/joke-list";

export default function RecentPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center space-y-4 mb-12">
        <div className="flex items-center justify-center gap-2 text-3xl font-bold">
          <Sparkles className="h-6 w-6 text-purple-500" />
          <h1>Recent Jokes</h1>
        </div>
        <p className="text-muted-foreground">
          Browse through recently generated jokes
        </p>
      </div>

      <JokeList />
    </div>
  );
} 