"use client";

import { HomeIcon, ClockIcon, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { TipsPopover } from "./tips-popover";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="font-semibold text-lg">🃏 Joke AI</div>
        <nav className="flex items-center gap-2">
          <Button
            variant={pathname === "/" ? "default" : "ghost"}
            size="sm"
            className={cn(
              pathname === "/" && "bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 dark:bg-purple-500/20 dark:text-purple-400"
            )}
            asChild
          >
            <Link href="/">
              <HomeIcon className="h-4 w-4 mr-2" />
              <span className="sm:inline hidden">Generate</span>
            </Link>
          </Button>
          
          <Button
            variant={pathname === "/recent" ? "default" : "ghost"}
            size="sm"
            className={cn(
              pathname === "/recent" && "bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 dark:bg-purple-500/20 dark:text-purple-400"
            )}
            asChild
          >
            <Link href="/recent">
              <ClockIcon className="h-4 w-4 mr-2" />
              <span className="sm:inline hidden">Recent</span>
            </Link>
          </Button>

          <div className="flex items-center gap-2 pl-2 border-l">
            <ThemeToggle />
            <TipsPopover />
            <Button
              variant="ghost"
              size="icon"
              asChild
            >
              <a
                href="https://github.com/thatplatypus/JokeAI"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-500 transition-colors"
              >
                <Github className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">View on GitHub</span>
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
} 