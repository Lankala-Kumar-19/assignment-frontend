import React, { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
  getProjectByName,
} from "../../api/projects";
import { toast } from "react-toastify";

const SectionWrapper = ({ title, children }) => (
  <section className="bg-white rounded-lg shadow p-6 mb-8">
    <h2 className="text-2xl font-semibold mb-4 text-gray-700">{title}</h2>
    {children}
  </section>
);

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", imageUrl: "" });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  // Load all projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data.content || []);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      toast.error("Failed to load projects");
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateProject(editId, form);
        toast.success("Project updated!");
      } else {
        await createProject(form);
        toast.success("Project added!");
      }
      setForm({ name: "", description: "", imageUrl: "" });
      setEditId(null);
      fetchProjects();
    } catch (error) {
      console.error("Failed to submit project:", error);
      toast.error(editId ? "Failed to update project." : "Failed to add project.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      toast.success("Project deleted!");
      fetchProjects();
    } catch (error) {
      console.error("Failed to delete project:", error);
      toast.error("Failed to delete project.");
    }
  };

  const handleEdit = (project) => {
    setForm({
      name: project.name,
      description: project.description,
      imageUrl: project.imageUrl || "",
    });
    setEditId(project.id);
  };

  const handleCancel = () => {
    setForm({ name: "", description: "", imageUrl: "" });
    setEditId(null);
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (!value.trim()) {
      // Reload all projects if search is empty
      fetchProjects();
      return;
    }

    try {
      const project = await getProjectByName(value.trim());
      setProjects(project ? [project] : []);
    } catch (error) {
      setProjects([]);
      console.error("Search failed:", error);
    }
  };

  return (
    <SectionWrapper title="Project Management">
      {/* Search */}
      

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mb-6">
        <input
          name="name"
          placeholder="Project Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          name="description"
          placeholder="Project Description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition duration-300 flex-grow"
          >
            {editId ? "Update Project" : "Add Project"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 rounded-md transition duration-300"
            >
              Cancel
            </button>
          )}
        
        </div>
      </form>

      {/* Slider */}
        <input
        type="text"
        placeholder="Search by project name..."
        value={search}
        onChange={handleSearchChange}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="flex overflow-x-auto gap-4 py-4">
        
        {projects.length === 0 && (
          <p className="text-gray-500">No projects found.</p>
        )}
        {projects.map((p) => (
          <div
            key={p.id}
            className="flex-shrink-0 w-64 bg-gray-100 rounded-lg shadow p-4 flex flex-col items-center"
          >
            <img
              src={p.imageUrl || "https://via.placeholder.com/150"}
              alt={p.name}
              className="h-40 w-full object-cover rounded mb-2"
            />
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="text-gray-600 text-sm text-center mb-2">{p.description}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(p)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default ProjectManagement;
