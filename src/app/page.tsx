"use client";

import React, { useState } from "react";
import Link from "next/link";
import MinimalHero from "@/components/ui/flux-card-hero";
import {
  Sparkles,
  Zap,
  Shield,
  Calendar,
  MessageSquare,
  BarChart3,
  Lightbulb,
  Users,
  Lock,
  Mail,
  Check,
  Send,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function LandingPage() {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail || !contactMessage) return;
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between scroll-smooth">
      {/* 1. ANIMATED MINIMAL HERO COMPONENT */}
      <MinimalHero />

      {/* 2. SUBPAGE FEATURES SECTION */}
      <section id="features" className="py-24 max-w-6xl w-full mx-auto px-6 space-y-16 text-left relative z-10">
        <div className="text-center space-y-3">
          <Badge className="bg-purple-900/60 text-purple-300 border-purple-800/30 font-bold uppercase tracking-wider py-1 px-3">
            Core Utilities
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-none">
            Platform Capabilities & Subpages
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Everything you need to automate schedules, generate value-rich captions, and monitor performance across networks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Unified Content Calendar",
              desc: "Color-coded schedules matching specific platform networks. Drag, plan, and preview posts instantly on a beautiful monthly grid page.",
              icon: Calendar,
              link: "/calendar",
            },
            {
              title: "AI Caption Composer",
              desc: "Draft post details and ask GPT-4o to compose scroll-stopping hooks, high-traffic hashtags, and customized tone copies.",
              icon: Sparkles,
              link: "/posts/new",
            },
            {
              title: "Auto-DM Reply Assistant",
              desc: "Establish catchphrase rules to respond instantaneously to customer inquiries. Simulate rule activations and review real-time chats.",
              icon: MessageSquare,
              link: "/dms",
            },
            {
              title: "Reel Video Script Generator",
              desc: "Select your brand niche and produce 10 detailed video ideas, viral hook tags, and full voiceover scripts sequentially.",
              icon: Lightbulb,
              link: "/ideas",
            },
            {
              title: "Analytics Growth Dashboard",
              desc: "Monitor audience progression trends over 30 days, trace channel engagement rate bars, and analyze peak hours heatmaps.",
              icon: BarChart3,
              link: "/analytics",
            },
            {
              title: "Workspaces Settings Console",
              desc: "Configure direct OAuth credentials, manage security tokens health, and select subscription tier limits.",
              icon: Users,
              link: "/settings",
            },
          ].map((feat, i) => {
            const Icon = feat.icon;
            return (
              <Card key={i} className="border-slate-800 bg-slate-900/40 backdrop-blur-xl hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-300 rounded-2xl flex flex-col justify-between overflow-hidden">
                <CardHeader className="p-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center text-purple-400 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-white text-base font-bold">{feat.title}</CardTitle>
                  <CardDescription className="text-slate-400 text-xs mt-2 leading-relaxed font-medium">
                    {feat.desc}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="p-6 pt-0 border-t border-slate-800/40 bg-slate-950/20">
                  <Link href={feat.link} className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
                    <span>Explore Console Subpage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 3. SECURED BENEFITS SECTION */}
      <section id="benefits" className="py-24 bg-slate-900/20 border-t border-b border-slate-900 relative z-10">
        <div className="max-w-6xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
          <div className="space-y-6">
            <Badge className="bg-blue-900/60 text-blue-300 border-blue-800/30 font-bold uppercase tracking-wider py-1 px-3">
              Reliability & Security
            </Badge>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-none">
              AES-256 Secure Keys & Silent Auto Refreshes
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              We understand the critical importance of platform connections health. SocialAI is engineered with modern, enterprise-level token security and silent background auto-renew networks.
            </p>

            <div className="space-y-4">
              {[
                { title: "AES-256-GCM Encryption Standards", desc: "Access and refresh tokens are encrypted at rest with hardware cipher modules.", icon: Lock },
                { title: "BullMQ Token Renewal Workers", desc: "Expiring tokens are refreshed silently in background crons before connection failures occur.", icon: Zap },
                { title: "Granular Collaborator Scopes", desc: "Invite members to specific accounts and assign Owner, Editor, or Viewer access permissions.", icon: Shield },
              ].map((benefit, i) => {
                const BIcon = benefit.icon;
                return (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
                    <div className="w-9 h-9 rounded-lg bg-slate-850 flex items-center justify-center shrink-0 text-purple-400 border border-slate-800">
                      <BIcon className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{benefit.title}</h4>
                      <p className="text-slate-400 text-xs leading-relaxed mt-0.5 font-medium">{benefit.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative h-80 rounded-2xl border border-slate-800 bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-950 p-6 flex flex-col justify-between overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-rose-500 text-white flex items-center justify-center font-bold shadow">
                  IG
                </div>
                <div>
                  <p className="font-bold text-slate-200">Instagram API</p>
                  <p className="text-[10px] text-slate-500 font-medium">Silent Cron Refresh</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="success" className="animate-pulse gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-500" />
                  <span>Renewed</span>
                </Badge>
                <p className="text-[9px] text-slate-400 font-bold mt-1">Today, 5:00 PM</p>
              </div>
            </div>

            <div className="space-y-2 text-xs font-semibold text-slate-400">
              <p className="text-white text-sm font-bold">API Security & Token Health Monitor</p>
              <div className="flex justify-between">
                <span>Active BullMQ Worker Node</span>
                <span className="text-emerald-500">Operational</span>
              </div>
              <div className="flex justify-between">
                <span>Expiring Keys Countdown</span>
                <span className="text-slate-200">Renewed silently (48h trigger)</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-900/30 text-purple-300 text-[11px] font-semibold leading-relaxed">
              🔑 System verified: Encrypted refresh token keys updated cleanly. Decryption key pool segregated at hardware layer.
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRICING SECTION */}
      <section id="pricing" className="py-24 max-w-6xl w-full mx-auto px-6 space-y-16 text-left relative z-10">
        <div className="text-center space-y-3">
          <Badge className="bg-amber-900/60 text-amber-300 border-amber-800/30 font-bold uppercase tracking-wider py-1 px-3">
            Simple Pricing
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-none">
            Flexible Automated Subscriptions
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Choose your automated scale plan. Instant, secure mock profiles setups allow rapid console tests out-of-the-box!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: "Creator Plan",
              price: "₹999",
              desc: "Perfect for single content creators scaling individual presence.",
              features: [
                "1 Connected Profile per platform",
                "GPT-4o Caption & Hashtags Generator",
                "Standard Monthly Content Calendar",
                "AES-256 Token Encryption standards",
              ],
              buttonText: "Join Creator Plan",
            },
            {
              name: "Team Plan",
              price: "₹2,999",
              desc: "Great for boutique teams, growth managers, and active startups.",
              features: [
                "3 Connected Profiles per platform",
                "AI Captions, Tags, & Reels ideas",
                "Drag-and-Drop Content Calendar planner",
                "Auto-DM replies rules (3 rules max)",
                "Team Roles (Owner, Editor, Viewer)",
              ],
              buttonText: "Join Team Plan",
              popular: true,
            },
            {
              name: "Agency Plan",
              price: "₹9,999",
              desc: "Complete platform package with client switches and roles management.",
              features: [
                "Unlimited Profiles (Multi-Account Support)",
                "Multi-Account client switcher sidebar header",
                "Unlimited AI Captions & Reel Scripts",
                "Unlimited Auto-DM reply rules logs",
                "BullMQ continuous OAuth Token auto-refresh",
                "Granular Roles Management (Owner/Editor/Viewer)",
              ],
              buttonText: "Join Agency Plan",
            },
          ].map((tier, i) => (
            <Card
              key={i}
              className={`border bg-slate-900/50 backdrop-blur-xl rounded-2xl flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                tier.popular
                  ? "border-purple-500 shadow-2xl shadow-purple-950/20 scale-105"
                  : "border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold text-white text-lg">{tier.name}</h3>
                  {tier.popular && (
                    <Badge className="bg-purple-600 text-white font-bold uppercase tracking-wider text-[9px] py-0.5 px-2">
                      Popular
                    </Badge>
                  )}
                </div>

                <div className="space-y-1">
                  <p className="text-3xl font-extrabold text-white">{tier.price}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">per month</p>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed font-medium">
                  {tier.desc}
                </p>

                <hr className="border-slate-850" />

                <ul className="space-y-3 text-xs text-slate-300 font-semibold">
                  {tier.features.map((feat, fi) => (
                    <li key={fi} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <CardFooter className="p-8 bg-slate-950/40 border-t border-slate-850">
                <Button asChild className={`w-full py-5 font-bold rounded-xl ${
                  tier.popular ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg glow-purple" : "bg-slate-800 hover:bg-slate-750 text-white border border-slate-750"
                }`}>
                  <Link href="/register">
                    {tier.buttonText}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. CONTACT SECTION */}
      <section id="contact" className="py-24 bg-slate-900/10 border-t border-slate-900 relative z-10 text-left">
        <div className="max-w-6xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <Badge className="bg-teal-900/60 text-teal-300 border-teal-800/30 font-bold uppercase tracking-wider py-1 px-3">
              Reach Out
            </Badge>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-none">
              Get in Touch with our Growth Engineers
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Have questions about platform capabilities, API integrations, OAuth limits, or specific custom deployments? Send us a quick note!
            </p>

            <div className="space-y-4 text-xs font-semibold text-slate-300 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-purple-400 border border-slate-800">
                  <Mail className="w-4 h-4" />
                </div>
                <span>support@socialai.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-purple-400 border border-slate-800">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-purple-400 border border-slate-800">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Indiranagar Tech Hub, Bengaluru, India</span>
              </div>
            </div>
          </div>

          <Card className="border-slate-850 bg-slate-900/60 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="p-6">
              <CardTitle className="text-white text-base font-bold">Submit Query</CardTitle>
              <CardDescription className="text-slate-400 text-xs">Our team typically responds in under 2 hours.</CardDescription>
            </CardHeader>
            <form onSubmit={handleContactSubmit}>
              <CardContent className="p-6 pt-0 space-y-4">
                {contactSuccess && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Message dispatched successfully! We'll reply shortly.</span>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="cont-name" className="text-slate-300">Name</Label>
                  <Input
                    id="cont-name"
                    placeholder="John Doe"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cont-email" className="text-slate-300">Email Address</Label>
                  <Input
                    id="cont-email"
                    type="email"
                    placeholder="name@company.com"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cont-msg" className="text-slate-300">Query Details</Label>
                  <Textarea
                    id="cont-msg"
                    placeholder="Describe your requirements or questions..."
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 rounded-xl h-24"
                  />
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl py-5 font-semibold gap-2">
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </section>

      {/* 6. PLATFORM FOOTER */}
      <footer className="max-w-6xl w-full mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-semibold pt-12 pb-12 relative z-10 border-t border-slate-900 mt-12 px-6 gap-4">
        <span>© 2026 SocialAI platform by Mysh.ai. All rights reserved. Built with Next.js 16 & Drizzle ORM.</span>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}
