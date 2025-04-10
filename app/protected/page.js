import { ChatDemo } from "../../components/chat-demo";
/**
 * Protected Chat Interface
 *
 * Implements thes AI-powered requirements analysis chat interface using:
 * - Vercel AI SDK (@vercel/ai) for stream handling and API integration
 * - Shadcn UI components for the chat interface (@shadcn/ui)
 * - Next.js App Router for page routing and server components
 *
 * Technologies:
 * - Vercel AI SDK: Handles AI streaming responses and API integration
 * - Shadcn UI Chat: Provides chat interface components and styling
 * - OpenAI API: Powers the AI responses for requirements analysis
 * - Firebase: Stores user credits
 *
 * */

export default function Home() {
  return <ChatDemo className="w-full h-screen" />;
}
