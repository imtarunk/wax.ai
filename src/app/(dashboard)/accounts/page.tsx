"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Sparkles,
  Shield,
  Activity,
  Plus,
  RefreshCw,
  LogOut,
  Mail,
  UserPlus,
  Lock,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import {
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Video,
} from "@/components/icons";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Local mappings for icons
const platformIcons: Record<string, any> = {
  instagram: Instagram,
  linkedin: Linkedin,
  x: Twitter,
  facebook: Facebook,
  tiktok: Video,
};

const platformBgs: Record<string, string> = {
  instagram: "from-pink-600 to-rose-500 shadow-rose-950/20",
  linkedin: "from-blue-600 to-sky-500 shadow-sky-950/20",
  x: "from-slate-900 to-slate-800 shadow-slate-950/20",
  facebook: "from-indigo-600 to-blue-500 shadow-blue-950/20",
  tiktok: "from-teal-600 to-emerald-500 shadow-emerald-950/20",
};

export default function AccountsPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Invite Modal States
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("viewer");
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [membersList, setMembersList] = useState<any[]>([]);

  // Add Account form states
  const [addOpen, setAddOpen] = useState(false);
  const [newPlatform, setNewPlatform] = useState("instagram");
  const [newUsername, setNewUsername] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [newColor, setNewColor] = useState("#7C3AED");

  // Load accounts
  const fetchAccounts = async () => {
    try {
      const res = await fetch("/api/accounts");
      if (res.ok) {
        const data = await res.json();
        setAccounts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // Sync token re-authentication
  const handleReauth = async (accountId: string) => {
    try {
      const res = await fetch(`/api/accounts/${accountId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reauthenticate" }),
      });
      if (res.ok) {
        await fetchAccounts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Disconnect / Delete Account
  const handleDisconnect = async (accountId: string) => {
    if (!confirm("Are you sure you want to disconnect this account? This deletes stored encrypted keys.")) return;
    try {
      const res = await fetch(`/api/accounts/${accountId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchAccounts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Connect new mock account
  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername) return;

    try {
      const res = await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: newPlatform,
          username: newUsername,
          label: newLabel || `${newPlatform.toUpperCase()} Business`,
          colorTag: newColor,
        }),
      });

      if (res.ok) {
        setAddOpen(false);
        setNewUsername("");
        setNewLabel("");
        await fetchAccounts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // View member invitation modal
  const openInviteModal = async (accountId: string) => {
    setSelectedAccountId(accountId);
    setInviteOpen(true);
    setMembersList([]);
    try {
      const res = await fetch(`/api/accounts/members?accountId=${accountId}`);
      if (res.ok) {
        const data = await res.json();
        setMembersList(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Submit team member invite
  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;

    try {
      const res = await fetch("/api/accounts/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountId: selectedAccountId,
          memberEmail: inviteEmail,
          role: inviteRole,
        }),
      });

      if (res.ok) {
        setInviteEmail("");
        // Reload members list
        const listRes = await fetch(`/api/accounts/members?accountId=${selectedAccountId}`);
        if (listRes.ok) {
          const listData = await listRes.json();
          setMembersList(listData);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const userPlan = (session?.user as any)?.plan || "agency";

  return (
    <div className="space-y-8 pb-12">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Connected Accounts
          </h1>
          <p className="text-slate-500 mt-1">
            Manage multi-platform API connections, OAuth credentials, access permissions, and account token health.
          </p>
        </div>

        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))/90] text-white shadow-lg shadow-purple-200/50 transition-all rounded-xl font-semibold gap-2 py-6 px-6">
              <Plus className="w-5 h-5" />
              <span>Connect Platform Account</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-white border border-slate-100 rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Connect via OAuth 2.0</DialogTitle>
              <DialogDescription className="text-slate-400">
                Establish direct API integration using secure standard protocol.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddAccount} className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="add-platform">Select Social Media Channel</Label>
                <Select value={newPlatform} onValueChange={setNewPlatform}>
                  <SelectTrigger id="add-platform" className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="instagram">Instagram Graph API</SelectItem>
                    <SelectItem value="linkedin">LinkedIn Business API</SelectItem>
                    <SelectItem value="x">X / Twitter v2 PKCE</SelectItem>
                    <SelectItem value="facebook">Facebook Login SDK</SelectItem>
                    <SelectItem value="tiktok">TikTok Business SDK</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="add-username">Username or Client ID</Label>
                <Input
                  id="add-username"
                  placeholder="e.g., fitlife_academy"
                  required
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="rounded-xl border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="add-label">Friendly Account Label (Agency Client)</Label>
                <Input
                  id="add-label"
                  placeholder="e.g., FitLife Corp Main Page"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  className="rounded-xl border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="add-color">Color Tag Marker</Label>
                <div className="flex gap-2">
                  {["#E1306C", "#0077B5", "#14171A", "#1877F2", "#00F2EA", "#7C3AED"].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setNewColor(c)}
                      className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center shrink-0 transition-transform active:scale-90"
                      style={{ backgroundColor: c }}
                    >
                      {newColor === c && <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />}
                    </button>
                  ))}
                </div>
              </div>

              <DialogFooter className="pt-4">
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
                  Authorize via OAuth
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Grid of Accounts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-600" />
              <span>Channels List</span>
            </h2>
            <span className="text-xs text-slate-400 font-medium">
              Showing {accounts.length} linked profiles ({userPlan === "agency" ? "Agency Unlimited Accounts Enabled" : "Creator Tier Max 1 Account"})
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw className="w-8 h-8 animate-spin text-purple-600" />
            </div>
          ) : accounts.length === 0 ? (
            <Card className="border-dashed border-2 py-12 text-center flex flex-col items-center justify-center rounded-2xl">
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-4">
                <Plus className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-slate-700 text-lg">No channels connected yet</h3>
              <p className="text-slate-400 text-sm max-w-sm mt-1 mb-6">
                Connect your business profiles via secure OAuth to start automating scheduled calendars, caption hooks, and replies!
              </p>
              <Button
                onClick={() => setAddOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
              >
                Quick Connect Platform
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {accounts.map((account) => {
                const Icon = platformIcons[account.platform] || HelpCircle;
                const hoursLeft = account.tokenExpiresAt
                  ? (new Date(account.tokenExpiresAt).getTime() - Date.now()) / 3_600_000
                  : 120;
                
                let healthStatus: "connected" | "disconnected" | "token_expired" | "expiring_soon" = "connected";
                if (hoursLeft <= 0) healthStatus = "token_expired";
                else if (hoursLeft <= 48) healthStatus = "expiring_soon";

                return (
                  <Card key={account.id} className="border border-slate-100 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-900/5 transition-all overflow-hidden flex flex-col justify-between">
                    <div className="p-6 space-y-4">
                      {/* Account Card Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${platformBgs[account.platform]} flex items-center justify-center text-white shadow-md relative`}>
                            <Icon className="w-5 h-5" />
                            <span
                              className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white"
                              style={{ backgroundColor: account.colorTag || "#7C3AED" }}
                            />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 leading-none">{account.label}</p>
                            <p className="text-xs text-slate-400 mt-1">@{account.username}</p>
                          </div>
                        </div>

                        {healthStatus === "connected" && (
                          <Badge variant="success" className="gap-1.5 py-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Connected</span>
                          </Badge>
                        )}
                        {healthStatus === "expiring_soon" && (
                          <Badge variant="warning" className="gap-1.5 py-0.5 animate-pulse">
                            <AlertTriangle className="w-3 h-3 text-amber-600" />
                            <span>Expiring Soon</span>
                          </Badge>
                        )}
                        {healthStatus === "token_expired" && (
                          <Badge variant="error" className="gap-1.5 py-0.5">
                            <AlertCircle className="w-3 h-3 text-red-600" />
                            <span>Token Expired</span>
                          </Badge>
                        )}
                      </div>

                      {/* Info & Stats */}
                      <div className="grid grid-cols-2 gap-4 py-2 border-t border-b border-slate-50 text-left">
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Followers</p>
                          <p className="text-base font-extrabold text-slate-700 mt-0.5">
                            {account.followerCount.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sync Status</p>
                          <p className="text-xs font-semibold text-slate-600 mt-1">
                            Just now
                          </p>
                        </div>
                      </div>

                      {/* API Rate Limit bar */}
                      <div className="space-y-1 text-left">
                        <div className="flex items-center justify-between text-xs font-medium">
                          <span className="text-slate-400">API Rate Limit</span>
                          <span className="text-slate-600 font-bold">
                            {account.rateLimitUsed} / {account.rateLimitMax} reqs
                          </span>
                        </div>
                        <Progress value={(account.rateLimitUsed / account.rateLimitMax) * 100} className="h-1.5" />
                      </div>
                    </div>

                    <CardFooter className="p-4 bg-slate-50/50 border-t border-slate-100 flex flex-wrap gap-2 justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openInviteModal(account.id)}
                        className="border-slate-200 text-slate-600 hover:bg-slate-100 rounded-lg text-xs"
                      >
                        <UserPlus className="w-3.5 h-3.5 mr-1" />
                        <span>Team</span>
                      </Button>

                      <div className="flex gap-2">
                        {healthStatus !== "connected" ? (
                          <Button
                            size="sm"
                            onClick={() => handleReauth(account.id)}
                            className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold"
                          >
                            <RefreshCw className="w-3.5 h-3.5 mr-1" />
                            <span>Re-Auth</span>
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReauth(account.id)}
                            className="border-slate-200 text-slate-600 hover:bg-slate-100 rounded-lg text-xs"
                          >
                            <RefreshCw className="w-3.5 h-3.5 mr-1" />
                            <span>Refresh</span>
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDisconnect(account.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg text-xs"
                        >
                          Disconnect
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Health Panel */}
        <div className="space-y-6">
          <Card className="border border-slate-100 shadow-xl shadow-purple-900/5 overflow-hidden">
            <CardHeader className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              <Activity className="w-6 h-6 text-purple-400 mb-2" />
              <CardTitle className="text-lg font-bold">API Security & Token Health</CardTitle>
              <CardDescription className="text-indigo-200">
                Live monitoring of OAuth scopes, rate limits, and encryption standards.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6 text-left">
              {/* AES notification */}
              <div className="flex gap-3 p-3 rounded-xl bg-purple-50 border border-purple-100">
                <Lock className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-purple-800">AES-256-GCM Encrypted</p>
                  <p className="text-[11px] text-purple-700/80 mt-0.5">
                    Your platform tokens are encrypted at rest with hardware security protocols. Decryption keys never touch standard logs.
                  </p>
                </div>
              </div>

              {/* Expiring tokens countdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Silent Token Expiry Alerts</h4>
                
                {accounts.filter(a => {
                  const hoursLeft = (new Date(a.tokenExpiresAt).getTime() - Date.now()) / 3_600_000;
                  return hoursLeft <= 48 && hoursLeft > 0;
                }).length === 0 ? (
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 p-3 rounded-xl">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>All OAuth token connection states are highly stable!</span>
                  </div>
                ) : (
                  accounts.map((a) => {
                    const hoursLeft = (new Date(a.tokenExpiresAt).getTime() - Date.now()) / 3_600_000;
                    if (hoursLeft <= 48 && hoursLeft > 0) {
                      return (
                        <div key={a.id} className="p-3 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-between text-xs">
                          <div>
                            <p className="font-bold text-amber-800">@{a.username} ({a.platform})</p>
                            <p className="text-[11px] text-amber-700 mt-0.5">Expires in {Math.round(hoursLeft)} hours</p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleReauth(a.id)}
                            className="bg-amber-600 hover:bg-amber-700 text-white rounded-lg h-7 px-2.5 text-[11px]"
                          >
                            Renew Key
                          </Button>
                        </div>
                      );
                    }
                    return null;
                  })
                )}
              </div>

              {/* Background refresh status */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Silent Auto-Refresh Job</span>
                  <span className="text-purple-600 font-bold">Active (BullMQ Worker)</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Last System Cron Execution</span>
                  <span className="text-slate-600 font-semibold">Today, 5:00 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Invite Member dialog */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="max-w-md bg-white border border-slate-100 rounded-2xl text-left">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-purple-600" />
              <span>Invite Account Team Member</span>
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Grant selected teammates access with explicit workspace roles.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSendInvite} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="invite-email">Teammate Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="colleague@yourbrand.com"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="pl-10 rounded-xl border-slate-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="invite-role">Select Access Role</Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger id="invite-role" className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="owner">Owner (Full Admin controls)</SelectItem>
                  <SelectItem value="editor">Editor (Can draft & schedule posts)</SelectItem>
                  <SelectItem value="viewer">Viewer (Read-only analytics & posts)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-6"
            >
              Send Secure Account Invitation
            </Button>
          </form>

          <Separator className="my-2" />

          {/* List of active members on this account */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Authorized Teammates</h4>
            {membersList.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No teammates invited to this client channel yet.</p>
            ) : (
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {membersList.map((m) => (
                  <div key={m.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6 border">
                        <AvatarFallback className="bg-slate-200 text-slate-600 text-[10px]">
                          {m.memberEmail.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-slate-700 truncate max-w-[150px]">{m.memberEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-[10px] uppercase font-bold px-1.5 py-0.5">
                        {m.role}
                      </Badge>
                      <span className="text-[10px] text-slate-400 font-medium">Invited</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setInviteOpen(false)}
              className="rounded-xl w-full"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
