"use client";

import { useEffect, useState } from "react";
import { useChat } from "ai/react";
import { useAuth } from "../app/context/AuthContext";
import { useRouter } from "next/navigation";
import { Chat } from "./ui/chat";
import { SimpleAlert } from "./SimpleAlert";

export function ChatDemo(props) {
  const router = useRouter();
  const { user, credits, deductCredit } = useAuth();
  const [currentCredits, setCurrentCredits] = useState(credits);
  const [showAlert, setShowAlert] = useState(false);

  const {
    messages,
    input,
    handleInputChange,
    append,
    stop,
    isLoading,
    setInput,
  } = useChat({
    ...props,
    api: "/api/chat",
    body: {
      userId: user?.uid,
    },
  });

  // Update local credits when auth credits change
  useEffect(() => {
    setCurrentCredits(credits);
  }, [credits]);

  // Custom submit handler to deduct credits
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (currentCredits <= 0) {
      setShowAlert(true);
      return;
    }

    try {
      await deductCredit();
      await append({
        content: input,
        role: "user",
      });
      setInput(""); // Clear input after successful submission
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="text-sm text-muted-foreground">
            Credits remaining: {currentCredits}
          </div>
        </div>
        {showAlert && (
          <SimpleAlert
            title="Insufficient Credits"
            message="You need credits to continue chatting with the AI."
            action="Buy Credits"
            onAction={() => router.push("/protected/credits")}
            onClose={() => setShowAlert(false)}
          />
        )}
        <div className="flex-1 p-5">
          <Chat
            className="grow"
            messages={messages}
            handleSubmit={handleSubmit}
            input={input}
            handleInputChange={handleInputChange}
            isGenerating={isLoading}
            stop={stop}
            append={append}
            suggestions={[
              "Analyze requirements for a user authentication system",
              "Extract requirements from this e-commerce specification",
              "Break down this payment processing feature",
            ]}
          />
        </div>
      </div>
    </>
  );
}
