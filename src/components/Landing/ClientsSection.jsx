import React, { useEffect, useState } from "react";
import { getClients } from "../../api/clients";

const ClientsSection = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true); // new loading state

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true); // start loading
    try {
      const data = await getClients();
      setClients(data.content);
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Happy Clients</h2>

      {loading ? (
        <div className="text-center text-gray-500 font-semibold">
          Loading clients...
        </div>
      ) : (
        <div className="flex space-x-6 overflow-x-auto scrollbar-hide px-2">
          {clients.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded shadow p-4 flex-shrink-0 w-48"
            >
              <img
                src={
                  c.imageUrl ||
                  "https://via.placeholder.com/150x112?text=Client+Image"
                }
                alt={c.name}
                className="w-full h-28 object-cover rounded mb-2"
              />
              <h3 className="text-md font-semibold">{c.name}</h3>
              <h4 className="text-gray-500 text-sm">{c.designation}</h4>
              <p className="text-gray-700 text-sm mt-1">{c.description}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ClientsSection;
