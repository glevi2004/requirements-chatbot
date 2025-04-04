"use client";

import { useEffect } from "react";
import { useAuth } from "../app/context/AuthContext";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle } from "../components/ui/card";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/signin");
    } else {
      router.push("/protected");
    }
  }, []);

  if (!user) return null;

  return (
    <div className="w-screen flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Requirements Analysis Bot
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
