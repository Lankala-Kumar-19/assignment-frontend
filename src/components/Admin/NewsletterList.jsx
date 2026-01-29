import React, { useEffect, useState } from "react";
import { getSubscribers, deleteSubscriber } from "../../api/newsletters";
import { toast } from "react-toastify";

const SectionWrapper = ({ title, children }) => (
  <section className="bg-white rounded-lg shadow p-6 mb-8">
    <h2 className="text-2xl font-semibold mb-4 text-gray-700">{title}</h2>
    {children}
  </section>
);

const NewsletterList = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const data = await getSubscribers();
      setSubscribers(data.content || []);
    } catch (error) {
      console.error("Failed to fetch subscribers:", error);
      toast.error("Failed to load subscribers.");
    }
  };

  const handleDelete = async (email) => {
    try {
      await deleteSubscriber(email);
      toast.success(`${email} removed from subscribers!`);
      fetchSubscribers();
    } catch (error) {
      console.error("Failed to delete subscriber:", error);
      toast.error("Failed to delete subscriber.");
    }
  };

  return (
    <SectionWrapper title="Newsletter Subscribers">
      <div className="max-h-96 overflow-y-auto border border-gray-200 rounded shadow">
        {subscribers.length === 0 && (
          <p className="p-4 text-gray-500">No subscribers yet.</p>
        )}
        <ul className="divide-y divide-gray-200">
          {subscribers.map((s, index) => (
            <li
              key={index}
              className="flex justify-between items-center px-4 py-3 hover:bg-gray-50"
            >
              <span className="text-gray-700">{s.email}</span>
              <button
                onClick={() => handleDelete(s.email)}
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

export default NewsletterList;
