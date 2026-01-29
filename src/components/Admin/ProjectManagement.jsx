import React, { useEffect, useState } from "react";
import { getProjects, createProject, deleteProject, updateProject } from "../../api/projects";
import { toast } from "react-toastify";

const SectionWrapper = ({ title, children }) => (
  <section className="bg-white rounded-lg shadow p-6 mb-8">
    <h2 className="text-2xl font-semibold mb-4 text-gray-700">{title}</h2>
    {children}
  </section>
);

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", image: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const data = await getProjects();
    setProjects(data.content);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
      setForm({ name: "", description: "", image: "" });
      setEditId(null);
      fetchProjects();
    } catch {
      toast.error(editId ? "Failed to update project." : "Failed to add project.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      toast.success("Project deleted!");
      fetchProjects();
    } catch {
      toast.error("Failed to delete project.");
    }
  };

  const handleEdit = (project) => {
    setForm({
      name: project.name,
      description: project.description,
      image: project.image || "",
    });
    setEditId(project.id);
  };

  const handleCancel = () => {
    setForm({ name: "", description: "", image: "" });
    setEditId(null);
  };

  return (
    <SectionWrapper title="Project Management">
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
          name="image"
          placeholder="Image URL"
          value={form.image}
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

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">Name</th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">Description</th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">Image</th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.description}</td>
                <td className="px-4 py-2">
                  <img
                    src={p.image || "https://via.placeholder.com/50"}
                    alt={p.name}
                    className="h-12 w-12 rounded object-cover"
                  />
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-300"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-300"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
};

export default ProjectManagement;
