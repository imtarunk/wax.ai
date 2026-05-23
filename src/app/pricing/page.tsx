"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Sparkles,
  Check,
  Zap,
  ArrowLeft,
  Calendar,
  Lock,
  Activity,
  Users,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const pricingTiers = [
  {
    id: "creator",
    name: "Creator Plan",
    price: "₹999",
    billing: "per month",
    description: "Perfect for single content creators scaling individual presence.",
    features: [
      "1 Social Media Profile per platform",
      "AI Caption Generator (GPT-4o)",
      "Standard monthly Content Calendar",
      "AES-256 Token Encryption",
      "Standard Analytics Dashboard",
    ],
    buttonText: "Get Started Now",
    badge: "Solo Profile",
  },
  {
    id: "team",
    name: "Team Plan",
    price: "₹2,999",
    billing: "per month",
    description: "Great for boutique teams, growth managers, and active startups.",
    features: [
      "3 Social Media Profiles per platform",
      "AI Caption & Hashtags Generator",
      "Drag-and-Drop Content Calendar",
      "Auto-DM replies (3 rules max)",
      "Team Roles (Owner, Editor, Viewer)",
      "AES-256 Token Encryption",
    ],
    buttonText: "Upgrade to Team",
    badge: "Growing Brands",
  },
  {
    id: "agency",
    name: "Agency Plan",
    price: "₹9,999",
    billing: "per month",
    description: "Complete platform package with client switches and roles management.",
    features: [
      "Unlimited Profiles (Multi-Account Support)",
      "Multi-Account client switcher sidebar header",
      "Unlimited AI Caption & Reel Ideas",
      "Unlimited Auto-DM reply rules",
      "BullMQ continuous OAuth Token auto-refresh",
      "Granular Roles Management (Owner/Editor/Viewer)",
      "AES-256 secure encryption & health alerts",
    ],
    buttonText: "Upgrade to Agency",
    badge: "Unlimited Scales",
  },
];

export default function PricingPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const activePlan = (session?.user as any)?.plan || "none";

  const handleSelectPlan = async (planId: string) => {
    if (!session) {
      router.push("/login?callbackUrl=/pricing");
      return;
    }

    try {
      const res = await fetch("/api/auth/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });

      if (res.ok) {
        // Refresh session to update active plans
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-950 via-slate-900 to-black text-white py-16 px-4 md:px-8 relative overflow-hidden text-left">
      {/* Decorative background vectors */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Back Link */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>

        {/* Welcome titles */}
        <div className="text-center space-y-4">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 items-center justify-center text-white shadow-xl glow-purple mb-2 animate-bounce">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Choose Your SocialAI Plan
          </h1>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Scale content automation, secure encrypted OAuth streams, and delegate granular roles.
          </p>
        </div>

        {/* 3 cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pricingTiers.map((tier) => {
            const isActive = activePlan === tier.id;
            return (
              <Card
                key={tier.id}
                className={`border bg-slate-900/50 backdrop-blur-xl transition-all duration-300 rounded-2xl flex flex-col justify-between overflow-hidden ${
                  isActive
                    ? "border-purple-500 shadow-2xl shadow-purple-950/20 scale-105"
                    : "border-slate-800 hover:border-slate-700 hover:shadow-xl hover:shadow-purple-950/5"
                }`}
              >
                <div className="p-8 space-y-6">
                  {/* Badge & Title */}
                  <div className="flex justify-between items-center">
                    <h3 className="font-extrabold text-white text-xl">{tier.name}</h3>
                    <Badge variant={isActive ? "default" : "secondary"} className={isActive ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-400"}>
                      {tier.badge}
                    </Badge>
                  </div>

                  {/* Pricing details */}
                  <div className="space-y-1">
                    <p className="text-4xl font-extrabold text-white">{tier.price}</p>
                    <p className="text-xs text-slate-500 font-semibold">{tier.billing}</p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    {tier.description}
                  </p>

                  <hr className="border-slate-800" />

                  {/* Pricing features */}
                  <ul className="space-y-3.5 text-xs text-slate-300 font-medium">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4.5 h-4.5 text-purple-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <CardFooter className="p-8 bg-slate-950/40 border-t border-slate-800">
                  <Button
                    onClick={() => handleSelectPlan(tier.id)}
                    className={`w-full py-6 font-bold rounded-xl ${
                      isActive
                        ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg glow-purple"
                        : "bg-slate-800 hover:bg-slate-700 text-white"
                    }`}
                  >
                    {isActive ? "Your Active Plan" : tier.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
