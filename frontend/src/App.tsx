import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TargetCursor from "./components/TargetCursor";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import InteractiveHub from "./components/InteractiveHub";
import LoadingScreen from "./components/LoadingScreen";
import TechStack from "./components/TechStack";

function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen bg-[#070b0a] text-white">
      {children}
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <TargetCursor
        spinDuration={3}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.95}
      />
      <Routes>
        <Route path="/" element={<Home />} />

        {/*test*/}
        <Route path="/experience" element={<TestWrapper><Experience /></TestWrapper>} />
        <Route path="/footer" element={<TestWrapper><Footer /></TestWrapper>} />
        <Route path="/header" element={<TestWrapper><Header /></TestWrapper>} />
        <Route path="/hero" element={<TestWrapper><Hero /></TestWrapper>} />
        <Route path="/interactivehub" element={<TestWrapper><InteractiveHub /></TestWrapper>} />
        <Route path="/loadingscreen" element={<TestWrapper><LoadingScreen /></TestWrapper>} />
        <Route path="/techstack" element={<TestWrapper><TechStack /></TestWrapper>} />
      </Routes>
    </BrowserRouter>
  );
}
