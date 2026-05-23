"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (plan: "creator" | "team" | "agency") => {
    setLoading(true);
    setError("");
    try {
      // Auto register/login high premium demo account
      const registerRes = await fetch("/api/auth/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await registerRes.json();
      
      if (registerRes.ok) {
        const res = await signIn("credentials", {
          email: data.email,
          password: "demopassword123",
          redirect: false,
        });
        if (res?.error) {
          setError("Failed to authenticate demo user.");
        } else {
          router.push(callbackUrl);
          router.refresh();
        }
      } else {
        setError(data.message || "Failed to create demo account.");
      }
    } catch (err) {
      setError("Failed to launch quick demo account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950 via-slate-950 to-black p-4 relative overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 items-center justify-center text-white shadow-xl glow-purple mb-2 animate-bounce">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Welcome back to SocialAI
          </h1>
          <p className="text-sm text-slate-400">
            Secure, fully automated multi-channel social management
          </p>
        </div>

        <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white text-lg">Login to Account</CardTitle>
            <CardDescription className="text-slate-400">
              Enter your credentials to access your console
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleCredentialsLogin}>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-950/40 border border-red-900/50 text-red-300 text-xs font-medium">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-300">Password</Label>
                  <Link
                    href="#"
                    className="text-xs text-purple-400 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600"
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg glow-purple"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  "Login"
                )}
              </Button>

              <div className="relative w-full flex items-center justify-center my-2">
                <hr className="w-full border-slate-800" />
                <span className="absolute bg-slate-900 px-3 text-xs text-slate-500 uppercase tracking-widest">
                  Quick Demo Accounts
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 w-full">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={loading}
                  onClick={() => handleDemoLogin("creator")}
                  className="border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white text-[11px] px-1 h-9 rounded-lg"
                >
                  Creator Demo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={loading}
                  onClick={() => handleDemoLogin("team")}
                  className="border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white text-[11px] px-1 h-9 rounded-lg"
                >
                  Team Demo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={loading}
                  onClick={() => handleDemoLogin("agency")}
                  className="border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white text-[11px] px-1 h-9 rounded-lg"
                >
                  Agency Demo
                </Button>
              </div>

              <p className="text-center text-xs text-slate-400 mt-2">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-purple-400 hover:underline font-semibold"
                >
                  Register here
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
