import { useEffect, useRef, useState } from "react";
import { Check, Paperclip, Send, Upload, X } from "lucide-react";
import { apiFetch } from "../lib/api";

const CONNECT_VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4";

const TOPICS = [
  "Web Development",
  "Mobile App",
  "AI & Automation",
  "Consulting",
  "Other",
];

function useTypewriter(text: string, speed = 45, startDelay = 300) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const start = () => setHasStarted(true);

  useEffect(() => {
    if (!hasStarted) return;
    setDisplayed("");
    setDone(false);

    const delayTimer = window.setTimeout(() => {
      let index = 0;
      const interval = window.setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          window.clearInterval(interval);
          setDone(true);
        }
      }, speed);

      return () => window.clearInterval(interval);
    }, startDelay);

    return () => window.clearTimeout(delayTimer);
  }, [text, speed, startDelay, hasStarted]);

  return { displayed, done, start };
}

export default function ConnectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedTopics, setSelectedTopics] = useState<string[]>(["Web Development"]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const headline = "Want to connect with me?";
  const { displayed, done, start: startTypewriter } = useTypewriter(headline, 40, 200);

  // IntersectionObserver for Typewriter
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startTypewriter();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 3D Video Continuous Playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.loop = true;
    video.play().catch(() => {});

    const interval = window.setInterval(() => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setStatusMsg(null);

    const fullMessage = `[Topics: ${selectedTopics.join(", ")}]\n${subject ? `Subject: ${subject}\n` : ""}${message}`;

    try {
      await apiFetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: fullMessage,
        }),
      });

      const mailtoUrl = `mailto:yvergarachristian1@gmail.com?subject=${encodeURIComponent(
        subject || `Inquiry from ${name}`,
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nTopics: ${selectedTopics.join(", ")}\n\nMessage:\n${message}`,
      )}`;

      window.open(mailtoUrl, "_blank");

      setStatusMsg({
        type: "success",
        text: "Thank you! Your message has been sent to Christian (yvergarachristian1@gmail.com).",
      });

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setAttachment(null);
    } catch (err) {
      const mailtoUrl = `mailto:yvergarachristian1@gmail.com?subject=${encodeURIComponent(
        subject || `Inquiry from ${name}`,
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nTopics: ${selectedTopics.join(", ")}\n\nMessage:\n${message}`,
      )}`;
      window.open(mailtoUrl, "_blank");

      setStatusMsg({
        type: "success",
        text: "Opening email client to send message to yvergarachristian1@gmail.com...",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="connect"
      className="relative z-[140] min-h-screen overflow-hidden rounded-t-[1em] bg-[#070b0a] px-5 py-16 sm:px-6 lg:px-10 lg:py-24 text-white"
    >
      {/* Dark Ambience Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_40%,rgba(94,210,156,0.08),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(94,210,156,0.05),transparent_35%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[#070b0a] opacity-90 pointer-events-none" />

      <div className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl flex-col justify-center">
        {/* Grid: Left Mail CTA Form | Right 3D Video Element */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Mail CTA Form */}
          <div className="lg:col-span-7 flex flex-col order-1">
            {/* Header Eyebrow */}
            <div className="mb-4 flex justify-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#5ed29c]/30 bg-[#5ed29c]/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#5ed29c]">
                <span className="h-2 w-2 rounded-full bg-[#5ed29c] shadow-[0_0_12px_rgba(94,210,156,0.8)] animate-pulse" />
                CONNECT_NEWSLETTER
              </span>
            </div>

            <h2 className="mb-4 font-inter text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
              {displayed}
              {!done && (
                <span className="inline-block h-[1em] w-[3px] bg-[#5ed29c] align-middle ml-1 animate-blink" />
              )}
            </h2>

            <p className="mb-8 font-inter text-sm sm:text-base text-white/60 leading-relaxed max-w-xl">
              Whether you have questions, feedback, or potential project inquiries, drop me a message and I'll get back to you as soon as possible.
            </p>

            {/* Topic Selector Pills */}
            <div className="mb-8">
              <div className="font-inter text-sm font-semibold text-white/90 mb-1">
                What sort of topic or service?
              </div>
              <div className="font-inter text-xs text-white/40 mb-3">
                Select all that apply
              </div>

              <div className="flex flex-wrap gap-2.5">
                {TOPICS.map((topic) => {
                  const isSelected = selectedTopics.includes(topic);
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => toggleTopic(topic)}
                      className={`cursor-target inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-inter text-xs font-medium transition-all duration-200 ${
                        isSelected
                          ? "bg-[#5ed29c]/20 text-[#5ed29c] border border-[#5ed29c]/50 shadow-[0_0_15px_rgba(94,210,156,0.2)]"
                          : "bg-[#141816] text-white/70 border border-white/10 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {isSelected && <Check size={14} className="text-[#5ed29c]" />}
                      {topic}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mail Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-inter text-xs text-white/60 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Christian Vergara"
                    className="w-full rounded-xl border border-white/10 bg-[#121614] px-4 py-2.5 font-inter text-sm text-white placeholder-white/30 focus:border-[#5ed29c]/60 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-inter text-xs text-white/60 mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-[#121614] px-4 py-2.5 font-inter text-sm text-white placeholder-white/30 focus:border-[#5ed29c]/60 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-inter text-xs text-white/60 mb-1.5">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Full-Stack Project Collaboration"
                  className="w-full rounded-xl border border-white/10 bg-[#121614] px-4 py-2.5 font-inter text-sm text-white placeholder-white/30 focus:border-[#5ed29c]/60 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-inter text-xs text-white/60 mb-1.5">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project or inquiry..."
                  className="w-full rounded-xl border border-white/10 bg-[#121614] px-4 py-2.5 font-inter text-sm text-white placeholder-white/30 focus:border-[#5ed29c]/60 focus:outline-none resize-none"
                />
              </div>

              {/* Upload Files / Photo Attachment */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-target inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#121614] px-4 py-2 font-inter text-xs text-white/70 hover:border-[#5ed29c]/40 hover:text-[#5ed29c] transition-all"
                  >
                    <Upload size={14} />
                    Attach File or Photo
                  </button>

                  {attachment && (
                    <div className="flex items-center gap-2 rounded-lg bg-[#5ed29c]/15 border border-[#5ed29c]/30 px-3 py-1 text-xs text-[#5ed29c]">
                      <Paperclip size={12} />
                      <span className="truncate max-w-[150px]">{attachment.name}</span>
                      <button
                        type="button"
                        onClick={() => setAttachment(null)}
                        className="text-white/60 hover:text-white"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-target inline-flex items-center gap-2 rounded-xl bg-[#5ed29c] px-6 py-3 font-inter text-sm font-semibold text-black shadow-[0_0_25px_rgba(94,210,156,0.3)] transition-all hover:bg-[#6ee6ad] active:scale-95 disabled:opacity-50"
                >
                  <Send size={16} />
                  Send (yvergarachristian1@gmail.com)
                </button>

                <span className="font-mono text-[11px] text-white/40 hidden sm:inline-block">
                  Direct Response Guaranteed
                </span>
              </div>

              {statusMsg && (
                <div
                  className={`mt-2 rounded-xl p-3 text-xs font-inter ${
                    statusMsg.type === "success"
                      ? "bg-[#5ed29c]/15 text-[#5ed29c] border border-[#5ed29c]/30"
                      : "bg-red-500/15 text-red-400 border border-red-500/30"
                  }`}
                >
                  {statusMsg.text}
                </div>
              )}
            </form>
          </div>

          {/* Right Column: 3D Video Element */}
          <div className="lg:col-span-5 flex items-center justify-center order-2 relative">
            <div
              ref={containerRef}
              className="cursor-target relative w-full h-full min-h-[440px] lg:min-h-[540px] flex items-center justify-center pointer-events-auto overflow-hidden select-none"
            >
              <video
                ref={videoRef}
                src={CONNECT_VIDEO_SRC}
                muted
                playsInline
                autoPlay
                loop
                preload="auto"
                className="h-full w-full object-cover object-top pointer-events-none select-none rounded-2xl transition-transform duration-500 hover:scale-105"
                style={{
                  filter: "invert(1) hue-rotate(180deg) brightness(1.1) contrast(1.15)",
                  mixBlendMode: "screen",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
