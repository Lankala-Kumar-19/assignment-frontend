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
  const [filteredClients, setFilteredClients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    designation: "",
    description: "",
    imageUrl: ""
  });
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const data = await getClients();
      setClients(data.content || []);
      setFilteredClients(data.content || []);
    } catch (error) {
      console.error("Failed to fetch clients:", error);
      toast.error("Failed to load clients.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
      setForm({ name: "", designation: "", description: "", imageUrl: "" });
      setEditId(null);
      fetchClients();
    } catch (error) {
      console.error("Error submitting client:", error);
      toast.error(editId ? "Failed to update client." : "Failed to add client.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteClient(id);
      toast.success("Client deleted!");
      fetchClients();
    } catch (error) {
      console.error("Error deleting client:", error);
      toast.error("Failed to delete client.");
    }
  };

  const handleEdit = (client) => {
    setForm({
      name: client.name,
      designation: client.designation,
      description: client.description,
      imageUrl: client.imageUrl || ""
    });
    setEditId(client.id);
  };

  const handleCancel = () => {
    setForm({ name: "", designation: "", description: "", imageUrl: "" });
    setEditId(null);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = clients.filter((c) =>
      c.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredClients(filtered);
  };

  return (
    <SectionWrapper title="Client Management">
      {/* Form */}
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

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full max-w-md mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Sliding Clients */}
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide py-2">
        {filteredClients.length === 0 && <p className="text-gray-500">No clients found.</p>}
        {filteredClients.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-lg shadow p-4 flex-shrink-0 w-60"
          >
            <img
              src={c.imageUrl || "https://via.placeholder.com/150"}
              alt={c.name}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-semibold">{c.name}</h3>
            <h4 className="text-gray-500 text-sm">{c.designation}</h4>
            <p className="text-gray-700 text-sm mt-1">{c.description}</p>
            <div className="flex gap-2 mt-2">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm flex-1"
                onClick={() => handleEdit(c)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm flex-1"
                onClick={() => handleDelete(c.id)}
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

export default ClientManagement;
