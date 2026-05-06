import { useEffect, useRef, useState } from "react";
import { Briefcase } from "lucide-react";

interface Experience {
  role: string;
  company: string;
  type?: string;
  period: string;
  current?: boolean;
  bullets: string[];
  skills?: string[];
}

const EXPERIENCES: Experience[] = [
  {
    role: "Frontend Lead",
    company: "AWS JRU Club",
    period: "February 2026 – Present",
    current: true,
    bullets: [
      "Spearhead frontend development initiatives and mentor peers in modern web technologies and UI/UX best practices.",
      "Guide the architectural design and implementation of club projects, ensuring responsive, accessible, and highly interactive user interfaces.",
    ],
  },
  {
    role: "Software Developer",
    company: "C8nnect IT Solutions",
    type: "Full-time · Remote",
    period: "December 2025 – Present",
    current: true,
    bullets: [
      "Lead the frontend architecture and UI/UX design for the company's official web presence, driving the project from initial concept to 100% completion and live deployment.",
      "Engineer high-fidelity visualizations, immersive 3D elements, and smooth scroll animations to enhance user engagement.",
      "Implement and integrate custom AI chatbot features to automate and streamline client inquiries.",
      "Collaborate closely with cross-functional development teams, utilizing Git and GitHub for efficient version control and codebase management.",
      "Optimize web platforms for Search Engine Optimization (SEO) to improve organic reach and digital visibility.",
    ],
    skills: [
      "Front-End Development",
      "UI/UX Design",
      "SEO",
      "Git/GitHub",
      "React.js",
      "GSAP",
      "Tailwind CSS",
      "Three.js",
    ],
  },
  {
    role: "IT & Data Processing Intern",
    company: "City Government of Manila",
    type: "Electronic Data Processing Services · On-site",
    period: "March 2025 – April 2025",
    bullets: [
      "Managed the accurate digitization, entry, and organization of highly sensitive municipal tax records and fiscal data.",
      "Maintained daily administrative operations by systemically recording Daily Time Records (DTR) for city hall personnel.",
      "Provided frontline IT support and client communication at the front desk, efficiently troubleshooting and resolving technical issues for constituents.",
    ],
    skills: [
      "Data Entry",
      "Technical Support",
      "Client Communication",
      "Administrative Organization",
    ],
  },
];

function ExperienceEntry({ exp }: { exp: Experience }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      // Active when the entry's top crosses the viewport's vertical midpoint
      setIsActive(rect.top < window.innerHeight * 0.5);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Dot on the timeline */}
      <div
        className={`absolute -left-[36px] sm:-left-[44px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-700 ${
          isActive
            ? "scale-110 border-[#5ed29c] bg-[#5ed29c]"
            : "border-white/15 bg-black"
        }`}
        style={
          isActive
            ? {
                boxShadow:
                  "0 0 12px rgba(94,210,156,0.85), 0 0 28px rgba(94,210,156,0.35)",
              }
            : undefined
        }
      >
        {isActive && (
          <span className="h-2 w-2 rounded-full bg-black" />
        )}
      </div>

      {/* Entry content */}
      <div
        className={`flex flex-col gap-3 transition-all duration-700 ${
          isActive ? "translate-x-0 opacity-100" : "translate-x-1 opacity-55"
        }`}
      >
        {/* Period + ACTIVE pill */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
            {exp.period}
          </span>
          {exp.current && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#5ed29c]/40 bg-[#5ed29c]/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#5ed29c]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5ed29c] animate-pulse" />
              ACTIVE
            </span>
          )}
        </div>

        {/* Role */}
        <h3 className="font-inter text-2xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-[28px] lg:text-[32px]">
          {exp.role}
        </h3>

        {/* Company */}
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="font-inter font-semibold text-[#5ed29c]">
            {exp.company}
          </span>
          {exp.type && (
            <span className="font-mono text-[12px] text-white/45">
              · {exp.type}
            </span>
          )}
        </div>

        {/* Bullets */}
        <ul className="mt-2 space-y-3">
          {exp.bullets.map((b, i) => (
            <li
              key={i}
              className="flex gap-3 text-[14.5px] leading-relaxed text-white/75"
            >
              <span className="mt-2.5 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-[#5ed29c]/70" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* Skills */}
        {exp.skills && (
          <div className="mt-5">
            <div className="mb-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
              Key Skills
            </div>
            <div className="flex flex-wrap gap-1.5">
              {exp.skills.map((s) => (
                <span
                  key={s}
                  className="cursor-target inline-block rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#5ed29c]/50 hover:bg-[#5ed29c]/5 hover:text-[#5ed29c]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const sectionH = rect.height;

      // Start at 0 when section just enters from below;
      // reach 1 when section has fully scrolled past the top.
      const totalScroll = sectionH + viewportH;
      const scrolled = viewportH - rect.top;
      const p = Math.max(0, Math.min(1, scrolled / totalScroll));
      setProgress(p);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-30 min-h-screen overflow-hidden rounded-t-[1em] bg-black px-5 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      {/* Soft top vignette so the rounded edge feels intentional */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(94,210,156,0.07),transparent_60%)]" />

      <div className="relative mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-16 text-center sm:mb-20">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#5ed29c]/40 bg-[#5ed29c]/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#5ed29c]">
              <Briefcase size={11} />
              CAREER://JOURNEY/
            </span>
          </div>
          <h2 className="mb-5 font-inter text-[42px] font-extrabold uppercase leading-[0.9] tracking-tight text-white sm:text-6xl lg:text-[88px]">
            MY <span className="text-white/30">EXPERIENCE</span>
          </h2>
          <p className="font-mono text-sm text-white/50 sm:text-[15px]">
            The roles I've held and the work I've shipped.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-10 sm:pl-14">
          {/* Background grey line */}
          <div className="absolute left-3 top-2 bottom-2 w-[2px] rounded-full bg-white/8 sm:left-[20px]" />
          {/* Green progress overlay */}
          <div
            className="absolute left-3 top-2 w-[2px] rounded-full bg-gradient-to-b from-[#5ed29c] via-[#5ed29c] to-[#5ed29c]/40 sm:left-[20px]"
            style={{
              height: `${progress * 100}%`,
              boxShadow:
                "0 0 12px rgba(94,210,156,0.55), 0 0 24px rgba(94,210,156,0.25)",
              transition: "height 60ms linear",
            }}
          />

          <div className="space-y-14 sm:space-y-20">
            {EXPERIENCES.map((exp, i) => (
              <ExperienceEntry key={i} exp={exp} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
