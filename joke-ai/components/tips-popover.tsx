import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

export function TipsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:text-purple-500 transition-colors"
        >
          <HelpCircle className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Joke Writing Tips</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h3 className="font-semibold">Tips for better jokes</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Choose your audience carefully</li>
            <li>• Different joke types work better for different situations</li>
            <li>• Keep it clean for child-friendly jokes</li>
            <li>• Try different combinations for variety</li>
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
} 