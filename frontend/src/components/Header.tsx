import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import resumePdf from "../assets/ChristianYVergaraResumes.pdf";

const NAV_LINKS = [
  { label: "ABOUT ME", href: "#about-me" },
  { label: "MY TECH STACKS", href: "#my-tech-stacks" },
  { label: "MY PROJECTS", href: "#my-projects" },
  { label: "EXPERIENCE", href: "#experience" },
] as const;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  const openResume = () => {
    setIsOpen(false);
    setIsResumeOpen(true);
  };

  useEffect(() => {
    if (!isResumeOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsResumeOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isResumeOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-[150] px-6 lg:px-10 py-5 bg-[#070b0a]/40 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <a
          href="#about-me"
          className="cursor-target flex items-center"
          aria-label="Home"
        >
          <img src={logo} alt="Christian Vergara" className="h-8 w-auto" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="cursor-target text-white text-[15px] font-inter font-medium tracking-wide hover:text-[#5ed29c] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={openResume}
            className="cursor-target text-white text-[15px] font-inter font-medium tracking-wide hover:text-[#5ed29c] transition-colors"
          >
            RESUME
          </button>
        </nav>

        {/* Right side: Register CTA */}
        <a
          href="#"
          className="cursor-target hidden md:inline-block text-white text-[14px] font-inter font-medium tracking-wider hover:text-[#5ed29c] transition-colors"
        >
          [ ADMIN ONLY LOGIN ]
        </a>

        {/* Mobile hamburger */}
        <button
          className="cursor-target md:hidden text-white"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          aria-expanded={isOpen}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-x-0 top-0 z-[160] min-h-screen bg-[#070b0a] flex flex-col items-center justify-center md:hidden transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-y-0" : "-translate-y-full pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <button
          className="cursor-target absolute top-6 right-6 text-white"
          onClick={closeMenu}
          aria-label="Close menu"
        >
          <X size={28} />
        </button>
        <nav className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="cursor-target text-white text-2xl font-inter font-medium hover:text-[#5ed29c] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={openResume}
            className="cursor-target text-white text-2xl font-inter font-medium hover:text-[#5ed29c] transition-colors"
          >
            RESUME
          </button>
          <a
            href="#"
            onClick={closeMenu}
            className="cursor-target text-white text-lg font-inter mt-4 hover:text-[#5ed29c] transition-colors"
          >
            [ ADMIN ONLY LOGIN ]
          </a>
        </nav>
      </div>
      {isResumeOpen && (
        <div className="fixed inset-0 z-[240] bg-black">
          <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between border-b border-white/10 bg-black/90 px-5 py-4 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <img src={logo} alt="" className="h-8 w-auto" />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
                RESUME_VIEWER
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsResumeOpen(false)}
              className="cursor-target inline-flex items-center gap-2 rounded border border-white/15 bg-white/5 px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-white transition-colors hover:border-[#5ed29c]/60 hover:text-[#5ed29c]"
            >
              <X size={14} />
              Exit
            </button>
          </div>
          <iframe
            src={`${resumePdf}#toolbar=1&navpanes=0`}
            title="Christian Vergara Resume"
            className="h-full w-full pt-[73px]"
          />
        </div>
      )}
    </header>
  );
}
