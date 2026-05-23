"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  Settings,
  Sparkles,
  User,
  Shield,
  CreditCard,
  Check,
} from "lucide-react";
import {
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Video,
} from "@/components/icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  const { data: session, update } = useSession();

  const [name, setName] = useState(session?.user?.name || "Premium Creator");
  const [email, setEmail] = useState(session?.user?.email || "creator@socialai.com");
  const [success, setSuccess] = useState(false);

  const userPlan = (session?.user as any)?.plan || "agency";

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-12 text-left max-w-4xl mx-auto">
      {/* Title Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Settings Console
        </h1>
        <p className="text-slate-500 mt-1">
          Adjust account details, manage security protocols, and review active billing levels.
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-3 text-emerald-800 font-semibold animate-bounce text-sm">
          <Check className="w-5 h-5" />
          <span>Profile updates saved successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile details settings form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-slate-100 shadow-xl shadow-slate-900/5 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <User className="w-5 h-5 text-purple-600" />
                <span>Personal Profile Settings</span>
              </CardTitle>
              <CardDescription className="text-xs">Adjust your personal contact credentials.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveProfile}>
              <CardContent className="p-6 pt-0 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="s-name">Full Name</Label>
                  <Input
                    id="s-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-xl border-slate-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="s-email">Email Address</Label>
                  <Input
                    id="s-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-xl border-slate-200"
                  />
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-5 px-6 font-semibold">
                  Save Adjustments
                </Button>
              </CardFooter>
            </form>
          </Card>

          {/* Social Platforms Integration Status */}
          <Card className="border border-slate-100 shadow-xl shadow-slate-900/5 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                <span>Direct Provider Connections</span>
              </CardTitle>
              <CardDescription className="text-xs">Authorized credentials status checks.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-4">
              {[
                { id: "instagram", name: "Instagram Graph API", color: "#E1306C", icon: Instagram, status: "Connected" },
                { id: "linkedin", name: "LinkedIn OAuth 2.0", color: "#0077B5", icon: Linkedin, status: "Connected" },
                { id: "x", name: "X/Twitter v2 PKCE", color: "#14171A", icon: Twitter, status: "Re-Auth Required" },
                { id: "facebook", name: "Facebook Login SDK", color: "#1877F2", icon: Facebook, status: "Disconnected" },
                { id: "tiktok", name: "TikTok Business SDK", color: "#010101", icon: Video, status: "Disconnected" },
              ].map((channel) => {
                const CIcon = channel.icon;
                return (
                  <div key={channel.id} className="flex justify-between items-center bg-slate-50/50 p-3.5 rounded-xl border border-slate-100 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white border flex items-center justify-center shrink-0" style={{ color: channel.color }}>
                        <CIcon className="w-4.5 h-4.5" />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-slate-700">{channel.name}</p>
                        <p className="text-[10px] text-slate-400 font-semibold">Decryption secure AES active</p>
                      </div>
                    </div>

                    <div>
                      {channel.status === "Connected" && (
                        <Badge variant="success" className="font-bold">{channel.status}</Badge>
                      )}
                      {channel.status === "Re-Auth Required" && (
                        <Badge variant="warning" className="font-bold">{channel.status}</Badge>
                      )}
                      {channel.status === "Disconnected" && (
                        <Badge variant="secondary" className="font-bold text-slate-400">{channel.status}</Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Plan subscription info card */}
        <div className="space-y-6">
          <Card className="border border-slate-100 shadow-xl shadow-slate-900/5 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <CardHeader className="p-6">
              <CreditCard className="w-6 h-6 text-purple-400 mb-2" />
              <CardTitle className="text-lg font-bold">Billing Subscription</CardTitle>
              <CardDescription className="text-purple-200">Review active platform features quota.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-6 text-left">
              <div className="flex justify-between items-center">
                <span className="text-xs text-indigo-200 font-medium">Subscription Level</span>
                <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black border-none font-extrabold uppercase tracking-wider text-[10px] py-1 px-2.5 shadow-md">
                  {userPlan} Tier
                </Badge>
              </div>

              <div className="space-y-2 border-t border-white/10 pt-4 text-xs font-semibold text-indigo-100">
                <div className="flex justify-between">
                  <span>Social Accounts Switcher</span>
                  <span className="text-white">Unlimited Clients</span>
                </div>
                <div className="flex justify-between">
                  <span>GPT-4o Caption Generations</span>
                  <span className="text-white">Unlimited Runs</span>
                </div>
                <div className="flex justify-between">
                  <span>Background BullMQ Jobs</span>
                  <span className="text-white">Continuous Sync</span>
                </div>
              </div>

              <Button className="w-full bg-white hover:bg-slate-100 text-slate-900 rounded-xl font-bold py-5 mt-2">
                Upgrade / Manage Billing
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
