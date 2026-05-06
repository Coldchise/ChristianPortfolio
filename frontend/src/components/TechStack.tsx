import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import type { ReactNode } from "react";

const C = {
  kw: "#c586c0",
  var: "#4fc1ff",
  prop: "#9cdcfe",
  str: "#ce9178",
  cmt: "#6a9955",
  punc: "#d4d4d4",
  text: "#d7dde0",
};

const CODE_SOURCE = `const myTechStacks = {
  Frontend: [
    "React JS",
    "Tailwind",
    "GSAP",
    "Three.js",
    "React Native",
    "Vue",
    "Android Studio",
  ],
  Backend: ["Node JS", "Express JS", ".NET"],
  Database: ["PostgreSQL", "Firebase", "MySQL"],
  Tools: [
    "Postman",
    "AWS",
    "Blender",
    "Docker",
    "Version Control (Git)",
  ],
} as const;

export default myTechStacks;`;

const KEYWORDS = new Set(["as", "const", "default", "export"]);
const PROPERTIES = new Set(["Frontend", "Backend", "Database", "Tools"]);
const TOKEN_PATTERN =
  /(\/\/.*|"(?:[^"\\]|\\.)*"|\b(?:as|const|default|export)\b|\b(?:myTechStacks|Frontend|Backend|Database|Tools)\b|[{}[\]():,;=])/g;

const Tk = ({ c, children }: { c: string; children: ReactNode }) => (
  <span style={{ color: c }}>{children}</span>
);

const getTokenColor = (token: string) => {
  if (token.startsWith("//")) return C.cmt;
  if (token.startsWith('"')) return C.str;
  if (KEYWORDS.has(token)) return C.kw;
  if (PROPERTIES.has(token)) return C.prop;
  if (token === "myTechStacks") return C.var;
  return C.punc;
};

const renderSyntax = (line: string) => {
  const parts: ReactNode[] = [];
  let cursor = 0;

  line.replace(TOKEN_PATTERN, (token, _match, offset: number) => {
    if (offset > cursor) {
      parts.push(
        <Tk key={`text-${cursor}`} c={C.text}>
          {line.slice(cursor, offset)}
        </Tk>,
      );
    }

    parts.push(
      <Tk key={`${token}-${offset}`} c={getTokenColor(token)}>
        {token}
      </Tk>,
    );
    cursor = offset + token.length;
    return token;
  });

  if (cursor < line.length) {
    parts.push(
      <Tk key={`text-${cursor}`} c={C.text}>
        {line.slice(cursor)}
      </Tk>,
    );
  }

  return parts;
};

export default function TechStack() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visibleChars, setVisibleChars] = useState(0);

  const codeLines = useMemo(() => CODE_SOURCE.split("\n"), []);
  const lineStarts = useMemo(() => {
    let total = 0;
    return codeLines.map((line) => {
      const start = total;
      total += line.length + 1;
      return start;
    });
  }, [codeLines]);

  const currentLineIndex = useMemo(() => {
    let activeLine = 0;
    lineStarts.forEach((start, index) => {
      if (visibleChars >= start) activeLine = index;
    });
    return activeLine;
  }, [lineStarts, visibleChars]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const drift = gsap.to(grid, {
      backgroundPosition: "96px 96px",
      duration: 10,
      ease: "none",
      repeat: -1,
    });

    return () => {
      drift.kill();
    };
  }, []);

  useEffect(() => {
    if (visibleChars >= CODE_SOURCE.length) {
      return;
    }

    const currentChar = CODE_SOURCE[visibleChars] ?? "";
    const delay = currentChar === "\n" ? 160 : currentChar === "," ? 70 : 24;
    const typeId = window.setTimeout(
      () => setVisibleChars((count) => count + 1),
      delay,
    );

    return () => window.clearTimeout(typeId);
  }, [visibleChars]);

  return (
    <section className="relative z-[120] min-h-screen overflow-hidden rounded-t-[1em] bg-[#0a0c0b] px-5 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div
        ref={gridRef}
        className="tech-stack-grid absolute inset-[-15%]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(94,210,156,0.11),transparent_32%),radial-gradient(circle_at_18%_54%,rgba(94,210,156,0.08),transparent_26%),linear-gradient(180deg,rgba(10,12,11,0.72),#070807_82%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#070807_0%,rgba(7,8,7,0.42)_18%,rgba(7,8,7,0.42)_82%,#070807_100%)]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl items-center justify-center">
        <div className="cursor-target w-full overflow-hidden rounded-[1em] border border-white/10 bg-[#1b1d1c]/95 shadow-[0_28px_90px_rgba(0,0,0,0.58),0_0_70px_rgba(94,210,156,0.12)] backdrop-blur">
          <div className="flex items-center gap-2 border-b border-white/10 bg-[#202221] px-4 py-3 sm:px-5">
            <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <div className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 truncate font-mono text-xs text-white/50">
              ~/portfolio/myTechStacks.tsx
            </span>
          </div>

          <div className="px-5 py-8 sm:px-8 md:px-12 lg:px-16 lg:py-12">
            <div className="mb-7 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#5ed29c]/30 bg-[#5ed29c]/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#5ed29c]">
                <span className="h-2 w-2 rounded-full bg-[#5ed29c] shadow-[0_0_18px_rgba(94,210,156,0.9)]" />
                STACK_TYPING
              </span>
            </div>

            <h2 className="mb-9 text-center font-inter text-[42px] font-extrabold uppercase leading-[0.9] tracking-normal text-white sm:text-6xl lg:text-[86px]">
              MY TECH <span className="text-white/35">STACK</span>
            </h2>

            <div className="border-l border-[#5ed29c]/70 pl-0 sm:pl-5">
              <div className="overflow-x-auto pb-2 font-mono text-[12px] leading-[1.75] text-white/90 sm:text-[13px] md:text-[14px]">
                {codeLines.map((line, index) => {
                  const visibleLength = Math.max(
                    0,
                    Math.min(line.length, visibleChars - lineStarts[index]),
                  );
                  const visibleLine = line.slice(0, visibleLength);
                  const isCurrentLine = index === currentLineIndex;

                  return (
                    <div key={index} className="flex">
                      <span className="w-10 flex-shrink-0 select-none pr-4 text-right text-white/30">
                        {index + 1}
                      </span>
                      <span className="min-h-[1.75em] flex-1 whitespace-pre">
                        {renderSyntax(visibleLine)}
                        {isCurrentLine && (
                          <span className="code-caret ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-[#5ed29c] align-middle" />
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
