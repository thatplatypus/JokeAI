import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudienceCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  selected: boolean;
  onClick: () => void;
}

export function AudienceCard({
  icon: Icon,
  label,
  selected,
  onClick,
}: AudienceCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-200",
        "hover:bg-purple-100 hover:scale-105 dark:hover:bg-purple-950/30",
        "border-2 border-transparent",
        selected && "border-purple-500 bg-purple-50 dark:bg-purple-950/50"
      )}
    >
      <Icon 
        className={cn(
          "w-8 h-8 transition-colors",
          selected ? "text-purple-500" : "text-muted-foreground"
        )} 
      />
      <span className={cn(
        "text-sm font-medium",
        selected ? "text-purple-500" : "text-muted-foreground"
      )}>
        {label}
      </span>
    </button>
  );
} 