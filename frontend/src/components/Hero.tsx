import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { ArrowRight, Github } from "lucide-react";
import mePortrait from "../assets/me.PNG";
import c8nnectLogo from "../assets/C8nnectPicture.png";
import padrellosLogo from "../assets/padrellos.png";
import anytimefitnessLogo from "../assets/anytimefitness.png";
import ctcphilippinesLogo from "../assets/CTCphilippines.png";

const VIDEO_SRC =
  "https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8";

const COMPANIES = [
  { src: c8nnectLogo, alt: "C8nnect" },
  { src: padrellosLogo, alt: "Padrellos Construction" },
  { src: anytimefitnessLogo, alt: "Anytime Fitness" },
  { src: ctcphilippinesLogo, alt: "CTC Group Philippines" },
];

const SOCIAL_ICON_CLASS =
  "cursor-target text-white transition-colors hover:text-[#5ed29c]";

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M512 96L127.9 96C110.3 96 96 110.5 96 128.3L96 511.7C96 529.5 110.3 544 127.9 544L512 544C529.6 544 544 529.5 544 511.7L544 128.3C544 110.5 529.6 96 512 96zM231.4 480L165 480L165 266.2L231.5 266.2L231.5 480L231.4 480zM198.2 160C219.5 160 236.7 177.2 236.7 198.5C236.7 219.8 219.5 237 198.2 237C176.9 237 159.7 219.8 159.7 198.5C159.7 177.2 176.9 160 198.2 160zM480.3 480L413.9 480L413.9 376C413.9 351.2 413.4 319.3 379.4 319.3C344.8 319.3 339.5 346.3 339.5 374.2L339.5 480L273.1 480L273.1 266.2L336.8 266.2L336.8 295.4L337.7 295.4C346.6 278.6 368.3 260.9 400.6 260.9C467.8 260.9 480.3 305.2 480.3 362.8L480.3 480z" />
  </svg>
);

const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M544 320C544 196.3 443.7 96 320 96C196.3 96 96 196.3 96 320C96 425.6 169.5 514.1 268 538.2L268 388.9L222.3 388.9L222.3 320L268 320L268 290.7C268 215.4 302.1 180.4 376.4 180.4C390.5 180.4 414.8 183.2 424.8 185.9L424.8 248.4C419.6 247.9 410.4 247.6 399.1 247.6C362.8 247.6 348.7 261.4 348.7 297.2L348.7 320L421.2 320L408.7 388.9L348.6 388.9L348.6 543.2C460.7 529.7 544.1 434.2 544.1 320z" />
  </svg>
);

const MailIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L284.8 365.6C305.6 381.2 334.4 381.2 355.2 365.6L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L383.7 404.5C351.4 428.7 308.6 428.7 276.3 404.5L64 260z" />
  </svg>
);

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: false });
      hls.loadSource(VIDEO_SRC);
      hls.attachMedia(video);
      return () => hls.destroy();
    }
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = VIDEO_SRC;
    }
  }, []);

  const companiesCard = (
    <div className="cursor-target liquid-glass-card relative overflow-hidden p-5 rounded-2xl w-full lg:w-[480px] max-w-[480px] lg:shrink-0">
      <div className="text-white/60 font-inter text-[14px] mb-4 relative z-10">
        [ Companies Served ]
      </div>
      <div className="overflow-hidden">
        <div className="flex items-center gap-12 animate-marquee w-max">
          {[...COMPANIES, ...COMPANIES].map((company, i) => (
            <img
              key={i}
              src={company.src}
              alt={company.alt}
              className="h-10 w-auto object-contain shrink-0 opacity-90"
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#070b0a]">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-x-0 -top-[5%] h-[110%] w-full object-cover opacity-60"
      />

      {/* Left-to-right gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#070b0a] via-[#070b0a]/60 to-transparent pointer-events-none" />

      {/* Bottom-up gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070b0a] via-[#070b0a]/30 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 flex min-h-screen flex-col justify-end px-6 pb-24 pt-32 sm:pb-20 lg:px-10 lg:pb-24">
        <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col justify-end">
        {/* Liquid Glass Card - top-left */}
        <div
          className="cursor-target liquid-glass-card relative mb-auto flex w-full max-w-[430px] -translate-y-5 items-stretch justify-between gap-3 overflow-hidden rounded-2xl p-4 sm:-translate-y-[50px] sm:gap-5 sm:p-5"
          style={{
            height: "200px",
          }}
        >
          <div className="flex min-w-0 max-w-[150px] sm:max-w-[230px] flex-col justify-between">
            <div className="text-white/60 font-inter text-[14px] leading-none">
              [ 2026 ]
            </div>
            <div className="text-white font-inter font-medium text-[15px] sm:text-[18px] leading-snug">
              Trusted by{" "}
              <span className="font-instrument italic font-normal">
                Industry
              </span>{" "}
              Professionals
            </div>
            <p className="text-white/50 font-inter text-[10px] sm:text-[11px] leading-snug max-w-[180px]">
              Designing complete systems and web applications that streamline operations and elevate user experiences.
            </p>
          </div>

          <div className="absolute bottom-4 sm:bottom-5 right-4 sm:right-5 top-4 sm:top-5 flex items-center">
            <img
              src={mePortrait}
              alt="Christian Vergara"
              className="mr-3 sm:mr-12 h-24 sm:h-full aspect-square rounded-full object-cover grayscale transition duration-500 hover:grayscale-0"
            />
            <ArrowRight
              size={16}
              className="absolute bottom-0 right-0 shrink-0 text-white/60 transition-colors hover:text-[#5ed29c]"
            />
          </div>
        </div>

        {/* Bottom-left content stack */}
        <div className="flex flex-col items-start">
          {/* Eyebrow + social icons */}
          <div className="flex items-center gap-4 mb-5">
            <div
              className="font-jakarta font-bold uppercase tracking-[0.2em]"
              style={{ color: "#5ed29c", fontSize: "11px" }}
            >
              Software developer
            </div>
            <div className="h-3 w-px bg-white/20" />
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/christian-vergara-9206ab348/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={SOCIAL_ICON_CLASS}
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href="https://www.facebook.com/christian.vergara.222900/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={SOCIAL_ICON_CLASS}
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href="mailto:yvergarachristian1@gmail.com"
                aria-label="Email"
                className={SOCIAL_ICON_CLASS}
              >
                <MailIcon size={16} />
              </a>
              <a
                href="https://github.com/Coldchise"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={SOCIAL_ICON_CLASS}
              >
                <Github size={16} strokeWidth={2.2} />
              </a>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-white font-inter font-extrabold uppercase tracking-tight leading-[0.95] text-[34px] sm:text-[52px] md:text-[68px] lg:text-[82px] xl:text-[96px]">
            Hi I'm Christian
            <br />
            Vergara
            <span className="text-[#5ed29c] inline-block animate-blink">.</span>
          </h1>

          {/* Description + Companies row */}
          <div className="mt-8 flex flex-col gap-8 w-full lg:flex-row lg:items-end lg:justify-between">
            <p className="font-inter text-[14px] leading-relaxed max-w-[512px] text-white/70">
              I'm a software developer and first-year BSIT student specializing in the MERN stack. From crafting engaging, user-focused frontends to engineering production-ready backends, I help businesses thrive by building the custom systems they need to succeed.
            </p>

            {companiesCard}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
