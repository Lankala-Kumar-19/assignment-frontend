import React, { useEffect, useState } from "react";
import { getContactForms } from "../../api/contactForms";

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
    const data = await getContactForms();
    setContacts(data.content);
  };

  return (
    <SectionWrapper title="Contact Form Submissions">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-gray-600 font-medium">Full Name</th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium">Email</th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium">Mobile</th>
              <th className="px-6 py-3 text-left text-gray-600 font-medium">City</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contacts.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">{c.fullName}</td>
                <td className="px-6 py-3">{c.email}</td>
                <td className="px-6 py-3">{c.mobileNumber}</td>
                <td className="px-6 py-3">{c.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
};

export default ContactSubmissions;
