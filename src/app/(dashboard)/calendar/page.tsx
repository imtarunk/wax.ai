"use client";

import { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Eye,
  FileText,
  Clock,
  Sparkles,
} from "lucide-react";
import {
  Instagram,
  Linkedin,
  Twitter,
  Video,
} from "@/components/icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Initial Mock Scheduled Posts
const initialCalendarPosts = [
  { id: "1", date: 12, month: 5, platform: "instagram", title: "FitLife Launch Reel", caption: "Ready to take your fitness to the next level? 🚀 High energy launch details inside!", time: "10:00 AM", status: "scheduled" },
  { id: "2", date: 15, month: 5, platform: "linkedin", title: "SaaS Scaling Automation Strategy", caption: "Efficiency scales business. Automated pipelines allow your engineering talent to thrive.", time: "11:30 AM", status: "scheduled" },
  { id: "3", date: 18, month: 5, platform: "x", title: "Future of AI in Content", caption: "Content automation isn't coming. It's already here. The winners are scaling production rates.", time: "4:00 PM", status: "scheduled" },
  { id: "4", date: 22, month: 5, platform: "tiktok", title: "Daily Tech Routines TikTok", caption: "Quick breakdown of my absolute favorite automation setup this week #viral #trend", time: "6:30 PM", status: "published" },
];

const platformBgs: Record<string, string> = {
  instagram: "bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100/50",
  linkedin: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100/50",
  x: "bg-slate-50 text-slate-900 border-slate-200 hover:bg-slate-100/50",
  tiktok: "bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100/50",
};

const platformIcons: Record<string, any> = {
  instagram: Instagram,
  linkedin: Linkedin,
  x: Twitter,
  tiktok: Video,
};

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState("June 2026");
  const [posts, setPosts] = useState(initialCalendarPosts);

  // Modals
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  
  const [createOpen, setCreateOpen] = useState(false);
  const [clickDate, setClickDate] = useState<number | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState("");
  const [formPlatform, setFormPlatform] = useState("instagram");
  const [formCaption, setFormCaption] = useState("");
  const [formTime, setFormTime] = useState("09:00 AM");

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleCellClick = (day: number) => {
    const matchedPost = posts.find((p) => p.date === day);
    if (matchedPost) {
      setSelectedPost(matchedPost);
      setPreviewOpen(true);
    } else {
      setClickDate(day);
      setFormTitle("");
      setFormCaption("");
      setCreateOpen(true);
    }
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !clickDate) return;

    const newPost = {
      id: String(posts.length + 1),
      date: clickDate,
      month: 5,
      platform: formPlatform,
      title: formTitle,
      caption: formCaption,
      time: formTime,
      status: "scheduled",
    };

    setPosts([...posts, newPost]);
    setCreateOpen(false);
  };

  return (
    <div className="space-y-8 pb-12 text-left">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Content Planner Calendar
          </h1>
          <p className="text-slate-500 mt-1">
            Map out your digital schedules, organize multithread postings, and monitor pipeline health.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-200 hover:bg-slate-50 rounded-xl px-3 py-6 h-8 text-xs font-semibold">
            <ChevronLeft className="w-4 h-4 mr-1" />
            <span>Prev</span>
          </Button>
          <span className="font-extrabold text-slate-800 text-sm">{currentMonth}</span>
          <Button variant="outline" className="border-slate-200 hover:bg-slate-50 rounded-xl px-3 py-6 h-8 text-xs font-semibold">
            <span>Next</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Grid of Calendar Days */}
      <Card className="border border-slate-100 shadow-xl shadow-slate-900/5 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-7 bg-slate-900 text-white font-bold text-center text-xs py-3.5 tracking-wider border-b border-slate-800">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 grid-rows-5 min-h-[600px] bg-slate-50/50">
          {/* Calendar cell buffer */}
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={`empty-${i}`} className="border-b border-r border-slate-100 bg-slate-100/30 p-2" />
          ))}

          {daysInMonth.map((day) => {
            const matchedPosts = posts.filter((p) => p.date === day);
            return (
              <div
                key={day}
                onClick={() => handleCellClick(day)}
                className="border-b border-r border-slate-200/60 bg-white p-3 hover:bg-slate-50/60 cursor-pointer flex flex-col justify-between transition-colors min-h-[110px]"
              >
                <span className="text-xs font-extrabold text-slate-400 self-start">{day}</span>
                <div className="space-y-1.5 mt-2 flex-1 w-full">
                  {matchedPosts.map((post) => {
                    const SIcon = platformIcons[post.platform];
                    return (
                      <div
                        key={post.id}
                        className={`text-[10px] font-bold py-1 px-2 border rounded-lg flex items-center gap-1.5 w-full justify-between truncate ${platformBgs[post.platform]}`}
                      >
                        <span className="truncate flex-1">{post.title}</span>
                        {SIcon && <SIcon className="w-3.5 h-3.5 shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Preview Post Modal */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-md bg-white border border-slate-100 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Eye className="w-5 h-5 text-purple-600" />
              <span>Pipeline Post Preview</span>
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Details of the scheduled automated publisher.
            </DialogDescription>
          </DialogHeader>

          {selectedPost && (
            <div className="space-y-4 py-2">
              <div className="flex justify-between items-center bg-slate-50 border p-3.5 rounded-xl text-xs">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg ${platformBgs[selectedPost.platform]} flex items-center justify-center`}>
                    {platformIcons[selectedPost.platform] && (
                      <div className="w-4 h-4 text-current">
                        {(() => {
                          const PIcon = platformIcons[selectedPost.platform];
                          return <PIcon className="w-4 h-4" />;
                        })()}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 capitalize">{selectedPost.platform} Post</p>
                    <p className="text-[10px] text-slate-400 font-medium">Scheduled Time</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="success">{selectedPost.status}</Badge>
                  <p className="text-xs font-bold text-slate-600 mt-1">{selectedPost.time}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Campaign Title</p>
                <p className="text-sm font-semibold text-slate-700">{selectedPost.title}</p>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Copy Caption</p>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-600 whitespace-pre-line leading-relaxed">
                  {selectedPost.caption}
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setPreviewOpen(false)}
              className="rounded-xl w-full"
            >
              Close Details
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Post Modal */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-md bg-white border border-slate-100 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Plus className="w-5 h-5 text-purple-600" />
              <span>Schedule Content Block</span>
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Create a scheduled social media post on this date.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddPost} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="c-title">Campaign / Video Title</Label>
              <Input
                id="c-title"
                placeholder="e.g., Summer Automation Promo"
                required
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="rounded-xl border-slate-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="c-platform">Destination Network</Label>
              <Select value={formPlatform} onValueChange={setFormPlatform}>
                <SelectTrigger id="c-platform" className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="instagram">Instagram Graph API</SelectItem>
                  <SelectItem value="linkedin">LinkedIn Business API</SelectItem>
                  <SelectItem value="x">X / Twitter Channel</SelectItem>
                  <SelectItem value="tiktok">TikTok Video Channel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="c-caption">Copy Caption</Label>
              <Textarea
                id="c-caption"
                placeholder="Write hook tags and description details here..."
                required
                value={formCaption}
                onChange={(e) => setFormCaption(e.target.value)}
                className="rounded-xl border-slate-200 h-28"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="c-time">Scheduled Posting Time</Label>
              <Input
                id="c-time"
                placeholder="e.g., 10:00 AM"
                required
                value={formTime}
                onChange={(e) => setFormTime(e.target.value)}
                className="rounded-xl border-slate-200"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateOpen(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
              >
                Add to Calendar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
