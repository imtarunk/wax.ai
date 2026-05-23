"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  FilePlus2,
  MessageSquare,
  BarChart3,
  Lightbulb,
  Settings,
  Users,
  LogOut,
  ChevronDown,
  Plus,
  Sparkles,
  Shield,
  Circle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Calendar", href: "/calendar", icon: Calendar },
  { label: "New Post", href: "/posts/new", icon: FilePlus2 },
  { label: "Auto DMs", href: "/dms", icon: MessageSquare },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Content Ideas", href: "/ideas", icon: Lightbulb },
  { label: "Connected Accounts", href: "/accounts", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
];

// Mock accounts for the switcher
const mockSwitcherAccounts = [
  { id: "1", name: "FitLife Academy", niche: "Fitness", color: "#E1306C", platform: "instagram" },
  { id: "2", name: "TechBytes Media", niche: "Tech & SaaS", color: "#0077B5", platform: "linkedin" },
  { id: "3", name: "Chef's Table", niche: "Food & Dining", color: "#14171A", platform: "x" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [activeAccount, setActiveAccount] = useState(mockSwitcherAccounts[0]);

  // Plan level (default to "agency" to demonstrate full multi-account and switcher features)
  const userPlan = (session?.user as any)?.plan || "agency";

  return (
    <aside className="w-64 border-r border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))] flex flex-col h-screen fixed left-0 top-0 z-30">
      {/* Sidebar Header with Account Switcher or Brand Logo */}
      <div className="p-4 border-b border-[hsl(var(--sidebar-border))]">
        {userPlan === "agency" ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center justify-between p-2 rounded-xl bg-[hsl(var(--sidebar-accent))] hover:bg-[hsl(var(--sidebar-accent))/80] transition-colors border border-[hsl(var(--sidebar-border))] text-left focus:outline-none">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: activeAccount.color }}
                  />
                  <div className="truncate">
                    <p className="text-sm font-semibold truncate leading-none">
                      {activeAccount.name}
                    </p>
                    <p className="text-xs text-[hsl(var(--sidebar-foreground))]/60 mt-1 truncate">
                      {activeAccount.niche} • Agency Client
                    </p>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-[hsl(var(--sidebar-foreground))]/60 shrink-0 ml-2" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 ml-4 bg-[hsl(var(--sidebar-background))] border-[hsl(var(--sidebar-border))] text-[hsl(var(--sidebar-foreground))]">
              <DropdownMenuLabel className="text-[hsl(var(--sidebar-foreground))]/60">
                Switch Client Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[hsl(var(--sidebar-border))]" />
              {mockSwitcherAccounts.map((account) => (
                <DropdownMenuItem
                  key={account.id}
                  onClick={() => setActiveAccount(account)}
                  className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-[hsl(var(--sidebar-accent))] focus:bg-[hsl(var(--sidebar-accent))]"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: account.color }}
                    />
                    <div>
                      <p className="text-sm font-medium">{account.name}</p>
                      <p className="text-xs text-[hsl(var(--sidebar-foreground))]/50">
                        {account.niche}
                      </p>
                    </div>
                  </div>
                  {activeAccount.id === account.id && (
                    <Circle className="w-2.5 h-2.5 fill-[hsl(var(--sidebar-primary))] text-[hsl(var(--sidebar-primary))]" />
                  )}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-[hsl(var(--sidebar-border))]" />
              <DropdownMenuItem asChild>
                <Link
                  href="/accounts"
                  className="flex items-center gap-2 p-2 rounded-lg text-[hsl(var(--sidebar-primary))] font-medium cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Manage / Add Account</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center text-white font-bold text-lg shadow-lg">
              S
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
                SocialAI
              </span>
              <span className="text-xs block text-slate-400 leading-none">SaaS Platform</span>
            </div>
          </div>
        )}
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                isActive
                  ? "bg-[hsl(var(--sidebar-primary))] text-white shadow-md shadow-purple-900/20"
                  : "text-[hsl(var(--sidebar-foreground))]/70 hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-foreground))]"
              )}
            >
              <Icon className={cn("w-5 h-5 shrink-0 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-[hsl(var(--sidebar-foreground))]/50 group-hover:text-[hsl(var(--sidebar-foreground))]" )} />
              <span>{item.label}</span>
              {isActive && (
                <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom User Area */}
      <div className="p-4 border-t border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-background))]/80">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-10 h-10 border border-slate-700">
            <AvatarImage src={session?.user?.image || ""} />
            <AvatarFallback className="bg-purple-900 text-purple-200">
              {session?.user?.name ? session.user.name.substring(0, 2).toUpperCase() : "US"}
            </AvatarFallback>
          </Avatar>
          <div className="truncate flex-1">
            <p className="text-sm font-semibold truncate leading-none">
              {session?.user?.name || "Premium Creator"}
            </p>
            <p className="text-xs text-[hsl(var(--sidebar-foreground))]/55 mt-1 truncate">
              {session?.user?.email || "creator@socialai.com"}
            </p>
          </div>
          <Badge
            className={cn(
              "text-[9px] uppercase font-bold shrink-0 tracking-wider",
              userPlan === "agency"
                ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black border-none"
                : userPlan === "team"
                ? "bg-blue-600 text-white"
                : "bg-purple-600 text-white"
            )}
          >
            {userPlan}
          </Badge>
        </div>

        <Button
          variant="ghost"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded-xl"
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span>Sign Out</span>
        </Button>
      </div>
    </aside>
  );
}
