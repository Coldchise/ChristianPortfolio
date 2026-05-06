import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const NAV_LINKS = ["PROJECTS", "BLOG", "ABOUT", "RESUME"] as const;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[150] px-6 lg:px-10 py-5 bg-[#070b0a]/40 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="cursor-target flex items-center" aria-label="Home">
          <img src={logo} alt="Christian Vergara" className="h-8 w-auto" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="cursor-target text-white text-[15px] font-inter font-medium tracking-wide hover:text-[#5ed29c] transition-colors"
            >
              {link}
            </a>
          ))}
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
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[160] bg-[#070b0a] flex flex-col items-center justify-center md:hidden">
          <button
            className="cursor-target absolute top-6 right-6 text-white"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
          <nav className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                onClick={() => setIsOpen(false)}
                className="cursor-target text-white text-2xl font-inter font-medium hover:text-[#5ed29c] transition-colors"
              >
                {link}
              </a>
            ))}
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="cursor-target text-white text-lg font-inter mt-4 hover:text-[#5ed29c] transition-colors"
            >
              [ ADMIN ONLY LOGIN ]
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
