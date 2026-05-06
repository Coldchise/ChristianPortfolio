import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import TechStack from "../components/TechStack";
import InteractiveHub from "../components/InteractiveHub";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const [heroTop, setHeroTop] = useState(0);
  const [techTop, setTechTop] = useState(0);
  const [hubTop, setHubTop] = useState(0);

  useEffect(() => {
    // For each sticky section: if its content is taller than the viewport,
    // use a negative "top" so it scrolls naturally through its full height
    // before sticking. Once its bottom aligns with the viewport bottom, it
    // sticks and the next section slides over it.
    const calculate = () => {
      const viewportH = window.innerHeight;
      if (heroRef.current) {
        setHeroTop(Math.min(0, -(heroRef.current.offsetHeight - viewportH)));
      }
      if (techRef.current) {
        setTechTop(Math.min(0, -(techRef.current.offsetHeight - viewportH)));
      }
      if (hubRef.current) {
        setHubTop(Math.min(0, -(hubRef.current.offsetHeight - viewportH)));
      }
    };

    calculate();

    window.addEventListener("resize", calculate);
    const ro = new ResizeObserver(calculate);
    if (heroRef.current) ro.observe(heroRef.current);
    if (techRef.current) ro.observe(techRef.current);
    if (hubRef.current) ro.observe(hubRef.current);

    return () => {
      window.removeEventListener("resize", calculate);
      ro.disconnect();
    };
  }, []);

  return (
    <main className="relative bg-[#070b0a] text-white">
      <LoadingScreen />
      <Header />
      <div className="relative">
        {/* Hero - sticky z-0 */}
        <div
          id="about-me"
          ref={heroRef}
          className="sticky z-0 scroll-mt-24"
          style={{ top: `${heroTop}px` }}
        >
          <Hero />
        </div>

        <div
          className="h-[62svh] sm:h-[52svh] lg:h-[42vh]"
          aria-hidden="true"
        />

        {/* TechStack - sticky z-10 (slides over Hero) */}
        <div
          id="my-tech-stacks"
          ref={techRef}
          className="sticky z-10 scroll-mt-24"
          style={{ top: `${techTop}px` }}
        >
          <TechStack />
        </div>

        <div
          className="h-[62svh] sm:h-[52svh] lg:h-[42vh]"
          aria-hidden="true"
        />

        {/* InteractiveHub - sticky z-20 (slides over TechStack) */}
        <div
          id="my-projects"
          ref={hubRef}
          className="sticky z-20 scroll-mt-24"
          style={{ top: `${hubTop}px` }}
        >
          <InteractiveHub />
        </div>

        <div
          className="h-[62svh] sm:h-[52svh] lg:h-[42vh]"
          aria-hidden="true"
        />

        {/* Experience - relative z-30 (slides over InteractiveHub) */}
        <div id="experience" className="relative z-30 scroll-mt-24">
          <Experience />
        </div>

        <div className="relative z-40">
          <Footer />
        </div>
      </div>
    </main>
  );
}
