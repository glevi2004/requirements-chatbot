"use client";

import { useEffect } from "react";
import { useAuth } from "../app/context/AuthContext";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle } from "../components/ui/card";
import Loading from "./loading";

/**
 * Home Component
 *
 * Root page component that handles authentication-based routing.
 * Acts as a router guard to protect routes and manage user session.
 *
 * Behavior:
 * - If user is not authenticated, redirects to signin page
 * - If user is authenticated, redirects to protected dashboard
 * - Shows loading state during authentication check
 */
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

  return <Loading />;
}
