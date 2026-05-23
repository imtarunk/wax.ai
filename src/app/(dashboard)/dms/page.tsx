"use client";

import { useState } from "react";
import {
  MessageSquare,
  Plus,
  Trash,
  Send,
  Zap,
  HelpCircle,
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
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Initial Mock Rules
const initialRules = [
  { id: "1", keyword: "promo", replyTemplate: "Thanks for checking us out! Grab 20% off our Agency subscription tiers using this custom link: https://socialai.com/pricing/promo 🚀", platform: "instagram", isActive: true },
  { id: "2", keyword: "pricing", replyTemplate: "Hi! Our subscription models start at just ₹999 for creators, and go up to our multi-account Agency plan at ₹9999/mo. Read details at https://socialai.com/pricing! ✨", platform: "linkedin", isActive: true },
  { id: "3", keyword: "collab", replyTemplate: "Hey! We are super thrilled to explore partnerships. Send over a quick outline of your project or details to collab@socialai.com!", platform: "x", isActive: false },
];

// Simulated Inbox Logs
const initialInboxLogs = [
  { id: "1", sender: "@alex_growth", text: "Hey! Do you guys have any active promo code details?", timestamp: "10 mins ago", keywordMatched: "promo", platform: "instagram", status: "replied" },
  { id: "2", sender: "Sarah Jenkins (PM)", text: "What is your pricing model for agency integrations?", timestamp: "40 mins ago", keywordMatched: "pricing", platform: "linkedin", status: "replied" },
  { id: "3", sender: "@dev_samuel", text: "Love the app structure. Down to discuss a collab opportunities?", timestamp: "2 hours ago", keywordMatched: "collab", platform: "x", status: "ignored" },
];

const platformBgs: Record<string, string> = {
  instagram: "bg-pink-50 text-pink-700 border-pink-200",
  linkedin: "bg-blue-50 text-blue-700 border-blue-200",
  x: "bg-slate-50 text-slate-900 border-slate-200",
};

const platformIcons: Record<string, any> = {
  instagram: Instagram,
  linkedin: Linkedin,
  x: Twitter,
};

export default function AutoDMsPage() {
  const [rules, setRules] = useState(initialRules);
  const [inboxLogs, setInboxLogs] = useState(initialInboxLogs);

  // Form states
  const [addOpen, setAddOpen] = useState(false);
  const [newKeyword, setNewKeyword] = useState("");
  const [newReply, setNewReply] = useState("");
  const [newPlatform, setNewPlatform] = useState("instagram");

  // Enable/Disable toggles per platform (General state)
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    instagram: true,
    linkedin: true,
    x: true,
  });

  const togglePlatformAutoDM = (platform: string) => {
    setToggles({ ...toggles, [platform]: !toggles[platform] });
  };

  const handleToggleRule = (ruleId: string) => {
    setRules(
      rules.map((r) => (r.id === ruleId ? { ...r, isActive: !r.isActive } : r))
    );
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules(rules.filter((r) => r.id !== ruleId));
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword || !newReply) return;

    const newRule = {
      id: String(rules.length + 1),
      keyword: newKeyword.toLowerCase(),
      replyTemplate: newReply,
      platform: newPlatform,
      isActive: true,
    };

    setRules([...rules, newRule]);
    setAddOpen(false);
    setNewKeyword("");
    setNewReply("");
  };

  return (
    <div className="space-y-8 pb-12 text-left">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Auto-DM Assistant
          </h1>
          <p className="text-slate-500 mt-1">
            Build custom keywords filters, establish automated reply hooks, and review simulated inboxes.
          </p>
        </div>

        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))/90] text-white shadow-lg rounded-xl font-semibold gap-2 py-6 px-6">
              <Plus className="w-4 h-4" />
              <span>Add Keyword Rule</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-white border border-slate-100 rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-600 animate-pulse" />
                <span>Establish DM Reply Rule</span>
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                Setup triggers to respond instantaneously to customer chats.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAddRule} className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="rule-platform">Trigger Network</Label>
                <Select value={newPlatform} onValueChange={setNewPlatform}>
                  <SelectTrigger id="rule-platform" className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="instagram">Instagram Direct API</SelectItem>
                    <SelectItem value="linkedin">LinkedIn Messages</SelectItem>
                    <SelectItem value="x">X / Twitter DM Pipeline</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rule-keyword">Target Catchphrase Keyword</Label>
                <Input
                  id="rule-keyword"
                  placeholder="e.g., pricing, promo, pdf"
                  required
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  className="rounded-xl border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rule-reply">Automated Answer Template</Label>
                <Textarea
                  id="rule-reply"
                  placeholder="Draft friendly responsive scripts details..."
                  required
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  className="rounded-xl border-slate-200 h-28"
                />
              </div>

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAddOpen(false)}
                  className="rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
                >
                  Save Trigger Rule
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rules column & switches */}
        <div className="lg:col-span-2 space-y-6">
          {/* Channel global toggles */}
          <Card className="border border-slate-100 shadow-xl shadow-slate-900/5 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base font-bold">Channel Global Toggles</CardTitle>
              <CardDescription className="text-xs">Turn auto-DM pipelines on/off at high levels.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 flex flex-wrap gap-6 justify-between items-center">
              {[
                { id: "instagram", name: "Instagram DMs", color: "#E1306C", icon: Instagram },
                { id: "linkedin", name: "LinkedIn Mail", color: "#0077B5", icon: Linkedin },
                { id: "x", name: "X (Twitter) Chat", color: "#14171A", icon: Twitter },
              ].map((channel) => {
                const CIcon = channel.icon;
                return (
                  <div key={channel.id} className="flex items-center gap-3 bg-slate-50/50 p-3 rounded-xl border border-slate-100 min-w-[200px]">
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center border" style={{ color: channel.color }}>
                      <CIcon className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-700">{channel.name}</p>
                      <p className="text-[10px] text-slate-400 font-semibold">{toggles[channel.id] ? "Operational" : "Disabled"}</p>
                    </div>
                    <Switch
                      checked={toggles[channel.id]}
                      onCheckedChange={() => togglePlatformAutoDM(channel.id)}
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Trigger rules cards list */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-800 tracking-tight">Active keyword templates</h2>
            {rules.map((rule) => {
              const PIcon = platformIcons[rule.platform] || HelpCircle;
              return (
                <Card key={rule.id} className="border border-slate-100 hover:shadow-lg transition-all rounded-2xl overflow-hidden">
                  <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${platformBgs[rule.platform]}`}>
                        <PIcon className="w-4 h-4" />
                      </div>
                      <div className="text-left space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-extrabold text-slate-400">Trigger Catchphrase:</span>
                          <Badge variant="purple" className="text-xs tracking-wider">
                            &quot;{rule.keyword}&quot;
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500 font-medium max-w-md leading-relaxed">
                          {rule.replyTemplate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
                      <Switch
                        checked={rule.isActive}
                        onCheckedChange={() => handleToggleRule(rule.id)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteRule(rule.id)}
                        className="text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Simulated inbox logs column */}
        <div className="space-y-6">
          <Card className="border border-slate-100 shadow-xl shadow-slate-900/5 rounded-2xl">
            <CardHeader className="border-b border-slate-50 p-6">
              <CardTitle className="text-base font-bold">Simulated Inbox Logger</CardTitle>
              <CardDescription className="text-xs">Real-time automation logs output</CardDescription>
            </CardHeader>
            <CardContent className="p-6 divide-y divide-slate-100">
              {inboxLogs.map((log) => {
                const MIcon = platformIcons[log.platform] || HelpCircle;
                return (
                  <div key={log.id} className="py-4 first:pt-0 last:pb-0 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5 font-bold text-slate-700">
                        <MIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span>{log.sender}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">{log.timestamp}</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 font-medium leading-relaxed italic">
                      &quot;{log.text}&quot;
                    </div>

                    <div className="flex justify-between items-center pt-1">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-slate-400 font-semibold">Matched:</span>
                        <Badge variant="outline" className="text-[9px] uppercase tracking-wider py-0 px-1">
                          {log.keywordMatched}
                        </Badge>
                      </div>
                      {log.status === "replied" ? (
                        <Badge variant="success" className="text-[9px] uppercase font-bold px-1 py-0 shadow-sm gap-1">
                          <Send className="w-2.5 h-2.5" />
                          <span>Replied</span>
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-[9px] uppercase font-bold px-1 py-0 bg-slate-100 text-slate-400">
                          Ignored
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
