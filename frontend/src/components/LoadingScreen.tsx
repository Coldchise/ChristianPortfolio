import { useEffect, useMemo, useState } from "react";
import logo from "../assets/logo.png";
import mePortrait from "../assets/me.PNG";
import jmjLogo from "../assets/JMJlogo.png";
import beyondfoodsolutionLogo from "../assets/beyondfoodsolution logo.png";
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
import beyondfoodsolutionProject from "../assets/projects/beyondfoodsolution.PNG";
import crmProject from "../assets/projects/CRM.PNG";
import lguProject from "../assets/LGU.PNG";
import walkToEarnImg from "../assets/achievement/walktoearn.png";
import awsImg from "../assets/achievement/AWSwebsite.jpeg";

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

function loadHeroVideo() {
  return withTimeout(
    new Promise<void>((resolve) => {
      const checkVideoReady = () => {
        const video = document.querySelector<HTMLVideoElement>("section video");
        if (video && video.readyState >= 2) {
          resolve();
          return true;
        }
        return false;
      };

      if (checkVideoReady()) return;

      const handleReady = () => resolve();
      window.addEventListener("hero-video-ready", handleReady, { once: true });

      const intervalId = window.setInterval(() => {
        if (checkVideoReady()) {
          window.clearInterval(intervalId);
          window.removeEventListener("hero-video-ready", handleReady);
        }
      }, 100);

      window.setTimeout(() => {
        window.clearInterval(intervalId);
        window.removeEventListener("hero-video-ready", handleReady);
      }, LOAD_TIMEOUT_MS);
    }),
    LOAD_TIMEOUT_MS,
  );
}

const CONNECT_VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4";

function loadConnectVideo() {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), LOAD_TIMEOUT_MS);

  return withTimeout(
    fetch(CONNECT_VIDEO_SRC, {
      cache: "force-cache",
      signal: controller.signal,
    })
      .catch(() => undefined)
      .finally(() => window.clearTimeout(timeoutId)),
    LOAD_TIMEOUT_MS,
  );
}

const BASE_VOXEL_IMG =
  "https://soft-zoom-63098134.figma.site/_assets/v11/5c9f982199fde1d9b85a20e5396f0fa7bacaf9a3.png?w=2560";
const REVEAL_VOXEL_IMG =
  "https://soft-zoom-63098134.figma.site/_assets/v11/6be2165e31648955b4e071f4cf2a50bc572b9bfd.png?w=1536";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const imageAssets = useMemo(
    () => [
      logo,
      mePortrait,
      jmjLogo,
      beyondfoodsolutionLogo,
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
      beyondfoodsolutionProject,
      crmProject,
      lguProject,
      walkToEarnImg,
      awsImg,
      BASE_VOXEL_IMG,
      REVEAL_VOXEL_IMG,
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
      () => loadHeroVideo(),
      () => loadConnectVideo(),
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
