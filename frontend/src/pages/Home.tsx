import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Scene from "../components/Scene";

export default function Home() {
  return (
    <main>
      <div className="relative">
        <Scene />
        <Hero />
      </div>
      <Projects />
      <Contact />
    </main>
  );
}
