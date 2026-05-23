"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Upload,
  Calendar,
  Clock,
  Check,
  Zap,
  ArrowRight,
  Sparkle,
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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const availablePlatforms = [
  { id: "instagram", label: "Instagram", color: "#E1306C", icon: Instagram },
  { id: "linkedin", label: "LinkedIn", color: "#0077B5", icon: Linkedin },
  { id: "x", label: "X (Twitter)", color: "#14171A", icon: Twitter },
  { id: "facebook", label: "Facebook", color: "#1877F2", icon: Facebook },
  { id: "tiktok", label: "TikTok", color: "#010101", icon: Video },
];

export default function NewPostPage() {
  const router = useRouter();

  // Multi select platforms chips
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["instagram"]);
  const [contentPrompt, setContentPrompt] = useState("");
  const [tone, setTone] = useState("professional");

  // Output generated fields
  const [hook, setHook] = useState("");
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState("");
  
  // Date time scheduling
  const [scheduleDate, setScheduleDate] = useState("2026-06-01");
  const [scheduleTime, setScheduleTime] = useState("10:00");

  const [generating, setGenerating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const togglePlatform = (id: string) => {
    if (selectedPlatforms.includes(id)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== id));
    } else {
      setSelectedPlatforms([...selectedPlatforms, id]);
    }
  };

  const handleGenerateAI = async () => {
    if (!contentPrompt) return;
    setGenerating(true);

    try {
      const res = await fetch("/api/ai/caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: contentPrompt, tone }),
      });

      if (res.ok) {
        const data = await res.json();
        setHook(data.hook || "");
        setCaption(data.caption || "");
        setHashtags(data.hashtags || "");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption || selectedPlatforms.length === 0) return;
    setSubmitting(true);

    const fullSchedule = `${scheduleDate}T${scheduleTime}:00`;

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: contentPrompt || "Scheduled campaign post",
          caption: `${hook ? hook + "\n\n" : ""}${caption}\n\n${hashtags}`,
          platforms: selectedPlatforms,
          scheduledAt: fullSchedule,
          status: "scheduled",
          hook,
          hashtags,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/calendar");
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 text-left max-w-4xl mx-auto">
      {/* Title Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Create AI Scheduled Post
        </h1>
        <p className="text-slate-500 mt-1">
          Draft hooks, customize visual attachments, and leverage GPT-4o to schedule multi-network content queues.
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-3 text-emerald-800 font-semibold animate-bounce text-sm">
          <Check className="w-5 h-5" />
          <span>Post scheduled successfully! Redirecting to calendar planner...</span>
        </div>
      )}

      <form onSubmit={handleSubmitPost} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Composer Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Destination Networks Selection */}
          <Card className="border border-slate-100 shadow-xl shadow-slate-900/5 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base font-bold">1. Select Target Social Networks</CardTitle>
              <CardDescription className="text-xs">Publish content to multiple channels in one execution.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="flex flex-wrap gap-2.5">
                {availablePlatforms.map((platform) => {
                  const Icon = platform.icon;
                  const isSel = selectedPlatforms.includes(platform.id);
                  return (
                    <button
                      key={platform.id}
                      type="button"
                      onClick={() => togglePlatform(platform.id)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-xs font-semibold transition-all duration-200 active:scale-95 ${
                        isSel
                          ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-600/10"
                          : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{platform.label}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Prompt + AI generation box */}
          <Card className="border border-slate-100 shadow-xl shadow-slate-900/5 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
            <CardHeader>
              <CardTitle className="text-base font-bold">2. Describe & Customize AI Captions</CardTitle>
              <CardDescription className="text-xs">Generate custom copies, trending hooks, and smart hashtags.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="post-prompt">Post Visual / Theme Description</Label>
                <Textarea
                  id="post-prompt"
                  placeholder="e.g., A developer writing clean, modular code with a cozy coffee setup, scaling a premium social automation platform."
                  value={contentPrompt}
                  onChange={(e) => setContentPrompt(e.target.value)}
                  className="rounded-xl border-slate-200 h-24"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="post-tone">Target Caption Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger id="post-tone" className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="professional">💼 Professional / Expert</SelectItem>
                      <SelectItem value="casual">👋 Casual / Conversational</SelectItem>
                      <SelectItem value="energetic">🔥 Energetic / Hype</SelectItem>
                      <SelectItem value="educational">🧠 Educational / Value-rich</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    type="button"
                    onClick={handleGenerateAI}
                    disabled={generating || !contentPrompt}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl shadow-md gap-2 py-6 px-6 font-semibold shrink-0"
                  >
                    <Sparkle className={`w-4 h-4 ${generating ? "animate-spin" : ""}`} />
                    <span>✨ Generate with AI</span>
                  </Button>
                </div>
              </div>

              {/* Hook + Caption fields details */}
              {(hook || caption || hashtags) && (
                <div className="space-y-4 pt-4 border-t border-slate-100 animate-in fade-in-30 duration-200 text-xs">
                  <div className="space-y-1.5">
                    <Label className="text-purple-600 font-bold">Generated Scroll-Stopper Hook</Label>
                    <Input
                      value={hook}
                      onChange={(e) => setHook(e.target.value)}
                      className="rounded-xl border-purple-100 bg-purple-50/20 font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-slate-500 font-bold">Body Copy Caption</Label>
                    <Textarea
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      className="rounded-xl border-slate-200 h-36 leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-slate-400 font-bold">Trending Hashtags Bundle</Label>
                    <Input
                      value={hashtags}
                      onChange={(e) => setHashtags(e.target.value)}
                      className="rounded-xl border-slate-200"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Media & Scheduling Side Cards */}
        <div className="space-y-6">
          {/* Media Attach Box */}
          <Card className="border border-slate-100 shadow-xl shadow-slate-900/5 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base font-bold">3. Visual Media Attachment</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="border-2 border-dashed border-slate-200 rounded-xl py-10 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50/50 transition-colors">
                <Upload className="w-6 h-6 text-slate-400 mb-2 animate-bounce" />
                <span className="text-xs font-bold text-slate-600">Drag & Drop Image or Video</span>
                <span className="text-[10px] text-slate-400 mt-1">Supports PNG, JPG, MP4 (Max 100MB)</span>
              </div>
            </CardContent>
          </Card>

          {/* Calendar Picker scheduling */}
          <Card className="border border-slate-100 shadow-xl shadow-slate-900/5 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base font-bold">4. Schedule Posting Date</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sch-date">Publish Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <Input
                    id="sch-date"
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="pl-10 rounded-xl border-slate-200 text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sch-time">Target Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <Input
                    id="sch-time"
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="pl-10 rounded-xl border-slate-200 text-xs font-semibold"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button
                type="submit"
                disabled={submitting || !caption || selectedPlatforms.length === 0}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-6 font-bold"
              >
                Schedule Deployment Queue
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}
