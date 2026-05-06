import { useEffect, useMemo, useState } from "react";
import logo from "../assets/logo.png";
import mePortrait from "../assets/me.PNG";
import c8nnectLogo from "../assets/C8nnectPicture.png";
import padrellosLogo from "../assets/padrellos.png";
import anytimefitnessLogo from "../assets/anytimefitness.png";
import ctcphilippinesLogo from "../assets/CTCphilippines.png";
import c8nnectProject from "../assets/projects/c8nnect.PNG";
import padrellosProject from "../assets/projects/padrellos.PNG";
import anytimefitnessProject from "../assets/projects/anytimefitness.PNG";
import spherehrProject from "../assets/projects/spherehr.PNG";
import mathwormProject from "../assets/projects/mathworm.PNG";
import jeepneyProject from "../assets/projects/jeepneytracking.PNG";
import walkToEarnImg from "../assets/achievement/walktoearn.png";
import awsImg from "../assets/achievement/AWSwebsite.jpeg";
import { VIDEO_SRC } from "./Hero";

const LOAD_TIMEOUT_MS = 9000;
const MIN_VISIBLE_MS = 900;

function withTimeout(task: Promise<unknown>, timeoutMs = LOAD_TIMEOUT_MS) {
  return new Promise<void>((resolve) => {
    const timeoutId = window.setTimeout(resolve, timeoutMs);
    task
      .catch(() => undefined)
      .finally(() => {
        window.clearTimeout(timeoutId);
        resolve();
      });
  });
}

function loadImage(src: string) {
  return withTimeout(
    new Promise<void>((resolve) => {
      const image = new Image();
      image.onload = () => resolve();
      image.onerror = () => resolve();
      image.src = src;
    }),
  );
}

function loadVideoManifest(src: string) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), LOAD_TIMEOUT_MS);

  return withTimeout(
    fetch(src, {
      cache: "force-cache",
      signal: controller.signal,
    })
      .catch(() => undefined)
      .finally(() => window.clearTimeout(timeoutId)),
  );
}

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const imageAssets = useMemo(
    () => [
      logo,
      mePortrait,
      c8nnectLogo,
      padrellosLogo,
      anytimefitnessLogo,
      ctcphilippinesLogo,
      c8nnectProject,
      padrellosProject,
      anytimefitnessProject,
      spherehrProject,
      mathwormProject,
      jeepneyProject,
      walkToEarnImg,
      awsImg,
    ],
    [],
  );

  useEffect(() => {
    if (!isVisible) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isVisible]);

  useEffect(() => {
    let isCancelled = false;
    const startedAt = performance.now();
    const tasks = [
      ...imageAssets.map((src) => () => loadImage(src)),
      () => loadVideoManifest(VIDEO_SRC),
    ];
    let completed = 0;

    const advance = () => {
      completed += 1;
      if (!isCancelled) {
        setProgress(Math.round((completed / tasks.length) * 100));
      }
    };

    Promise.all(tasks.map((task) => task().finally(advance))).then(() => {
      if (isCancelled) return;
      const elapsed = performance.now() - startedAt;
      const delay = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(() => {
        if (isCancelled) return;
        setProgress(100);
        setIsDone(true);
      }, delay);
    });

    return () => {
      isCancelled = true;
    };
  }, [imageAssets]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[300] flex items-center justify-center bg-black transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.18,1)] ${
        isDone ? "-translate-y-full" : "translate-y-0"
      }`}
      onTransitionEnd={() => {
        if (isDone) setIsVisible(false);
      }}
    >
      <div className="flex flex-col items-center gap-7">
        <div className="relative h-24 w-24 overflow-hidden sm:h-32 sm:w-32">
          <img
            src={logo}
            alt="Christian Vergara"
            className="absolute inset-0 h-full w-full object-contain opacity-45 grayscale brightness-[0.35]"
          />
          <img
            src={logo}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain grayscale brightness-0 invert"
            style={{
              clipPath: `inset(${100 - progress}% 0 0 0)`,
              transition: "clip-path 220ms ease-out",
            }}
          />
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/50">
          Loading Assets {progress}%
        </div>
      </div>
    </div>
  );
}
