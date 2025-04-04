import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { auth, db } from "@/firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const systemPrompt = `You are a Requirements Analysis Assistant specializing in extracting structured information from software requirements.

When analyzing requirements, create a structured table with the following columns, and add more fields if necessary:

Follow these guidelines:
- Type: Functional, Non-Functional, Technical, Business
- Priority: High, Medium, Low
- Category: UI/UX, Security, Performance, Data, Infrastructure, etc.
- Dependencies: List related requirements or systems
- Acceptance Criteria: Clear, measurable conditions

Example format:
| ID | Requirement | Type | Priority | Category | Dependencies | Acceptance Criteria |
|---|-------------|------|----------|-----------|--------------|-------------------|
| R1 | Users must be able to login with email | Functional | High | Security | Authentication Service | - Valid email format<br>- Password meets security policy |
`;

async function checkAndDeductCredits(userId) {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error("User not found");
  }

  const credits = userSnap.data().credits;

  if (credits <= 0) {
    throw new Error("No credits remaining");
  }

  // Deduct 1 credit
  await updateDoc(userRef, {
    credits: credits - 1,
    updatedAt: new Date().toISOString(),
  });

  return true;
}

export async function POST(req) {
  try {
    const { messages, userId } = await req.json();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Check and deduct credits before processing
    await checkAndDeductCredits(userId);

    const result = streamText({
      model: openai("gpt-4-turbo"),
      system: systemPrompt,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to process request",
        type: error.message.includes("credits") ? "CREDITS" : "OTHER",
      }),
      {
        status: error.message.includes("credits") ? 403 : 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
