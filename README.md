# AI Joke Generator

<img width="1711" alt="image" src="https://github.com/user-attachments/assets/75e537fb-899c-4579-ab1d-98284e70c091" />

A simple demo project built with Next.js that generates jokes using AI. Built to demonstrate Next.js 14 features including:

- Server-side API routes with OpenAI integration
- Server and client components
- Basic routing
- TypeScript support
- Redis-based KeyVaulue temporary persistence with client caching

## Features

- Generate AI-powered jokes
- View recently generated jokes
- Light/Dark Mode

<img width="1728" alt="image" src="https://github.com/user-attachments/assets/b413ae38-86dc-45f3-94ea-b6b999321895" />

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
