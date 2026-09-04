"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cpu, Bot, Database, CheckCircle, Shield, Zap, Sparkles } from "lucide-react"
import { Badge } from "../ui/badge"

const layers = [
  {
    id: "layer-1",
    title: "1. Deterministic Behavioral Engine",
    short: "Deterministic Engine",
    icon: Cpu,
    tag: "15+ METRICS",
    description:
      "A pure computational rule engine that evaluates raw trade logs against 12 psychological error patterns without AI hallucinations.",
    highlights: [
      "12 Pattern Detectors: Revenge trading, FOMO entries, post-win risk creep, overtrading, and premature exit anxiety",
      "Discipline & Alignment Scoring: 0-100 algorithmic score based on planned vs executed risk/reward ratios",
      "Session Correlation Engine: Win rate and PnL breakdown across London, New York, Asian, and Overlap sessions",
      "Strict Rule Enforcement: Real-time warnings when maximum daily drawdown or risk limits are breached",
    ],
    codeSnippet: `// Deterministic Pattern Detector
function detectRevengeTrading(trades: Trade[]): RiskAlert | null {
  const lastLoss = trades.findLast(t => t.pnl < 0);
  if (!lastLoss) return null;

  const quickReEntry = trades.find(t => 
    t.entryTime - lastLoss.exitTime < 180_000 && // < 3 mins
    t.lotSize > lastLoss.lotSize * 1.5           // Scaled risk
  );

  return quickReEntry ? {
    type: 'REVENGE_TRADING',
    severity: 'CRITICAL',
    penalty: -25
  } : null;
}`,
  },
  {
    id: "layer-2",
    title: "2. GPT-4o Behavioral Coach Layer",
    short: "GPT-4o Coaching",
    icon: Bot,
    tag: "COACH SYNTHESIS",
    description:
      "An LLM reasoning layer that converts raw analytics into empathetic, actionable coaching reports—strictly preventing any market prediction or trading signals.",
    highlights: [
      "Weekly & Monthly Coach Reports: Synthesizes trader psychology into structured action items",
      "Pre-Trade Alignment Warnings: Instant feedback before entering positions",
      "Full Context-Injected Chat: Interactive AI coach holding complete session and metric history",
      "Zero Market Signals: Guaranteed by prompt boundary architecture to only analyze the human, not the market",
    ],
    codeSnippet: `// Context-Injected Coach Synthesis
export async function generateCoachReport(metrics: TraderMetrics) {
  const systemPrompt = \`
You are a senior trading psychology coach. 
Analyze the trader's behavioral metrics. 
NEVER give financial advice or market signals.
Trader Discipline Score: \${metrics.disciplineScore}/100
Detected Biases: \${metrics.detectedPatterns.join(', ')}
\`;

  return await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "system", content: systemPrompt }],
    temperature: 0.3,
  });
}`,
  },
  {
    id: "layer-3",
    title: "3. Supabase & MetaAPI Pipeline",
    short: "Data & Security",
    icon: Database,
    tag: "ROW LEVEL SECURITY",
    description:
      "End-to-end type-safe data pipeline syncing live broker feeds into an encrypted PostgreSQL database with user-isolated RLS.",
    highlights: [
      "MetaAPI Live Broker Sync: Real-time MT4/MT5 trade execution sync with zero manual logging required",
      "11-Table PostgreSQL Schema: User-isolated multi-tenant tables with Supabase Row Level Security",
      "Free-Stack Zero-Cost Architecture: Engineered to run completely on free tier (Vercel + Supabase + MetaAPI)",
      "Instant Guest Demo Mode: Pre-seeded realistic trades for zero-friction one-click trial",
    ],
    codeSnippet: `-- Row Level Security Policy
ALTER TABLE public.trade_journals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own trade data"
ON public.trade_journals
FOR ALL
USING (auth.uid() = user_id);`,
  },
]

export function ArchitectureExplorer() {
  const [activeTab, setActiveTab] = useState(layers[0].id)
  const currentLayer = layers.find((l) => l.id === activeTab) || layers[0]

  return (
    <div className="glass-card overflow-hidden border border-border rounded-2xl dark:border-white/[0.12]">
      {/* Explorer Header / Tab Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-4 border-b border-border bg-muted/60 dark:border-white/[0.08] dark:bg-black/40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground tracking-tight">System Architecture Explorer</h4>
            <p className="text-[11px] font-mono text-muted-foreground">TraderMind Two-Layer AI Pipeline</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-card border border-border dark:bg-white/[0.04] dark:border-white/[0.08]">
          {layers.map((layer) => (
            <button
              key={layer.id}
              onClick={() => setActiveTab(layer.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-[background-color,color,border-color,box-shadow] duration-150 ease-out-custom ${
                activeTab === layer.id
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <layer.icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline-block">{layer.short}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Explorer Body */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLayer.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="p-6 md:p-8 space-y-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="accent">{currentLayer.tag}</Badge>
                <span className="text-xs font-mono text-muted-foreground">PRODUCTION ARCHITECTURE</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">{currentLayer.title}</h3>
            </div>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
            {currentLayer.description}
          </p>

          <div className="grid lg:grid-cols-12 gap-6 items-start">
            {/* Highlights List */}
            <div className="lg:col-span-6 space-y-2.5">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                Core Capabilities & Architecture
              </div>
              {currentLayer.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/40 border border-border text-xs text-foreground/90 dark:bg-white/[0.02] dark:border-white/[0.06] dark:text-zinc-300">
                  <CheckCircle className="h-4 w-4 text-emerald-500 dark:text-emerald-400 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            {/* Code / Configuration Snippet */}
            <div className="lg:col-span-6">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Implementation Reference</span>
                <span className="text-primary text-[10px]">TypeScript / SQL</span>
              </div>
              <pre className="p-4 rounded-xl bg-zinc-950 dark:bg-black/70 border border-border dark:border-white/[0.08] font-mono text-[11px] text-zinc-300 overflow-x-auto leading-relaxed shadow-inner">
                <code>{currentLayer.codeSnippet}</code>
              </pre>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
