This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Requirements Analysis Chatbot

An AI-powered requirements analysis tool that helps software developers and project managers break down and analyze software requirements using natural language processing.

🔗 [Live Demo](https://requirements-chatbot.vercel.app)

## Overview

Requirements Analysis Chatbot is a web application that leverages OpenAI's GPT-4 to help users analyze, structure, and improve software requirements. The tool provides intelligent suggestions, requirement breakdowns, and structured analysis in real-time.

### Features

- 🤖 AI-powered requirements analysis
- 🔐 Google Authentication
- 💳 Credit-based usage system
- 🌓 Dark/Light mode support
- 🔄 Real-time streaming responses
- 📱 Responsive design

## Tech Stack

- **Frontend:**

  - Next.js 14 (App Router)
  - React
  - Tailwind CSS
  - Shadcn UI Components

- **Backend:**

  - Vercel AI SDK
  - OpenAI GPT-4
  - Firebase Authentication
  - Firestore Database

- **Deployment:**
  - Vercel Platform
  - Firebase Cloud Services

## Setup Instructions

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/requirements-chatbot.git
cd requirements-chatbot
```

2. **Install dependencies:**

```bash
npm install
```

3. **Environment Setup:**
   Create a `.env.local` file in the root directory with:

```plaintext
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. **Run the development server:**

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Usage

1. Sign in using Google Authentication
2. Use initial credits to start analyzing requirements
3. Input your requirements text
4. Receive structured analysis and suggestions

## Deployment

The application is deployed on Vercel: [requirements-chatbot.vercel.app](https://requirements-chatbot.vercel.app)

To deploy your own instance:

1. Fork this repository
2. Connect to Vercel
3. Configure environment variables
4. Deploy
