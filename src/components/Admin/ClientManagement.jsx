import React, { useEffect, useState } from "react";
import { getClients, createClient, deleteClient, updateClient } from "../../api/clients";
import { toast } from "react-toastify";

const SectionWrapper = ({ title, children }) => (
  <section className="bg-white rounded-lg shadow p-6 mb-8">
    <h2 className="text-2xl font-semibold mb-4 text-gray-700">{title}</h2>
    {children}
  </section>
);

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name: "", designation: "", description: "", image: "" });
  const [editId, setEditId] = useState(null); // track editing client id

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const data = await getClients();
    setClients(data.content);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateClient(editId, form);
        toast.success("Client updated!");
      } else {
        await createClient(form);
        toast.success("Client added!");
      }
      setForm({ name: "", designation: "", description: "", image: "" });
      setEditId(null);
      fetchClients();
    } catch {
      toast.error(editId ? "Failed to update client." : "Failed to add client.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteClient(id);
      toast.success("Client deleted!");
      fetchClients();
    } catch {
      toast.error("Failed to delete client.");
    }
  };

  const handleEdit = (client) => {
    setForm({
      name: client.name,
      designation: client.designation,
      description: client.description,
      image: client.image || "",
    });
    setEditId(client.id);
  };

  const handleCancel = () => {
    setForm({ name: "", designation: "", description: "", image: "" });
    setEditId(null);
  };

  return (
    <SectionWrapper title="Client Management">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mb-6">
        <input
          name="name"
          placeholder="Client Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          name="designation"
          placeholder="Designation"
          value={form.designation}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          name="description"
          placeholder="Description"
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
            {editId ? "Update Client" : "Add Client"}
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
              <th className="px-6 py-3 text-left text-gray-600 font-medium">Name</th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium">Designation</th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium">Description</th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium">Image</th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">{c.name}</td>
                <td className="px-6 py-3">{c.designation}</td>
                <td className="px-6 py-3">{c.description}</td>
                <td className="px-6 py-3">
                  <img
                    src={c.image || "https://via.placeholder.com/50"}
                    alt={c.name}
                    className="h-12 w-12 rounded object-cover"
                  />
                </td>
                <td className="px-6 py-3 flex gap-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-300"
                    onClick={() => handleEdit(c)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-300"
                    onClick={() => handleDelete(c.id)}
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

export default ClientManagement;
