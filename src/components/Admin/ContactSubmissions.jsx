import React, { useEffect, useState } from "react";
import { getContactForms, deleteContactForm } from "../../api/contactForms";
import { toast } from "react-toastify";

const SectionWrapper = ({ title, children }) => (
  <section className="bg-white rounded-lg shadow p-6 mb-8">
    <h2 className="text-2xl font-semibold mb-4 text-gray-700">{title}</h2>
    {children}
  </section>
);

const ContactSubmissions = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await getContactForms();
      setContacts(data.content || []);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
      toast.error("Failed to load contacts.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteContactForm(id);
      toast.success("Contact deleted!");
      fetchContacts();
    } catch (error) {
      console.error("Failed to delete contact:", error);
      toast.error("Failed to delete contact.");
    }
  };

  return (
    <SectionWrapper title="Contact Form Submissions">
      <div className="max-h-96 overflow-y-auto border border-gray-200 rounded shadow">
        {contacts.length === 0 && (
          <p className="p-4 text-gray-500">No submissions yet.</p>
        )}
        <ul className="divide-y divide-gray-200">
          {contacts.map((c) => (
            <li
              key={c.id}
              className="flex justify-between items-center px-4 py-3 hover:bg-gray-50"
            >
              <div>
                <p className="text-gray-700 font-medium">{c.fullName}</p>
                <p className="text-gray-500 text-sm">{c.email}</p>
                <p className="text-gray-500 text-sm">{c.mobileNumber}</p>
                <p className="text-gray-500 text-sm">{c.city}</p>
              </div>
              <button
                onClick={() => handleDelete(c.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
};

export default ContactSubmissions;
