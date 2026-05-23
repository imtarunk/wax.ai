"use client";

import { useState } from "react";
import {
  Lightbulb,
  Sparkles,
  Zap,
  Bookmark,
  Share2,
  Tv,
  MessageSquare,
  Clock,
  RotateCcw,
  Check,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const availableNiches = [
  { value: "tech", label: "💻 Tech & Software Automation" },
  { value: "fitness", label: "💪 Fitness, Workouts & Wellness" },
  { value: "food", label: "🍳 Food, Baking & Restaurants" },
  { value: "fashion", label: "👗 Fashion, Styling & Outfits" },
  { value: "travel", label: "✈️ Travel, Hotels & Destinations" },
  { value: "business", label: "📈 Business Growth & Finance" },
];

export default function ContentIdeasPage() {
  const [selectedNiche, setSelectedNiche] = useState("tech");
  const [ideas, setIdeas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const handleGenerate = async () => {
    setLoading(true);
    setIdeas([]);
    try {
      const res = await fetch("/api/ai/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche: selectedNiche }),
      });

      if (res.ok) {
        const data = await res.json();
        setIdeas(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSave = (ideaIndex: number) => {
    const idStr = String(ideaIndex);
    if (savedIds.includes(idStr)) {
      setSavedIds(savedIds.filter((id) => id !== idStr));
    } else {
      setSavedIds([...savedIds, idStr]);
    }
  };

  return (
    <div className="space-y-8 pb-12 text-left max-w-5xl mx-auto">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Reel Script Generator
          </h1>
          <p className="text-slate-500 mt-1">
            Pick your marketing niche and generate 10 trending, high-impact video structures instantly.
          </p>
        </div>
      </div>

      {/* Control selector box */}
      <Card className="border border-slate-100 shadow-xl shadow-slate-900/5 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-end gap-6">
            <div className="flex-1 space-y-2 w-full text-left">
              <Label htmlFor="niche-select" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Select Your Brand Niche
              </Label>
              <Select value={selectedNiche} onValueChange={setSelectedNiche}>
                <SelectTrigger id="niche-select" className="rounded-xl py-6 border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  {availableNiches.map((n) => (
                    <SelectItem key={n.value} value={n.value} className="hover:bg-slate-50 rounded-lg">
                      {n.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl shadow-lg glow-purple py-6 px-8 font-semibold shrink-0 gap-2 w-full md:w-auto"
            >
              <Sparkles className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span>{loading ? "Constructing Scripts..." : "Generate 10 Reel Ideas"}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Script output rendering */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border flex items-center justify-center animate-spin text-purple-600 shadow-sm">
            <RotateCcw className="w-6 h-6" />
          </div>
          <span className="text-sm font-semibold text-slate-500 animate-pulse-soft">
            Mapping viral hooks and script narration...
          </span>
        </div>
      ) : ideas.length === 0 ? (
        <Card className="border-dashed border-2 py-16 text-center flex flex-col items-center justify-center rounded-2xl">
          <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-4">
            <Lightbulb className="w-6 h-6 text-purple-600 animate-pulse" />
          </div>
          <h3 className="font-bold text-slate-700 text-lg">No video concepts generated yet</h3>
          <p className="text-slate-400 text-sm max-w-sm mt-1">
            Pick your business channel domain above and press generate to request 10 complete reel scripts instantly!
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ideas.map((idea, index) => {
            const isSaved = savedIds.includes(String(index));
            return (
              <Card
                key={index}
                className="border border-slate-100 shadow-lg shadow-purple-950/[0.02] hover:shadow-xl hover:border-purple-200 transition-all rounded-2xl flex flex-col justify-between overflow-hidden"
              >
                <div className="p-6 space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <Badge variant="purple" className="text-[10px] uppercase font-bold tracking-wider py-0.5 px-2">
                      Concept #{index + 1}
                    </Badge>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleSave(index)}
                      className={`rounded-lg h-8 w-8 transition-colors ${
                        isSaved ? "text-purple-600 bg-purple-50" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? "fill-purple-600" : ""}`} />
                    </Button>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-800 text-sm leading-tight">
                      {idea.ideaText}
                    </h3>
                  </div>

                  <div className="space-y-1.5 p-3 rounded-xl bg-purple-50/20 border border-purple-50 text-xs">
                    <div className="flex items-center gap-1 text-purple-700 font-extrabold uppercase tracking-wider text-[10px]">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Scroll-Stopper Hook (3s)</span>
                    </div>
                    <p className="font-semibold text-slate-600 leading-relaxed italic">
                      &quot;{idea.hook}&quot;
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-1 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      <Tv className="w-3.5 h-3.5" />
                      <span>Voiceover Narration Script</span>
                    </div>
                    <p className="font-medium text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {idea.script}
                    </p>
                  </div>
                </div>

                <CardFooter className="p-4 bg-slate-50/40 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Est: 30-45 seconds duration</span>
                  </span>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 font-semibold rounded-lg text-xs"
                  >
                    <Share2 className="w-3.5 h-3.5 mr-1" />
                    <span>Share Draft</span>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
