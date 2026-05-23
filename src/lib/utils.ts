import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

export function formatDate(date: Date | string | null): string {
  if (!date) return "Never";
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function timeAgo(date: Date | string | null): string {
  if (!date) return "Never";
  const d = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export function getTokenExpiryCountdown(expiresAt: Date | string | null): string {
  if (!expiresAt) return "Unknown";
  const d = typeof expiresAt === "string" ? new Date(expiresAt) : expiresAt;
  const ms = d.getTime() - Date.now();
  if (ms <= 0) return "Expired";
  const hours = Math.floor(ms / 3_600_000);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ${hours % 24}h remaining`;
  return `${hours}h ${Math.floor((ms % 3_600_000) / 60_000)}m remaining`;
}

export function isTokenExpiringSoon(expiresAt: Date | string | null): boolean {
  if (!expiresAt) return false;
  const d = typeof expiresAt === "string" ? new Date(expiresAt) : expiresAt;
  const hoursLeft = (d.getTime() - Date.now()) / 3_600_000;
  return hoursLeft <= 48 && hoursLeft > 0;
}

export function isTokenExpired(expiresAt: Date | string | null): boolean {
  if (!expiresAt) return false;
  const d = typeof expiresAt === "string" ? new Date(expiresAt) : expiresAt;
  return d.getTime() <= Date.now();
}

export const PLATFORM_COLORS: Record<string, string> = {
  instagram: "#E1306C",
  linkedin: "#0077B5",
  x: "#14171A",
  facebook: "#1877F2",
  tiktok: "#00F2EA",
};

export const PLATFORM_BG_COLORS: Record<string, string> = {
  instagram: "bg-pink-500",
  linkedin: "bg-blue-600",
  x: "bg-gray-900",
  facebook: "bg-blue-500",
  tiktok: "bg-cyan-500",
};

export const PLATFORM_LABELS: Record<string, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  x: "X (Twitter)",
  facebook: "Facebook",
  tiktok: "TikTok",
};
