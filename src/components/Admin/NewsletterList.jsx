import React, { useEffect, useState } from "react";
import { getSubscribers } from "../../api/newsletters";

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
    const data = await getSubscribers();
    setSubscribers(data.content);
  };

  return (
    <SectionWrapper title="Newsletter Subscribers">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-gray-600 font-medium">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subscribers.map((s, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-3">{s.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
};

export default NewsletterList;
