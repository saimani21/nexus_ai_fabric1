
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import {
  Cpu,
  GitBranch,
  ShieldCheck,
  Workflow,
  Database,
  LineChart,
  Building2,
  Zap,
  Rocket,
  Boxes,
  BookOpen,
  ArrowRight,
  Sparkles,
  Layers as LayersIcon,
  GitBranch as Branch,
} from 'lucide-react';

// Animation objects (no functions inside to avoid RSC serialization issues)
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const glowBorder =
  'relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.05)]';

/** Layers carousel **/
function LayerCarousel() {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const cards = [
    {
      key: 'ingestion',
      title: 'Data Ingestion',
      short: 'Securely connect and ingest at scale.',
      details: [
        'Pre‑built connectors for lakes, DBs, APIs, files',
        'Batch & streaming ingestion with schema hints',
        'Policy‑aware ETL and PII redaction',
      ],
      icon: Database,
    },
    {
      key: 'graph',
      title: 'Quality LLM‑Based Graph DB Creation',
      short: 'LLM‑assisted knowledge graph construction.',
      details: [
        'Ontology definition & entity/relationship extraction',
        'Human‑in‑the‑loop validation workflow',
        'Grounded context for retrieval and reasoning',
      ],
      icon: GitBranch,
    },
    {
      key: 'embedding',
      title: 'Embedding Layer',
      short: 'High‑quality embeddings for retrieval.',
      details: [
        'Multi‑model embedding support & re‑indexing',
        'Domain‑specific chunking & hybrid search',
        'Drift monitoring and refresh policies',
      ],
      icon: Boxes,
    },
    {
      key: 'LLM',
      title: 'LLM Serving',
      short: 'Low‑latency, cost‑efficient inference.',
      details: [
        'Optimized batching, caching, routing',
        'Bring‑your‑own models or Nexus‑optimized',
        'Autoscale & failover with observability',
      ],
      icon: Cpu,
    },
    {
      key: 'mcp',
      title: 'MCP Tooling & Agent Classifier',
      short: 'Selects the right agent from natural language.',
      details: [
        'Natural‑language intent classification',
        'Tool/agent selection with guardrails',
        'Unified connectors & SDK for actions',
      ],
      icon: Workflow,
    },
    {
      key: 'finops',
      title: 'FinOps Dashboard',
      short: 'Spend, latency, and usage in one place.',
      details: [
        'Budgets, alerts, and anomaly detection',
        'Per‑team and per‑agent breakdowns',
        'Recommendations for routing & model choice',
      ],
      icon: LineChart,
    },
  ];

  // Auto-rotation effect
  React.useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActive((prev) => (prev + 1) % cards.length);
      }, 4000); // Change every 4 seconds
      timerRef.current = interval;
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isHovered, cards.length]);

  return (
    <div className="mt-10">
      {/* Icons Row */}
      <div className="mb-8">
        <div 
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {cards.map((c, i) => (
            <motion.button
              key={c.key}
              whileHover={{ 
                scale: 1.05,
                y: -4,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setActive(i)}
              className={`${glowBorder} shrink-0 snap-start w-[260px] p-5 text-left transition border-2 ${
                active === i ? 'border-cyan-400/60' : 'border-white/10'
              }`}
              aria-pressed={active === i}
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                <c.icon className="h-5 w-5 text-cyan-300" />
              </div>
              <div className="font-medium">{c.title}</div>
              <div className="mt-1 text-sm text-white/70">{c.short}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content Row - Information and Image */}
      <div className="grid gap-8 lg:grid-cols-2 items-stretch">
        {/* Left Column - Information */}
        <motion.div
          key={cards[active].key}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className={`${glowBorder} p-8 flex flex-col justify-center`}
        >
          <h3 className="text-2xl font-semibold mb-6">{cards[active].title}</h3>
          <ul className="space-y-4 text-base text-white/80">
            {cards[active].details.map((detail, index) => (
              <li key={index} className="flex gap-3 items-start">
                <ArrowRight className="mt-1 h-5 w-5 text-cyan-300 flex-shrink-0" /> 
                <span className="leading-relaxed">{detail}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right Column - Image Space */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`${glowBorder} p-6`}
        >
          <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-center justify-center overflow-hidden">
            {/* Fallback placeholder - always show since images don't exist */}
            <div className="flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-400/20 flex items-center justify-center">
                {React.createElement(cards[active].icon, { className: "h-8 w-8 text-cyan-300" })}
              </div>
              <p className="text-white/60 text-sm mb-2">{cards[active].title}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/** Ontology Agent spotlight **/
function OntologyAgentSpotlight() {
  return (
    <section id="ontology-agent" className="py-16 bg-white/2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold tracking-tight">Ontology Management — Your Knowledge Fabric</h2>
          <p className="mt-3 text-white/70">
            Our Ontology Management System turns raw, messy enterprise data into a governed knowledge graph—auto‑discovering entities &
            relations, aligning them to your domain schema, and powering reliable retrieval & reasoning for every agent.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 items-center">
          {/* Diagram / image card */}
          <div className={`${glowBorder} p-5`}>
            {/* Elegant inline SVG so you have a good default visual without assets */}
            <div className="rounded-xl bg-white/5 p-4">
              <svg viewBox="0 0 600 340" className="w-full h-auto">
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                {/* Input nodes */}
                <g>
                  <circle cx="70" cy="70" r="20" fill="url(#grad)" opacity="0.7" />
                  <circle cx="70" cy="170" r="20" fill="url(#grad)" opacity="0.7" />
                  <circle cx="70" cy="270" r="20" fill="url(#grad)" opacity="0.7" />
                  <text x="40" y="40" fill="#9ca3af" fontSize="12">
                    Docs / DB / APIs
                  </text>
                </g>
                {/* Ontology layer rectangle */}
                <rect x="170" y="40" width="260" height="260" rx="16" ry="16" fill="#0f172a" stroke="#334155" />
                <text x="300" y="65" textAnchor="middle" fill="#e2e8f0" fontSize="14">
                  Ontology Management
                </text>
                {/* Graph nodes inside */}
                <g stroke="#22d3ee" strokeWidth="1.5">
                  <line x1="220" y1="140" x2="300" y2="100" />
                  <line x1="300" y1="100" x2="360" y2="160" />
                  <line x1="300" y1="100" x2="260" y2="200" />
                </g>
                <g fill="#22d3ee">
                  <circle cx="220" cy="140" r="6" />
                  <circle cx="300" cy="100" r="8" />
                  <circle cx="360" cy="160" r="6" />
                  <circle cx="260" cy="200" r="6" />
                </g>
                <text x="300" y="300" textAnchor="middle" fill="#94a3b8" fontSize="12">
                  Entities • Relations • Policies
                </text>
                {/* Output arrows */}
                <g stroke="#8b5cf6" strokeWidth="2">
                  <line x1="430" y1="100" x2="530" y2="100" />
                  <line x1="430" y1="180" x2="530" y2="180" />
                  <line x1="430" y1="260" x2="530" y2="260" />
                </g>
                <g fill="#8b5cf6">
                  <polygon points="530,100 540,100 535,95" />
                  <polygon points="530,180 540,180 535,175" />
                  <polygon points="530,260 540,260 535,255" />
                </g>
                <text x="460" y="90" fill="#9ca3af" fontSize="12">
                  RAG & Search
                </text>
                <text x="460" y="170" fill="#9ca3af" fontSize="12">
                  Reasoning Agents
                </text>
                <text x="460" y="250" fill="#9ca3af" fontSize="12">
                  Analytics
                </text>
              </svg>
            </div>
            
          </div>

          {/* Copy / bullets */}
          <div className={`${glowBorder} p-6`}>
            <h3 className="text-xl font-semibold">What it does</h3>
            <ul className="mt-3 space-y-3 text-sm text-white/80">
              <li className="flex gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 text-cyan-300" /> Auto‑discovers entities, relations, and synonyms across
                documents & systems.
              </li>
              <li className="flex gap-2">
                <GitBranch className="mt-0.5 h-4 w-4 text-cyan-300" /> Aligns to your domain ontology; maintains consistency as
                schemas evolve.
              </li>
              <li className="flex gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-cyan-300" /> Applies policies & access control at the node/edge level for
                safe retrieval.
              </li>
              <li className="flex gap-2">
                <Workflow className="mt-0.5 h-4 w-4 text-cyan-300" /> Feeds Workspace workflows and the MCP classifier with
                structured context.
              </li>
            </ul>
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-white/70">
              <div className="rounded-lg border border-white/10 p-3 bg-white/5">📦 20+ connectors</div>
              <div className="rounded-lg border border-white/10 p-3 bg-white/5">🧠 HITL curation</div>
              <div className="rounded-lg border border-white/10 p-3 bg-white/5">🔎 Hybrid retrieval</div>
              <div className="rounded-lg border border-white/10 p-3 bg-white/5">🔐 Row/edge ACLs</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  const [solutionsOpen, setSolutionsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSolutionsOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <main className="min-h-screen bg-[#0b1020] text-white selection:bg-cyan-300/40">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-[#0b1020]/60 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-violet-400 grid place-items-center shadow-lg shadow-cyan-500/20">
              <Branch className="h-5 w-5" />
            </div>
            <span className="font-semibold tracking-tight">
              Nexus <span className="text-cyan-300">AI</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            {/* Solutions Dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
            >
              <button
                className="hover:text-white flex items-center gap-1"
                aria-haspopup="true"
                aria-expanded={solutionsOpen}
                onClick={() => setSolutionsOpen((prev) => !prev)}
                type="button"
              >
                Solutions
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {solutionsOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-xl bg-[#181e36] border border-white/10 shadow-lg z-50">
                  <a
                    href="#platform"
                    onClick={() => setSolutionsOpen(false)}
                    className="block px-4 py-2 hover:bg-cyan-400/10 text-white/90 rounded-b-xl"
                  >
                    NexusAI Platform
                  </a>
                  <a
                    href="#ontology-agent"
                    onClick={() => setSolutionsOpen(false)}
                    className="block px-4 py-2 hover:bg-cyan-400/10 text-white/90 rounded-t-xl"
                  >
                    Ontology Management
                  </a>
                  <a
                    href="#mcp"
                    onClick={() => setSolutionsOpen(false)}
                    className="block px-4 py-2 hover:bg-cyan-400/10 text-white/90 rounded-t-xl"
                  >
                    Agent Blueprints
                  </a>
                  <a
                    href="#finops"
                    onClick={() => setSolutionsOpen(false)}
                    className="block px-4 py-2 hover:bg-cyan-400/10 text-white/90 rounded-t-xl"
                  >
                    FinOps & Monitoring
                  </a>
                  <a
                    href="#layers"
                    onClick={() => setSolutionsOpen(false)}
                    className="block px-4 py-2 hover:bg-cyan-400/10 text-white/90 rounded-t-xl"
                  >
                    Guardrails & Policies
                  </a>
                </div>
              )}
            </div>
            <a href="#ontology-agent" className="hover:text-white">
              Ontology Management
            </a>
                        {/* <a href="#mcp" className="hover:text-white">
              MCP
            </a> */}
            <a href="#integrate" className="hover:text-white">
              Quickstart
            </a>
            <a href="#solutions" className="hover:text-white">
              Marketplace
            </a>
            <a href="#pricing" className="hover:text-white">
              Pricing
            </a>
          </nav>
          <div className="flex items-center gap-3">
            {/* <a className="text-sm text-white/70 hover:text-white" href="#login">
              Login
            </a> */}
            <a
              href="/demo"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-400/90 px-4 py-2 text-sm font-medium text-[#0b1020] hover:bg-cyan-300 transition"
            >
              Book a Demo <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_0%,#000_20%,transparent_70%)]">
          <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute -top-10 left-1/3 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />
        </div>
        <div className="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="mx-auto max-w-10xl text-center">
            {/* <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <ShieldCheck className="h-3.5 w-3.5" /> Deploy on your cloud • AWS • Azure • GCP
            </p> */}
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl h-24 sm:h-32">
              The <span className="text-cyan-300">Enterprise AI Acceleration</span> Platform
              <br />
              <span className="text-2xl sm:text-4xl font-normal">
                <TypeAnimation
                  sequence={[
                    'Nexus AI : Where Data Becomes Decisions',
                    2000,
                    'Connect, Customize & Scale AI with Confidence',
                    2000,
                    'Seamless Integration, Smarter Cost Control',
                    2000,
                    'Workflows for People, Not Just Machines',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </span>
            </h1>
            <br />
              {/* Nexus is a model & cloud agnostic fabric to ingest data, compose agents, and operate them securely at scale. */}
            <p className="mt-5 text-lg text-white/75">
            Nexus AI empowers every developer to build AI-native workflows with built-in guardrails, governance, and FinOps—across any data, any model, anywhere.            </p>
            <br />
            
            <br />
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center text-3xl font-semibold tracking-tight"
          >
            Integrate  •  Scale  •  Operate  •  Compose
          </motion.h2>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Integrate Seamlessly',
                desc: 'Connect Data Silos across ERP, CRM & Data sources. Pre‑built connectors and pipelines.',
                icon: BookOpen,
              },
              {
                title: 'Auto-Tune Ontology',
                desc: 'Auto-discover entities & relations. Governed knowledge graph for reliable retrieval.',
                icon: ShieldCheck,
              },
              {
                title: 'Launch in Weeks',
                desc: 'Launch AI agents and APIs in weeks, not years—secure, explainable, and cost-optimized.',
                icon: Workflow,
              },
              {
                title: 'Operate at Scale',
                desc: 'Enterprise-grade governance, FinOps controls, and real-time observability built in.',
                icon: ShieldCheck,
              }
            ].map((card, i) => (
              <motion.div
                key={card.title}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`${glowBorder} p-6`}
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                  <card.icon className="h-5 w-5 text-cyan-300" />
                </div>
                <h3 className="text-lg font-medium">{card.title}</h3>
                <p className="mt-2 text-sm text-white/70">{card.desc}</p>
              </motion.div>
            ))}
          </div>
            <br />
        </div>


            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="/demo" className="rounded-xl bg-white text-[#0b1020] px-5 py-3 font-medium hover:bg-white/90 transition">
                Book a Demo
              </a>
              <a
                href="#workspace"
                className="rounded-xl border border-white/15 px-5 py-3 font-medium text-white/90 hover:bg-white/5 transition"
              >
                See the Workspace
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Architecture */}
      {/* <section id="layers" className="py-16 bg-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-semibold tracking-tight">Nexus Architecture Layers</h2>
          <p className="mt-3 text-center text-white/70 max-w-3xl mx-auto">
            A unified fabric that turns raw data into governed, cost‑efficient, production agents. Explore each layer below.
          </p>
          
          <LayerCarousel />
        </div>
      </section> */}

      {/* Platform pillars */}
      {/* <section id="platform" className="py-16 bg-gradient-to-b from-white/3 to-white/8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center text-3xl font-semibold tracking-tight"
          >
            Integrate  •  Scale  •  Operate  •  Compose
          </motion.h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Integrate the Right Tools',
                desc: 'Ontology Crawler, connectors, and ingestion pipelines build a knowledge fabric for grounded responses.',
                icon: BookOpen,
              },
              {
                title: 'Operate at Scale',
                desc: 'Governance, access control, observability, auto‑scaling & failover with FinOps guardrails.',
                icon: ShieldCheck,
              },
              {
                title: 'Compose End‑to‑End',
                desc: 'Visual Workspace and SDK to design agents, publish secure APIs, and automate outputs.',
                icon: Workflow,
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`${glowBorder} p-6`}
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                  <card.icon className="h-5 w-5 text-cyan-300" />
                </div>
                <h3 className="text-lg font-medium">{card.title}</h3>
                <p className="mt-2 text-sm text-white/70">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Ontology Agent (spotlight) */}
      <OntologyAgentSpotlight />

      {/* MCP Example */}
      <section id="mcp" className="py-16 bg-gradient-to-b from-white/4 to-white/6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Centered Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold tracking-tight">Agent Blueprints</h2>
            <p className="mt-3 text-white/70 max-w-3xl mx-auto">
              Quickly compose, customize, and deploy AI agents using secure, governed blueprints that scale across data and models.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid gap-8 md:grid-cols-2 items-start">
            <div>
            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex gap-3">
                <Sparkles className="h-5 w-5 text-cyan-300" />
                <div>
                  <strong>Intelligent Tool Classification</strong>
                  <br />Chooses agents & tools from natural‑language prompts.
                </div>
              </li>
              <li className="flex gap-3">
                <Workflow className="h-5 w-5 text-cyan-300" />
                <div>
                  <strong>Smart Orchestrator</strong>
                  <br />Combines retrieval, analytics, and actions when needed.
                </div>
              </li>
              <li className="flex gap-3">
                <LayersIcon className="h-5 w-5 text-cyan-300" />
                <div>
                  <strong>Guardrails & Policies</strong>
                  <br />Respect data access and safety constraints at runtime.
                </div>
              </li>
            </ul>
            </div>
            <div className={`${glowBorder} p-6`}>
            <h3 className="text-lg font-medium mb-4">MCP in Action</h3>
            <div className="space-y-4 text-sm">
              <div className="rounded-lg bg-white/5 p-3">
                  <span className="text-cyan-300 font-semibold">Query:</span> &quot;Label risk for transaction #12345&quot;
                <br />
                <span className="text-xs text-white/60">→ Routes to Knowledge Graph tool</span>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <span className="text-cyan-300 font-semibold">Query:</span> &quot;Hi, how are you?&quot;
                <br />
                <span className="text-xs text-white/60">→ Conversational; avoids unnecessary tool calls</span>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <span className="text-cyan-300 font-semibold">Query:</span> &quot;Generate fraud detection report for Q4&quot;
                <br />
                <span className="text-xs text-white/60">→ Orchestrates data + analytics + report generation</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
      {/* FinOps */}
      <section id="finops" className="py-16 bg-white/4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Centered Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold tracking-tight">FinOps Dashboard</h2>
            <p className="mt-3 text-white/70 max-w-3xl mx-auto">
              Track cost, latency, and usage across models, agents, and teams. Set budgets and alerts; route requests for optimal spend.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <motion.div 
              initial="hidden" 
              whileInView="show" 
              viewport={{ once: true }} 
              variants={fadeUp}
            >
              <ul className="space-y-4 text-sm text-white/80">
                <li className="flex items-start gap-3">
                  <LineChart className="mt-0.5 h-5 w-5 text-cyan-300" /> 
                  <span>Centralized observability & anomaly detection.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="mt-0.5 h-5 w-5 text-cyan-300" /> 
                  <span>Autoscale & failover for reliability.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Building2 className="mt-0.5 h-5 w-5 text-cyan-300" /> 
                  <span>Per‑team governance & access control.</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`${glowBorder} p-2`}
            >
              {/* Image Container */}
              <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-center justify-center overflow-hidden">
                <img 
                  src="/finops-dashboard.png" 
                  alt="FinOps Dashboard Preview" 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrate section */}
      <section id="integrate" className="py-16 bg-gradient-to-b from-white/6 to-white/3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-semibold tracking-tight">Quickstart with NexusAI</h2>
          <p className="mt-3 text-center text-white/70 max-w-3xl mx-auto">
            SDK scaffolding, OpenAI‑compatible endpoints, and security tokens plug into existing apps with minimal boilerplate.
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-2 items-start">
            <div className={`${glowBorder} p-6`}>
              <h3 className="text-lg font-medium">Nexus SDK Installation</h3>
              <pre className="mt-4 rounded-xl bg-black/60 p-4 text-sm leading-6 text-white/90 overflow-x-auto">{`# Install SDK and dependencies
pip install nexus-ai-sdk

# Initialize new project
nexus init my-ai-project

# Start with RAG template
nexus template rag`}</pre>
            </div>
            <div className={`${glowBorder} p-6`}>
              <ul className="space-y-6">
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 h-9 w-9 rounded-xl bg-white/5 grid place-items-center">
                    <Cpu className="h-5 w-5 text-cyan-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Automated Scaffolding</h3>
                    <p className="text-sm text-white/70">Generates project structure & config—no manual setup.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 h-9 w-9 rounded-xl bg-white/5 grid place-items-center">
                    <BookOpen className="h-5 w-5 text-cyan-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Pre‑Built Templates</h3>
                    <p className="text-sm text-white/70">Kick off with RAG, fraud detection, knowledge management.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 h-9 w-9 rounded-xl bg-white/5 grid place-items-center">
                    <Workflow className="h-5 w-5 text-cyan-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Turnkey Integration</h3>
                    <p className="text-sm text-white/70">OpenAI‑compatible endpoints & tokens drop into existing flows.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 h-9 w-9 rounded-xl bg-white/5 grid place-items-center">
                    <LineChart className="h-5 w-5 text-cyan-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Built‑in FinOps</h3>
                    <p className="text-sm text-white/70">Budgets, anomalies & routing recommendations.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

                  </div>
      </section>


      {/* Use Case Spotlight */}
      <section id="use-case" className="py-16 bg-gradient-to-b from-white/3 to-white/6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm text-cyan-300 font-medium mb-4">USE CASE SPOTLIGHT</p>
            <h2 className="text-3xl font-semibold tracking-tight">Building a Fraud Detection Agent</h2>
            <p className="mt-3 text-white/70 max-w-3xl mx-auto">
              See how Nexus AI transforms complex fraud detection from months of development into a production-ready agent in days.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 items-start">
            {/* Left Side - Building Process Steps */}
            <div className="space-y-6">
              {/* Step 1 */}
              <div className={`${glowBorder} p-6`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-400/20 flex items-center justify-center">
                    <span className="text-cyan-300 font-semibold text-sm">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Data Ingestion</h3>
                    <p className="text-white/70 text-sm mb-3">
                      1.2 million transaction records ingested, versioned, and enriched with embeddings.
                    </p>
                    <div className="bg-cyan-400/10 border border-cyan-400/20 rounded-lg p-3">
                      <p className="text-cyan-300 text-xs font-medium">
                        Performance: Processed in 24 minutes with real-time embeddings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className={`${glowBorder} p-6`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-400/20 flex items-center justify-center">
                    <span className="text-green-300 font-semibold text-sm">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Knowledge Context</h3>
                    <p className="text-white/70 text-sm mb-3">
                      Financial documents fed into the Ontology Layer to create structured knowledge base.
                    </p>
                    <div className="bg-green-400/10 border border-green-400/20 rounded-lg p-3">
                      <p className="text-green-300 text-xs font-medium">
                        Result: Automated knowledge graph with human-in-the-loop validation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className={`${glowBorder} p-6`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-400/20 flex items-center justify-center">
                    <span className="text-violet-300 font-semibold text-sm">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Intelligent Action</h3>
                    <p className="text-white/70 text-sm mb-3">
                      MCP tool orchestrates which tool to use for specific fraud detection queries.
                    </p>
                    <div className="bg-violet-400/10 border border-violet-400/20 rounded-lg p-3">
                      <p className="text-violet-300 text-xs font-medium">
                        Intelligence: Automatic routing to Graph DB, Analytics, or Report tools.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className={`${glowBorder} p-6`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-400/20 flex items-center justify-center">
                    <span className="text-orange-300 font-semibold text-sm">4</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Production Agent</h3>
                    <p className="text-white/70 text-sm mb-3">
                      Finished fraud agent accessible via Nexus chat service with semantic search capabilities.
                    </p>
                    <div className="bg-orange-400/10 border border-orange-400/20 rounded-lg p-3">
                      <p className="text-orange-300 text-xs font-medium">
                        Capability: Answers specific questions using semantic search + knowledge graph.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Fraud Detection Agent Demo */}
            <div className={`${glowBorder} p-6 bg-white/5`}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <h3 className="text-lg font-semibold">Fraud Detection Agent Demo</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-cyan-400/10 border border-cyan-400/20 rounded-lg p-3">
                  <p className="text-cyan-300 text-xs font-medium mb-1">Query:</p>
                  <code className="text-white text-sm">
                    &quot;Analyze transaction #TX-789123 for fraud indicators&quot;
                  </code>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-red-400 font-semibold">Risk Level: HIGH</span>
                  </div>
                  
                  <p className="text-white/80 text-sm">Multiple fraud indicators detected:</p>
                  
                  <ul className="space-y-1 text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>Unusual spending pattern (3x normal amount)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>New merchant category (gambling)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>Geographic anomaly (location 2000+ miles from home)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>Time-based risk (3 AM transaction)</span>
                    </li>
                  </ul>
                  
                  <div className="pt-2 border-t border-white/10">
                    <p className="text-xs text-white/60">
                      Confidence: 94% | Data Sources: 1.2M transactions, Knowledge Graph
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions & SDK */}
      <section id="solutions" className="py-16 bg-gradient-to-b from-white/5 to-white/7">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-semibold tracking-tight">Agents Marketplace & SDK</h2>
          <p className="mt-3 text-center text-white/70 max-w-3xl mx-auto">
            Start with proven templates, customize with the Nexus SDK, and publish secure endpoints instantly.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { title: 'Fraud Investigation', desc: 'Anomaly detection and case packets.', icon: ShieldCheck },
              { title: 'FinOps Co‑Pilot', desc: 'Forecast, quotas, and routing.', icon: LineChart },
              { title: 'Knowledge Fabric', desc: 'Org‑wide RAG over ontology.', icon: BookOpen },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`${glowBorder} p-6`}
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                  <c.icon className="h-5 w-5 text-cyan-300" />
                </div>
                <h3 className="text-lg font-medium">{c.title}</h3>
                <p className="mt-2 text-sm text-white/70">{c.desc}</p>
                <button className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs hover:bg-white/5">
                  View Template <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="py-16 bg-gradient-to-b from-white/7 to-white/2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">From data to deployed agents—in days.</h2>
          <p className="mt-3 text-white/70 max-w-2xl mx-auto">
            Deploy in your cloud with VPC isolation. Bring your own models or use Nexus‑optimized LLM/VLM serving for lower cost and
            latency.
          </p>
          <div className="mt-8 flex items-center justify-center">
            <a
              href="/demo"
              className="rounded-xl bg-white text-[#0b1020] px-5 py-3 font-medium hover:bg-white/90 transition inline-flex items-center gap-2"
            >
              Book a Demo <Rocket className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-8 md:grid-cols-4 text-sm text-white/70">
          <div>
            <div className="flex items-center gap-2 text-white">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-cyan-400 to-violet-400 grid place-items-center">
                <Branch className="h-4 w-4" />
              </div>
              <span className="font-semibold">Nexus AI</span>
            </div>
            <p className="mt-3">
              Model & cloud agnostic fabric to ingest data, compose agents, and operate them securely at scale.
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-medium text-white">Solutions</h4>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-white" href="#platform">
                  Overview
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#ontology-agent">
                  Ontology Management
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#finops">
                  FinOps
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-medium text-white">Solutions</h4>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-white" href="#solutions">
                  Marketplace
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#solutions">
                  Fraud Investigation
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#solutions">
                  Knowledge Fabric
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-medium text-white">Company</h4>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-white" href="#mcp">
                  MCP
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#integrate">
                  Integrate
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#pricing">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Nexus AI. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
