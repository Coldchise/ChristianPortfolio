import { useParams } from "react-router-dom";

export default function ProjectsDetail() {
  const { id } = useParams<{ id: string }>();

  return (
    <main className="min-h-screen py-20 bg-[#070b0a] text-white">
      <h1 className="text-4xl font-bold text-center">Project {id}</h1>
    </main>
  );
}
