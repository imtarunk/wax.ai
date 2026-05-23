"use client";

import {
  TrendingUp,
  BarChart3,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Eye,
  Heart,
  MessageCircle,
} from "lucide-react";
import {
  Instagram,
  Linkedin,
  Twitter,
} from "@/components/icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Simulated follower growth over 30 days
const mockGrowthStats = [
  { day: "Day 1", followers: 10200 },
  { day: "Day 5", followers: 10800 },
  { day: "Day 10", followers: 11500 },
  { day: "Day 15", followers: 12100 },
  { day: "Day 20", followers: 12900 },
  { day: "Day 25", followers: 13600 },
  { day: "Day 30", followers: 14820 },
];

// Simulated engagement by platform
const mockPlatformEngagement = [
  { platform: "Instagram", rate: 5.8, color: "bg-pink-500", rawVal: "5.8%" },
  { platform: "LinkedIn", rate: 4.2, color: "bg-blue-600", rawVal: "4.2%" },
  { platform: "X (Twitter)", rate: 3.6, color: "bg-slate-900", rawVal: "3.6%" },
  { platform: "TikTok", rate: 6.4, color: "bg-teal-500", rawVal: "6.4%" },
];

// Top performing posts
const mockTopPosts = [
  { id: "1", title: "Scale Automation SaaS Strategy", platform: "linkedin", reach: 45200, likes: 1204, comments: 242, color: "text-blue-600 bg-blue-50 border-blue-100" },
  { id: "2", title: "10 Viral Reel Scripts Routine", platform: "instagram", reach: 38900, likes: 2390, comments: 402, color: "text-pink-600 bg-pink-50 border-pink-100" },
  { id: "3", title: "Deploying Local Redis Containers", platform: "x", reach: 24800, likes: 980, comments: 110, color: "text-slate-900 bg-slate-50 border-slate-200" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 pb-12 text-left">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Growth & Analytics
          </h1>
          <p className="text-slate-500 mt-1">
            Map digital growth statistics, monitor cross-channel engagement, and leverage custom AI recommendations.
          </p>
        </div>
      </div>

      {/* AI Insight banner card */}
      <Card className="border border-purple-100 shadow-xl shadow-purple-900/5 bg-gradient-to-r from-purple-50 via-indigo-50/30 to-white rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
          <div className="flex items-start md:items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-lg shrink-0 animate-pulse">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-purple-900 text-base">Interactive AI Marketing Insight</h3>
              <p className="text-sm text-purple-700/80 mt-0.5 leading-relaxed font-semibold">
                &quot;Post more Reels on Tuesdays between 6–8 PM. Engagement spike metrics on Instagram show +24% click rates at this specific hour.&quot;
              </p>
            </div>
          </div>
          <Badge className="bg-purple-600 hover:bg-purple-700 text-white shrink-0 scale-95 uppercase tracking-wider py-1 px-2.5">
            Optimal Recommendation
          </Badge>
        </CardContent>
      </Card>

      {/* Graphs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Followers Growth Card (Line chart simulation) */}
        <Card className="border border-slate-100 shadow-xl shadow-slate-900/5 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span>Audience Growth (30 days)</span>
            </CardTitle>
            <CardDescription className="text-xs">Follower progression maps across connected networks.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-2 text-left">
            <div className="h-56 flex items-end justify-between border-b border-slate-100 pb-4 relative">
              {mockGrowthStats.map((item, i) => {
                const maxVal = 16000;
                const pct = (item.followers / maxVal) * 100;
                return (
                  <div key={i} className="flex flex-col items-center group cursor-pointer">
                    <span className="text-[10px] font-extrabold text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity mb-1.5 bg-purple-50 px-1 rounded">
                      {item.followers.toLocaleString()}
                    </span>
                    <div
                      className="w-8 rounded-t-lg bg-gradient-to-t from-purple-600 to-purple-400 group-hover:from-purple-700 group-hover:to-purple-500 transition-all duration-300"
                      style={{ height: `${pct * 1.5}px` }}
                    />
                    <span className="text-[9px] font-bold text-slate-400 mt-2">{item.day}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between items-center text-xs pt-4 font-semibold text-slate-500">
              <span>Start: 10,200 followers</span>
              <span className="text-purple-600 font-extrabold flex items-center gap-0.5">
                <ArrowUpRight className="w-4 h-4" />
                <span>+45.2% total growth rate</span>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Rate Card (Bar chart simulation) */}
        <Card className="border border-slate-100 shadow-xl shadow-slate-900/5 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <span>Cross-Channel Engagement Rates</span>
            </CardTitle>
            <CardDescription className="text-xs">Interaction benchmarks mapped per active network channel.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-2 text-left space-y-4">
            {mockPlatformEngagement.map((item, i) => (
              <div key={i} className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-slate-600">{item.platform}</span>
                  <span className="text-slate-800 font-extrabold">{item.rawVal}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden">
                  <div
                    className={`${item.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${(item.rate / 8) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="text-[10px] text-slate-400 font-medium pt-2 border-t border-slate-50 leading-relaxed">
              * Rates map comments, likes, and reach indicators divided by audience scale pools. Typical healthy benchmarks scale between 2.0% - 4.5%.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Heatmap & Top performing grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Heatmap calendar schedule */}
        <Card className="lg:col-span-2 border border-slate-100 shadow-xl shadow-slate-900/5 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <span>Best Posting Hours Heatmap</span>
            </CardTitle>
            <CardDescription className="text-xs">Identifies peak subscriber activity rates throughout calendar weeks.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="grid grid-cols-8 gap-1.5 text-center text-[10px] font-bold text-slate-400">
              <span />
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <span key={d}>{d}</span>
              ))}

              {["9 AM", "12 PM", "3 PM", "6 PM", "9 PM"].map((t) => (
                <>
                  <span key={t} className="text-left py-1 text-slate-400 font-semibold">{t}</span>
                  {Array.from({ length: 7 }).map((_, i) => {
                    // Highlight Tuesday 6pm and Wed 12pm
                    const isHot = (t === "6 PM" && i === 1) || (t === "12 PM" && i === 2);
                    const isWarm = (t === "12 PM" && i === 1) || (t === "6 PM" && i === 2) || (t === "3 PM" && i === 3);

                    return (
                      <div
                        key={i}
                        className={`rounded-lg py-2 transition-transform hover:scale-110 cursor-pointer ${
                          isHot
                            ? "bg-purple-600 text-white font-extrabold shadow"
                            : isWarm
                            ? "bg-purple-200 text-purple-800"
                            : "bg-slate-50 text-slate-400"
                        }`}
                      >
                        {isHot ? "🔥" : ""}
                      </div>
                    );
                  })}
                </>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing posts */}
        <Card className="border border-slate-100 shadow-xl shadow-slate-900/5 rounded-2xl flex flex-col justify-between">
          <CardHeader className="border-b border-slate-50 p-6">
            <CardTitle className="text-base font-bold">Top Performing Campaigns</CardTitle>
            <CardDescription className="text-xs">Highest total reach execution records</CardDescription>
          </CardHeader>
          <CardContent className="p-6 divide-y divide-slate-100 text-left">
            {mockTopPosts.map((post) => (
              <div key={post.id} className="py-3.5 first:pt-0 last:pb-0 space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 truncate max-w-[160px]">{post.title}</span>
                  <Badge variant="outline" className="text-[9px] uppercase tracking-wider py-0 px-1.5 bg-white scale-90">
                    {post.platform}
                  </Badge>
                </div>
                <div className="flex gap-4 font-semibold text-slate-500 text-[10px]">
                  <span className="flex items-center gap-0.5 text-slate-400">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{(post.reach / 1000).toFixed(1)}k Reach</span>
                  </span>
                  <span className="flex items-center gap-0.5 text-slate-400">
                    <Heart className="w-3.5 h-3.5" />
                    <span>{post.likes} Likes</span>
                  </span>
                  <span className="flex items-center gap-0.5 text-slate-400">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{post.comments} Chats</span>
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
