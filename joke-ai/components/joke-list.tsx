"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface Joke {
  id: string;
  content: string;
  type: string;
  audience: string;
  createdAt: string;
}

async function fetchJokes({ pageParam = 1 }) {
  const res = await fetch(`/api/jokes?page=${pageParam}`);
  return res.json();
}

export function JokeList() {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['jokes'],
    queryFn: fetchJokes,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === "loading") {
    return <div className="flex justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>;
  }

  return (
    <div className="space-y-4">
      {data?.pages.map((page, i) => (
        <div key={i} className="space-y-4">
          {page.jokes.map((joke: Joke, index: number) => (
            <motion.div
              key={joke.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 space-y-4">
                <p className="whitespace-pre-wrap">{joke.content}</p>
                <div className="flex gap-2 text-sm text-muted-foreground">
                  <span className="capitalize">{joke.type}</span>
                  <span>•</span>
                  <span className="capitalize">{joke.audience}</span>
                  <span>•</span>
                  <time>{new Date(joke.createdAt).toLocaleDateString()}</time>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ))}
      
      <div ref={ref} className="h-10 flex justify-center">
        {isFetchingNextPage && <Loader2 className="h-6 w-6 animate-spin" />}
      </div>
    </div>
  );
} 