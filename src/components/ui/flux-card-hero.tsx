"use client";

import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import Link from 'next/link';

export default function MinimalHero() {
  const [currentCard, setCurrentCard] = useState(0);

  const cardConfigs = [
    {
      bgColor: 'bg-green-400',
      content: {
        type: 'greeting',
        greeting: 'Hi again, James. How can I help you?',
        subtitle: 'What else do you want to know?'
      }
    },
    {
      bgColor: 'bg-blue-400',
      content: {
        type: 'analytics',
        greeting: 'Performance Analytics',
        subtitle: 'AI Usage This Month'
      }
    },
    {
      bgColor: 'bg-purple-400',
      content: {
        type: 'projects',
        title: 'Active Projects',
        subtitle: 'Your AI Workflows'
      }
    },
    {
      bgColor: 'bg-yellow-300',
      content: {
        type: 'chat-history'
      }
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % cardConfigs.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentConfig = cardConfigs[currentCard];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 w-full overflow-hidden relative flex flex-col justify-between p-6 md:p-12 text-white">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Navigation */}
      <div className="w-full max-w-6xl mx-auto z-50">
        <nav className="bg-slate-900/60 backdrop-blur-md rounded-2xl px-6 py-3 shadow-lg border border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-extrabold shadow-lg">
              S
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                SocialAI
              </span>
              <span className="text-[9px] block text-slate-400 font-bold uppercase tracking-widest leading-none">Mysh.ai Engine</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#benefits" className="hover:text-white transition-colors">Benefits</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <Link href="/login">
            <ButtonWrapper className="bg-white text-slate-900 hover:bg-slate-100 px-4 py-2.5 rounded-xl font-bold flex items-center space-x-1.5 text-xs transition-all duration-200 active:scale-95 shadow-lg">
              <span>Sign In</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </ButtonWrapper>
          </Link>
        </nav>
      </div>

      {/* Hero Content */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 px-6 pt-24 pb-16 max-w-6xl w-full mx-auto relative z-10">
        {/* Main Heading */}
        <div className="text-left space-y-6 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/50 border border-purple-800/30 text-xs text-purple-300 font-bold tracking-wide shadow-inner">
            <Zap className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>Next-Generation Automated Marketing</span>
          </div>

          <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white leading-tight tracking-tight">
            AI Reimagined, <br />
            Social Automation <br />
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">Amplified.</span>
          </h1>
          
          <p className="text-sm md:text-base font-medium text-slate-400 leading-relaxed">
            Crafting intelligent solutions that turn your brand into a high-converting machine. Automate calendars, generate custom hooks, replies, and renew OAuth tokens cleanly.
          </p>

          {/* CTA Button */}
          <div className="pt-2">
            <Link href="/register">
              <ButtonWrapper className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-4 rounded-xl hover:shadow-xl hover:shadow-purple-950/20 flex items-center space-x-2 text-sm font-bold group shadow-lg glow-purple transition-all duration-300 transform active:scale-95">
                <span>Start Free Trial</span>
                <Zap className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </ButtonWrapper>
            </Link>
          </div>
        </div>

        {/* Animated Layered Cards Interface */}
        <div className="relative w-full max-w-md h-80 shrink-0 select-none">
          {/* Background Cards with staggered animations */}
          <div className="absolute inset-0 transform rotate-3 scale-95 transition-all duration-1000 ease-in-out">
            <div className={`w-full h-full bg-orange-500 rounded-3xl shadow-2xl opacity-20 transition-all duration-1000 ${currentCard === 1 ? 'scale-105 opacity-40' : ''}`} />
          </div>
          <div className="absolute inset-0 transform -rotate-2 scale-96 transition-all duration-1000 ease-in-out delay-300">
            <div className={`w-full h-full bg-purple-600 rounded-3xl shadow-2xl opacity-25 transition-all duration-1000 ${currentCard === 2 ? 'scale-105 opacity-45' : ''}`} />
          </div>
          <div className="absolute inset-0 transform rotate-1 scale-97 transition-all duration-1000 ease-in-out delay-500">
            <div className={`w-full h-full bg-pink-500 rounded-3xl shadow-2xl opacity-20 transition-all duration-1000 ${currentCard === 3 ? 'scale-105 opacity-40' : ''}`} />
          </div>
          <div className="absolute inset-0 transform -rotate-1 scale-98 transition-all duration-1000 ease-in-out delay-700">
            <div className={`w-full h-full bg-yellow-400 rounded-3xl shadow-2xl opacity-15 transition-all duration-1000 ${currentCard === 0 ? 'scale-105 opacity-35' : ''}`} />
          </div>

          {/* Main Animated Card */}
          <div className={`relative z-10 w-full h-full ${currentConfig.bgColor} rounded-3xl shadow-2xl p-6 flex flex-col transition-all duration-1000 ease-in-out transform hover:scale-[1.02] text-black`}>
            {/* Chat Interface */}
            <div className="bg-white/25 backdrop-blur-sm rounded-2xl p-5 flex-1 transition-all duration-500 overflow-hidden flex flex-col justify-between">
              {/* Chat Header */}
              <div className="flex items-center justify-between mb-3 shrink-0">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full transition-all duration-300 hover:scale-110" />
                  <div className="w-3 h-3 bg-yellow-400 rounded-full transition-all duration-300 hover:scale-110" />
                  <div className="w-3 h-3 bg-green-500 rounded-full transition-all duration-300 hover:scale-110" />
                </div>
                <span className="text-[10px] text-black/70 font-bold bg-white/30 px-2.5 py-1 rounded-full uppercase tracking-wider">AI Social Engine</span>
              </div>

              {/* Chat Content with Animation */}
              <div className="flex-1 flex flex-col justify-center text-left">
                {currentConfig.content.type === 'chat-history' ? (
                  // Chat History Interface
                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-bold text-black/90">Campaign Drafts</h3>
                      <div className="w-10 h-0.5 bg-white/60 rounded-full" />
                    </div>

                    <div className="space-y-2">
                      {/* Chat Item 1 */}
                      <div className="flex items-center space-x-2 p-2 bg-white/30 rounded-xl hover:bg-white/40 transition-all duration-200 cursor-pointer">
                        <div className="w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center shrink-0">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-black/90 truncate">Scale automation SaaS</div>
                          <div className="text-[9px] text-black/60 font-medium">10 mins ago</div>
                        </div>
                        <div className="text-[9px] text-black/60 font-bold bg-white/40 px-1.5 py-0.5 rounded-full">
                          Ready
                        </div>
                      </div>

                      {/* Chat Item 2 */}
                      <div className="flex items-center space-x-2 p-2 bg-white/30 rounded-xl hover:bg-white/40 transition-all duration-200 cursor-pointer">
                        <div className="w-7 h-7 bg-purple-500 rounded-lg flex items-center justify-center shrink-0">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-black/90 truncate">Autoreply 'pricing' rule</div>
                          <div className="text-[9px] text-black/60 font-medium">1 hour ago</div>
                        </div>
                        <div className="text-[9px] text-black/60 font-bold bg-white/40 px-1.5 py-0.5 rounded-full">
                          Active
                        </div>
                      </div>
                    </div>
                  </div>
                ) : currentConfig.content.type === 'projects' ? (
                  // Projects Interface workflow
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-black/90">Automated Pipeline</h3>
                      <div className="w-10 h-0.5 bg-white/60 rounded-full" />
                    </div>

                    <div className="bg-white/20 rounded-xl p-2.5">
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <div className="text-black/60 bg-white/40 px-2 py-0.5 rounded-full">OAuth Check</div>
                        <div className="text-green-600 font-extrabold animate-pulse">Running</div>
                      </div>

                      <div className="mt-3">
                        <div className="flex items-center justify-between space-x-2">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shadow-md">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <span className="text-[8px] font-bold text-black/70 mt-1">Webhook</span>
                          </div>

                          <div className="flex-1 h-0.5 bg-white/30 relative">
                            <div className="absolute -top-1 -right-0.5 w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                          </div>

                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center shadow-md">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M12 21v-1m-3.364-3.364l-.707-.707m2.828-2.828l.707-.707M11 13H7a4 4 0 00-4 4v2a2 2 0 002 2h14a2 2 0 002-2v-2a4 4 0 00-4-4h-4z" />
                              </svg>
                            </div>
                            <span className="text-[8px] font-bold text-black/70 mt-1">AI Processor</span>
                          </div>

                          <div className="flex-1 h-0.5 bg-white/30 relative">
                            <div className="absolute -top-1 -right-0.5 w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                          </div>

                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center shadow-md">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </div>
                            <span className="text-[8px] font-bold text-black/70 mt-1">Publisher</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : currentConfig.content.type === 'analytics' ? (
                  // Analysis Interface (Token Usage Dashboard)
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-black/90">Sync & Expiry Monitoring</h3>
                      <div className="w-10 h-0.5 bg-white/60 rounded-full" />
                    </div>

                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between mb-1 text-[10px] font-bold text-slate-800">
                          <span>OAuth API Rate Quota</span>
                          <span>14,280 / 50,000 reqs</span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2">
                          <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" style={{ width: '28.56%' }} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-left">
                        <div className="bg-white/20 rounded-xl p-2">
                          <div className="text-[8px] font-bold text-black/50 uppercase">Secured Keys</div>
                          <div className="text-sm font-extrabold text-black/90">AES-256</div>
                        </div>
                        <div className="bg-white/20 rounded-xl p-2">
                          <div className="text-[8px] font-bold text-black/50 uppercase">Auto Refreshes</div>
                          <div className="text-sm font-extrabold text-black/90">Active</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Regular Chat Interface
                  <div className="space-y-2 transition-all duration-500 text-left">
                    <p className="text-base font-extrabold text-black/90">
                      {currentConfig.content.greeting}
                    </p>
                    <p className="text-xs text-black/75 font-semibold leading-relaxed">
                      {currentConfig.content.subtitle}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom indicators */}
              <div className="flex justify-center space-x-1.5 shrink-0 pt-2 border-t border-black/10">
                {cardConfigs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCard(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentCard === index ? 'bg-black scale-125' : 'bg-black/25 hover:bg-black/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicator dots navigation */}
      <div className="w-full max-w-6xl mx-auto flex justify-between items-center text-[10px] font-bold text-slate-500 tracking-wider uppercase border-t border-slate-900/50 pt-8 mt-12 z-10">
        <span>© 2026 SocialAI platform. Built on standard React hooks structures.</span>
        <span>Secure Standard OAuth 2.0 Integration</span>
      </div>
    </div>
  );
}

// Internal small wrapper for standard buttons
const ButtonWrapper = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={className}
    {...props}
  />
));
ButtonWrapper.displayName = "ButtonWrapper";
