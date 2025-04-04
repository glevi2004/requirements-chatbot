"use client";

import { useState } from "react";
import { useAuth } from "../../../app/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Sparkles, Zap, Rocket, RefreshCw } from "lucide-react";
import { db } from "../../../firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const CREDIT_PLANS = [
  {
    name: "Starter Pack",
    credits: 100,
    price: "FREE",
    icon: Sparkles,
    features: ["Some credits"],
  },
  {
    name: "Pro Pack",
    credits: 1000,
    price: "FREE",
    icon: Zap,
    features: ["A lot of credits"],
  },
  {
    name: "Enterprise Pack",
    credits: 10000,
    price: "FREE",
    icon: Rocket,
    features: ["A ton of credits"],
  },
];

export default function CreditsPage() {
  const [loading, setLoading] = useState(null);
  const { addCredits, user, credits, resetCredits } = useAuth();

  const handlePurchase = async (credits, planName) => {
    setLoading(planName);
    try {
      // Record purchase in Firestore
      await addDoc(collection(db, "purchases"), {
        userId: user.uid,
        planName,
        credits,
        timestamp: new Date().toISOString(),
      });

      // Add credits to user
      await addCredits(credits);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Credit Packages</h1>
          <p className="text-muted-foreground">
            Current Balance: {credits} Credits
          </p>
        </div>
        <Button
          variant="outline"
          onClick={resetCredits}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Reset Credits
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {CREDIT_PLANS.map((plan) => {
          const Icon = plan.icon;
          return (
            <Card
              key={plan.name}
              className="relative overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  <CardTitle>{plan.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">
                  {plan.price}
                </div>
                <div className="text-xl mb-4">
                  {plan.credits.toLocaleString()} Credits
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => handlePurchase(plan.credits, plan.name)}
                  disabled={!!loading}
                >
                  {loading === plan.name ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Get Credits"
                  )}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
