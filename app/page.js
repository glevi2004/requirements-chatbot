"use client";

import { useEffect } from "react";
import { useAuth } from "../app/context/AuthContext";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle } from "../components/ui/card";
import Loading from "./loading";

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
