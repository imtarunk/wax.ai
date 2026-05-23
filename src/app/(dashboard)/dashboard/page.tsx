"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Calendar,
  Sparkles,
  MessageSquare,
  BarChart3,
  Users,
  ChevronRight,
  TrendingUp,
  Plus,
  Send,
  Zap,
  Lightbulb,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const { data: session } = useSession();
  
  // Custom states for scheduled counts
  const [scheduledCount, setScheduledCount] = useState(3);
  const [dmRulesCount, setDmRulesCount] = useState(5);
  const [captionCount, setCaptionCount] = useState(12);

  return (
    <div className="space-y-8 pb-12">
      {/* Dynamic Welcome Heading */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 flex items-center gap-2">
            <span>Welcome back, {session?.user?.name || "Premium Creator"}</span>
            <Sparkles className="w-6 h-6 text-purple-600 animate-pulse" />
          </h1>
          <p className="text-slate-500 mt-1">
            Your social presence is compounding smoothly across all channels today.
          </p>
        </div>

        <div className="flex gap-3">
          <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-md font-semibold px-5">
            <Link href="/posts/new">
              <Plus className="w-4 h-4 mr-2" />
              <span>Schedule Post</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl px-5">
            <Link href="/ideas">
              <Lightbulb className="w-4 h-4 mr-2" />
              <span>Get Reel Ideas</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Statistics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Posts Scheduled", val: scheduledCount, desc: "Active queue", icon: Calendar, color: "text-purple-600 bg-purple-50 border-purple-100" },
          { title: "DMs Auto-Replied", val: 47, desc: "Saves 3.5 hrs / wk", icon: MessageSquare, color: "text-rose-600 bg-rose-50 border-rose-100" },
          { title: "Captions Generated", val: captionCount, desc: "✨ Powered by GPT-4o", icon: Sparkles, color: "text-amber-600 bg-amber-50 border-amber-100" },
          { title: "Engagement Rate", val: "4.82%", desc: "+1.2% this week", icon: BarChart3, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="border border-slate-100 shadow-md shadow-slate-900/5 hover:shadow-lg transition-all rounded-2xl">
              <CardContent className="p-6 flex items-center justify-between text-left">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.title}</p>
                  <p className="text-3xl font-extrabold text-slate-800 tracking-tight">{stat.val}</p>
                  <p className="text-xs text-slate-500 font-medium">{stat.desc}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Middle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Feed */}
        <Card className="lg:col-span-2 border border-slate-100 shadow-xl shadow-slate-900/5 rounded-2xl flex flex-col justify-between">
          <CardHeader className="border-b border-slate-50 p-6 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-slate-800">Recent Content Automation Activity</CardTitle>
              <CardDescription className="text-slate-400">Live operational sync status logs</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-slate-100 text-slate-600">Sync Active</Badge>
          </CardHeader>
          <CardContent className="p-6 divide-y divide-slate-100 text-left">
            {[
              { type: "post", text: "New LinkedIn post automated successfully", time: "10 mins ago", detail: "Active Campaign", label: "linkedin" },
              { type: "dm", text: "Auto-replied DM request on Instagram", time: "42 mins ago", detail: "Matched keyword 'promo'", label: "instagram" },
              { type: "caption", text: "AI generated caption with professional hooks", time: "2 hours ago", detail: "For FitLife Reel campaign", label: "caption" },
              { type: "account", text: "Silent BullMQ background OAuth renewal succeeded", time: "5 hours ago", detail: "X (Twitter) refreshed", label: "system" },
            ].map((activity, i) => (
              <div key={i} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <p className="font-semibold text-slate-700">{activity.text}</p>
                  <p className="text-slate-400 font-medium">{activity.detail}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 font-semibold">{activity.time}</span>
                  <Badge className="block mt-1 text-[9px] uppercase tracking-wider py-0 px-1 text-center scale-90">
                    {activity.label}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Launch Panel */}
        <Card className="border border-slate-100 shadow-xl shadow-slate-900/5 rounded-2xl flex flex-col justify-between">
          <CardHeader className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-t-2xl p-6">
            <Zap className="w-6 h-6 text-purple-200 mb-2 animate-bounce" />
            <CardTitle className="text-lg font-bold">Quick Automated Actions</CardTitle>
            <CardDescription className="text-purple-100">Deploy resources rapidly using AI hooks</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {[
              { label: "✨ Auto Generate Post Caption", path: "/posts/new" },
              { label: "💡 Request 10 Reels Scripts", path: "/ideas" },
              { label: "💬 Configure Auto DM Key Rules", path: "/dms" },
              { label: "📊 Map Follower Engagement Stats", path: "/analytics" },
            ].map((btn, i) => (
              <Button
                key={i}
                asChild
                variant="outline"
                className="w-full justify-between hover:bg-purple-50 hover:text-purple-600 text-slate-600 border-slate-200 font-medium py-6 px-4 rounded-xl text-xs transition-all duration-200"
              >
                <Link href={btn.path}>
                  <span>{btn.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
