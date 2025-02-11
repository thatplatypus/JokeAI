"use client";

import { HomeIcon, ClockIcon, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { TipsPopover } from "./tips-popover";

export function Header() {
  const pathname = usePathname();
  
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="font-semibold text-lg">AI Joke Generator</div>
        <nav className="flex items-center gap-2">
          <Button
            variant={pathname === "/" ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link href="/">
              <HomeIcon className="h-4 w-4 mr-2" />
              Generate
            </Link>
          </Button>
          <Button
            variant={pathname === "/recent" ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link href="/recent">
              <ClockIcon className="h-4 w-4 mr-2" />
              Recent
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