import React from "react";
import ProjectManagement from "../components/Admin/ProjectManagement";
import ClientManagement from "../components/Admin/ClientManagement";
import ContactSubmissions from "../components/Admin/ContactSubmissions";
import NewsletterList from "../components/Admin/NewsletterList";
// import "../assests/styles/admin.css";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8 space-y-12">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Admin Panel
        </h1>

        <ProjectManagement />
        <ClientManagement />
        <ContactSubmissions />
        <NewsletterList />
      </div>
    </div>
  );
};


export default AdminPage;
