import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-10 text-white lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
        <a href="#about-me" className="cursor-target" aria-label="Back to top">
          <img src={logo} alt="Christian Vergara" className="h-10 w-auto" />
        </a>
        <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-white/50">
          Copyright 2026 Christian Vergara
        </p>
      </div>
    </footer>
  );
}
