# AI Joke Generator

A simple demo project built with Next.js that generates jokes using AI. Built to demonstrate Next.js 14 features including:

- Server-side API routes with OpenAI integration
- Server and client components
- Basic routing
- TypeScript support
- Simple in-memory caching

## Features

- Generate AI-powered jokes
- View recently generated jokes
- No database required - uses in-memory LRU cache

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env.local` and add your OpenAI API key:
   ```bash
   OPENAI_API_KEY=your-key-here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- OpenAI API

## License

MIT
