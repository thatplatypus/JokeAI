import { kv } from '@vercel/kv';
import { NextResponse } from "next/server";

// This is a mock implementation - replace with your actual database logic
const mockJokes = Array.from({ length: 50 }, (_, i) => ({
  id: `joke-${i}`,
  content: `This is joke number ${i + 1}`,
  type: ["dad", "pun", "knock-knock", "general"][Math.floor(Math.random() * 4)],
  audience: ["child", "teen", "adult"][Math.floor(Math.random() * 3)],
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
}));

// Simple in-memory cache
let jokesCache: {
  jokes: any[];
  timestamp: number;
} | null = null;

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = 10;

  // Check cache first
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

  // If not in cache or cache expired, fetch from KV
  try {
    const jokes = await kv.lrange('jokes', 0, -1); // Get all jokes
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

// In your generate route, add:
export async function POST(request: Request) {
  const joke = await request.json();
  
  try {
    await kv.lpush('jokes', joke);
    // Invalidate cache when new joke is added
    jokesCache = null;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving joke:', error);
    return NextResponse.json({ error: 'Failed to save joke' }, { status: 500 });
  }
} 