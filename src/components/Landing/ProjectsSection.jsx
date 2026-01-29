import React, { useEffect, useState } from "react";
import { getProjects } from "../../api/projects";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const data = await getProjects();
    setProjects(data.content);
  };

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Our Projects</h2>

      <div className="flex space-x-6 overflow-x-auto scrollbar-hide px-2">
        {projects.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition
                       p-4 flex-shrink-0 w-72 flex flex-col"
          >
            <img
              src={p.image || "https://via.placeholder.com/300x180"}
              alt={p.name}
              className="w-full h-44 object-cover rounded"
            />
            <h3 className="mt-4 text-lg font-semibold">{p.name}</h3>
            <p className="text-gray-600 mt-2 flex-grow">
              {p.description}
            </p>
            <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-semibold">
              Read More
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
