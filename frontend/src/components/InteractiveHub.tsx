import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, Play, X } from "lucide-react";
import c8nnectImg from "../assets/projects/c8nnect.PNG";
import padrellosImg from "../assets/projects/padrellos.PNG";
import anytimefitnessImg from "../assets/projects/anytimefitness.PNG";
import spherehrImg from "../assets/projects/spherehr.PNG";
import mathwormImg from "../assets/projects/mathworm.PNG";
import jeepneyImg from "../assets/projects/jeepneytracking.PNG";
import walkToEarnImg from "../assets/achievement/walktoearn.png";
import awsImg from "../assets/achievement/AWSwebsite.jpeg";

type ModuleType = "project" | "achievement";
type TabKey = "all" | "project" | "achievement";

interface Module {
  id: string;
  type: ModuleType;
  category: string;
  fileName: string;
  title: string;
  shortDescription: string;
  description: string;
  techStack: string[];
  image: string;
  link?: string;
}

const MODULES: Module[] = [
  {
    id: "c8nnect",
    type: "project",
    category: "WEB",
    fileName: "c8nnect",
    title: "C8nnect",
    shortDescription: "Corporate website & AI assistant",
    description:
      "A highly interactive, fully revamped official corporate website for C8nnect IT Solutions. Features immersive 3D web elements, high-fidelity scroll animations, and a custom-integrated AI chatbot tailored to handle company-specific inquiries and automate client support.",
    techStack: ["React.js", "Three.js", "GSAP", "Tailwind CSS"],
    image: c8nnectImg,
    link: "https://c8nnect.com",
  },
  {
    id: "padrellos",
    type: "project",
    category: "WEB",
    fileName: "padrellos",
    title: "Padrellos Construction",
    shortDescription: "Premium construction landing page",
    description:
      "A visually engaging and premium landing page designed for a construction firm. Leverages smooth, scroll-triggered animations and a modern frontend architecture to effectively showcase their portfolio and services to potential clients.",
    techStack: ["React.js", "GSAP", "Tailwind CSS"],
    image: padrellosImg,
  },
  {
    id: "pthub",
    type: "project",
    category: "MOBILE",
    fileName: "pthub",
    title: "PTHub / Anytime Fitness",
    shortDescription: "Coach management cross-platform app",
    description:
      "A comprehensive cross-platform application actively used across multiple Anytime Fitness branches. Features a fluid, responsive interface that allows for seamless coach scheduling, client management, and branch-level coordination.",
    techStack: ["React Native", "React.js", "Tailwind CSS"],
    image: anytimefitnessImg,
    link: "https://play.google.com/store/apps/details?id=com.c8nnect.pthub",
  },
  {
    id: "spherehr",
    type: "project",
    category: "SAAS",
    fileName: "sphere_hr",
    title: "Sphere HR",
    shortDescription: "Multi-tenant HRIS platform",
    description:
      "A multi-tenant Human Resource Information System (HRIS) developed for CTC Philippines. Features a robust, centralized dashboard with secure role-based access — including centralized super-admin controls — to streamline employee data, automation, and organizational management.",
    techStack: ["React.js", "Tailwind CSS", "GSAP"],
    image: spherehrImg,
    link: "https://hris.c8nnect.com/",
  },
  {
    id: "mathworm",
    type: "project",
    category: "GAME",
    fileName: "math_worm",
    title: "Math Worm Game",
    shortDescription: "Educational RPG math battler",
    description:
      "An educational RPG math game designed to make learning highly interactive. Features custom battle scene logic and engaging gameplay mechanics that challenge users to solve mathematical problems to progress through the RPG elements.",
    techStack: ["Godot Engine", "GDScript"],
    image: mathwormImg,
  },
  {
    id: "jeepney",
    type: "project",
    category: "WEB",
    fileName: "jeepney_tracker",
    title: "Jeepney Tracking",
    shortDescription: "Real-time public transit tracker",
    description:
      "A dynamic web application aimed at modernizing public transit. Provides real-time location tracking and route optimization for public jeepneys, utilizing a clean, map-integrated interface to enhance the daily commuting experience for passengers.",
    techStack: ["React.js", "Tailwind CSS", "Three.js", "GSAP"],
    image: jeepneyImg,
    link: "https://web-capstone-bjoc.vercel.app/login",
  },
  {
    id: "walktoearn",
    type: "achievement",
    category: "HACKATHON",
    fileName: "walk_to_earn",
    title: "Walk to Earn",
    shortDescription: "Hackathon — every step rewards you",
    description:
      "A hackathon project where users earn rewards for every step they take. Built end-to-end during a hackathon, it features step tracking and an in-app reward system that gamifies physical activity.",
    techStack: ["React Native", "Node.js", "Firebase"],
    image: walkToEarnImg,
  },
  {
    id: "aws",
    type: "achievement",
    category: "COMMUNITY",
    fileName: "aws_website",
    title: "AWS Club Website",
    shortDescription: "Frontend lead — JRU AWS Club",
    description:
      "Led a team as the Frontend Lead and built the official website for the AWS Club at JRU. Delivered a clean, performant interface that supports community events, member resources, and announcements.",
    techStack: ["HTML", "CSS", "JavaScript", "Python"],
    image: awsImg,
  },
];

const TABS: { id: TabKey; label: string; icon: string }[] = [
  { id: "all", label: "ALL_MODULES", icon: ">_" },
  { id: "project", label: "PROJECTS", icon: "</>" },
  { id: "achievement", label: "ACHIEVEMENT", icon: "✦" },
];

function ProjectCard({
  module,
  onOpen,
}: {
  module: Module;
  onOpen: () => void;
}) {
  return (
    <div className="group cursor-target relative overflow-hidden rounded-xl border border-white/10 bg-[#1b1d1c]/95 transition-all duration-300 hover:border-[#5ed29c]/60 hover:shadow-[0_0_40px_rgba(94,210,156,0.18)]">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#202221] px-4 py-2.5 transition-colors group-hover:bg-[#1b2a23]">
        <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate font-mono text-[11px] text-white/50">
          ~ root/{module.fileName}
        </span>
      </div>

      {/* Image with hover overlay */}
      <div className="relative aspect-video overflow-hidden bg-black">
        <img
          src={module.image}
          alt={module.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[#5ed29c]/0 transition-colors duration-300 group-hover:bg-[#5ed29c]/15" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="cursor-target inline-flex items-center gap-2 rounded-full border border-[#5ed29c] bg-[#070b0a]/90 px-5 py-2.5 font-mono text-[12px] font-bold uppercase tracking-wider text-[#5ed29c] transition-colors hover:bg-[#5ed29c] hover:text-[#070b0a]"
          >
            <Play size={12} fill="currentColor" />
            Open Module
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <span className="mb-3 inline-block rounded border border-[#5ed29c]/40 bg-[#5ed29c]/5 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#5ed29c]">
          {module.category}
        </span>
        <h3 className="mb-1 font-inter text-xl font-extrabold uppercase tracking-tight text-white transition-colors group-hover:text-[#5ed29c]">
          {module.title}
        </h3>
        <p className="mb-3 text-sm text-white/60">{module.shortDescription}</p>
        <div className="flex flex-wrap gap-1.5">
          {module.techStack.map((t) => (
            <span
              key={t}
              className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/60"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectModal({
  module,
  onClose,
}: {
  module: Module;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-xl border border-white/10 bg-[#0a0c0b] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0a0c0b]/95 px-4 py-3 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 rounded border border-[#5ed29c]/40 bg-[#5ed29c]/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-[#5ed29c]">
              <span className="h-2 w-2 rounded-full bg-[#5ed29c] animate-pulse" />
              PORTAL ACTIVE
            </span>
            <span className="hidden sm:inline-block rounded border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-white/80">
              ⚡ {module.title}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="cursor-target inline-flex items-center gap-2 rounded border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white/80 transition-colors hover:border-[#ff5f57]/60 hover:text-[#ff5f57]"
          >
            <X size={12} />
            EXIT SIMULATION
          </button>
        </div>

        {/* IDE chrome */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#202221] px-4 py-2.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 truncate font-mono text-[11px] text-white/60">
            ~ root@portfolio:~/modules/{module.fileName}
          </span>
          <span className="ml-auto hidden font-mono text-[10px] text-[#5ed29c] sm:inline">
            [ MODULE LOADED ]
          </span>
        </div>

        {/* URL bar (only if has link) */}
        {module.link && (
          <div className="flex items-center gap-2 border-b border-white/10 bg-[#0e1110] px-4 py-2">
            <div className="flex flex-1 items-center gap-2 rounded border border-white/10 bg-[#1a1c1b] px-3 py-1.5">
              <span className="font-mono text-[11px] text-white/60 truncate">
                {module.link}
              </span>
            </div>
            <a
              href={module.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open in new tab"
              className="cursor-target text-white/40 transition-colors hover:text-[#5ed29c]"
            >
              <ExternalLink size={14} />
            </a>
          </div>
        )}

        {/* Body */}
        <div className="grid gap-6 p-4 lg:grid-cols-2 lg:p-6">
          {/* Left: image */}
          <div className="overflow-hidden rounded-lg border border-white/10 bg-black">
            <img
              src={module.image}
              alt={module.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right: details */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block rounded border border-[#5ed29c]/40 bg-[#5ed29c]/5 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#5ed29c]">
                {module.category}
              </span>
              <span className="inline-block rounded border border-[#5ed29c]/40 bg-[#5ed29c]/5 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#5ed29c]">
                ⌘ MODULE.TYPE_PORTAL
              </span>
            </div>

            <h3 className="font-inter text-3xl font-extrabold uppercase tracking-tight text-[#5ed29c] lg:text-4xl">
              {module.title}
              <span className="ml-1 inline-block h-7 w-2 translate-y-1 bg-[#5ed29c] align-middle animate-pulse" />
            </h3>

            <div className="border-l-2 border-[#5ed29c]/40 pl-4">
              <p className="mb-2 font-mono text-sm italic text-white/40">
                // {module.shortDescription}
              </p>
              <p className="text-[15px] leading-relaxed text-white/85">
                {module.description}
              </p>
            </div>

            {/* Tech stack as code block */}
            <div className="rounded-lg border border-white/10 bg-[#0e1110] p-4 font-mono text-[13px] leading-relaxed">
              <span className="text-[#c586c0]">const</span>{" "}
              <span className="text-[#4fc1ff]">stack</span>
              <span className="text-[#d4d4d4]"> = [</span>
              {module.techStack.map((t, i) => (
                <span key={t}>
                  {"\n  "}
                  <span className="text-[#ce9178]">"{t}"</span>
                  {i < module.techStack.length - 1 ? (
                    <span className="text-[#d4d4d4]">,</span>
                  ) : null}
                </span>
              ))}
              {"\n"}
              <span className="text-[#d4d4d4]">];</span>
            </div>

            {/* Launch button (only if has link) */}
            {module.link && (
              <a
                href={module.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target mt-2 flex items-center justify-center gap-2 rounded bg-[#5ed29c] px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-[#070b0a] transition-colors hover:bg-[#4bc188]"
              >
                <ExternalLink size={14} />
                LAUNCH FULL SITE
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function InteractiveHub() {
  const [tab, setTab] = useState<TabKey>("all");
  const [opened, setOpened] = useState<Module | null>(null);

  const filtered = MODULES.filter((m) =>
    tab === "all" ? true : m.type === tab,
  );

  return (
    <section className="relative z-[140] min-h-screen overflow-hidden rounded-t-[1em] bg-[#070807] px-5 py-20 sm:px-6 lg:px-10 lg:py-28">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(94,210,156,0.08),transparent_45%)]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#5ed29c]/40 bg-[#5ed29c]/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#5ed29c]">
              📁 SYSTEM://MODULES/
            </span>
          </div>

          <h2 className="mb-4 font-inter text-[42px] font-extrabold uppercase leading-[0.9] tracking-tight text-white sm:text-6xl lg:text-[88px]">
            INTERACTIVE_HUB
            <span className="ml-1 inline-block h-[0.7em] w-[0.18em] translate-y-[0.05em] bg-[#5ed29c] align-middle animate-blink" />
          </h2>

          <p className="font-mono text-sm text-white/50 sm:text-[15px]">
            Each project is an interactive module. Hover to play, click to enter.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-10 flex flex-col items-center justify-between gap-4 border-b border-white/10 sm:flex-row">
          <div className="flex flex-wrap items-center gap-2 sm:gap-6">
            {TABS.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`cursor-target relative px-2 pb-3 pt-2 font-mono text-[13px] uppercase tracking-wider transition-colors ${
                    active
                      ? "text-[#5ed29c]"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  <span className="mr-2 opacity-70">{t.icon}</span>
                  {t.label}
                  {active && (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 bg-[#5ed29c]" />
                  )}
                </button>
              );
            })}
          </div>
          <span className="pb-3 font-mono text-[11px] uppercase tracking-wider text-white/40">
            🔍 {filtered.length} MODULE(S) LOADED
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <ProjectCard
              key={m.id}
              module={m}
              onOpen={() => setOpened(m)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {opened && (
        <ProjectModal module={opened} onClose={() => setOpened(null)} />
      )}
    </section>
  );
}
