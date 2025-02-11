"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Smile, Coffee, Mic2, Sparkles, Baby, User, UserPlus2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { JokeTypeCard } from "./joke-type-card";
import { AudienceCard } from "./audience-card";
import { cn } from "@/lib/utils";

type JokeType = "dad" | "pun" | "knock-knock" | "general";
type AudienceType = "child" | "teen" | "adult";

const jokeTypes = [
  { value: "dad", label: "Dad Joke", icon: Coffee },
  { value: "pun", label: "Pun", icon: Smile },
  { value: "knock-knock", label: "Knock Knock", icon: Mic2 },
  { value: "general", label: "General", icon: Sparkles },
] as const;

const audienceTypes = [
  { value: "child", label: "Child-friendly", icon: Baby },
  { value: "teen", label: "Teenagers", icon: User },
  { value: "adult", label: "Adults", icon: UserPlus2 },
] as const;


export function JokeGenerator() {
  const [step, setStep] = useState(1);
  const [jokeType, setJokeType] = useState<JokeType | null>(null);
  const [audience, setAudience] = useState<AudienceType | null>(null);
  const [instructions, setInstructions] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [joke, setJoke] = useState<string | null>(null);
  
  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: jokeType,
          audience,
          instructions: instructions.trim() || undefined,
        }),
      });
      
      if (!response.ok) throw new Error("Failed to generate joke");
      
      const data = await response.json();
      setJoke(data.joke);
    } catch (error) {
      console.error("Failed to generate joke:", error);
      // We'll add proper error handling later
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Loading border animation */}
      {isLoading && (
        <>
          <div className="absolute inset-0 rounded-lg overflow-hidden">
            <div 
              className={cn(
                "absolute inset-[-50%] animate-[spin_3s_linear_infinite]",
                "bg-[conic-gradient(from_0deg,transparent,rgba(168,85,247,0.4)_25%,transparent_50%)]"
              )} 
            />
          </div>
          <div className="absolute inset-0 rounded-lg overflow-hidden blur-[20px]">
            <div 
              className={cn(
                "absolute inset-[-50%] animate-[spin_3s_linear_infinite]",
                "bg-[conic-gradient(from_0deg,transparent,rgba(168,85,247,0.2)_25%,transparent_50%)]"
              )} 
            />
          </div>
        </>
      )}
      
      {/* Main card */}
      <Card className={cn(
        "p-6 relative transition-all duration-500",
        "bg-background",
        isLoading && "opacity-[0.85]"
      )}>
        <div className={cn(
          "space-y-8 transition-opacity duration-300",
          isLoading && "opacity-50"
        )}>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: step === 1 ? 1 : 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold">What type of joke would you like?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {jokeTypes.map((type) => (
                <JokeTypeCard
                  key={type.value}
                  icon={type.icon}
                  label={type.label}
                  value={type.value}
                  selected={jokeType === type.value}
                  onClick={() => {
                    setJokeType(type.value as JokeType);
                    setStep(2);
                  }}
                />
              ))}
            </div>
          </motion.div>

          <AnimatePresence>
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold">Who&apos;s the audience?</h2>
                <div className="grid grid-cols-3 gap-4">
                  {audienceTypes.map((type) => (
                    <AudienceCard
                      key={type.value}
                      icon={type.icon}
                      label={type.label}
                      value={type.value}
                      selected={audience === type.value}
                      onClick={() => {
                        setAudience(type.value as AudienceType);
                        setStep(3);
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold">Any specific instructions?</h2>
                <Textarea
                  placeholder="Optional: Add specific topics, themes, or other instructions..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="h-24"
                />
                <Button 
                  className={cn(
                    "w-full relative overflow-hidden",
                    "bg-gradient-to-r from-purple-500 to-indigo-600",
                    "hover:from-purple-600 hover:to-indigo-700",
                    "text-white shadow-lg",
                    "transition-all duration-200",
                    "hover:shadow-purple-500/25 hover:shadow-xl",
                    "active:scale-[0.98]",
                    isLoading && "animate-pulse"
                  )}
                  size="lg"
                  onClick={handleGenerate}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span className="animate-pulse">Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Joke
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {joke && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <div className="rounded-lg bg-muted p-4">
                  <p className="whitespace-pre-wrap">{joke}</p>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-950/30"
                  onClick={() => {
                    setJoke(null);
                    setStep(1);
                    setJokeType(null);
                    setAudience(null);
                    setInstructions("");
                  }}
                >
                  Generate Another
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
} 