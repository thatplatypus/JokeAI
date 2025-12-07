import { kv } from '@vercel/kv';
import { NextResponse } from "next/server";
import { Joke } from "@/types/joke";

let jokesCache: {
  jokes: Joke[];
  timestamp: number;
} | null = null;

const CACHE_DURATION = 5 * 60 * 1000; 

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = 10;

  if (jokesCache && Date.now() - jokesCache.timestamp < CACHE_DURATION) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const jokes = jokesCache.jokes.slice(start, end);
    const hasMore = end < jokesCache.jokes.length;

    return NextResponse.json({
      jokes,
      nextPage: hasMore ? page + 1 : null,
    });
  }

  try {
    const jokes = await kv.lrange<Joke>('jokes', 0, -1);
    jokesCache = {
      jokes,
      timestamp: Date.now()
    };

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pagedJokes = jokes.slice(start, end);
    const hasMore = end < jokes.length;

    return NextResponse.json({
      jokes: pagedJokes,
      nextPage: hasMore ? page + 1 : null,
    });
  } catch (error) {
    console.error('Error fetching jokes:', error);
    return NextResponse.json({ error: 'Failed to fetch jokes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const joke: Joke = await request.json();
  
  try {
    //ToDo: implement something to replace kv store (local storage instead?)
    //await kv.lpush('jokes', joke);
    jokesCache = null;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving joke:', error);
    return NextResponse.json({ error: 'Failed to save joke' }, { status: 500 });
  }
} 