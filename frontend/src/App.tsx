import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ProjectsDetail from "./pages/ProjectsDetail";
import TargetCursor from "./components/TargetCursor";

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
        <Route path="/about" element={<About />} />
        <Route path="/projects/:id" element={<ProjectsDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
