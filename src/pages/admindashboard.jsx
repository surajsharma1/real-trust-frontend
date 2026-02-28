import { useState } from "react";
import AddProject from "../components/AddProject";
import AddClient from "../components/AddClient";
import ContactList from "../components/ContactList";
import SubscriberList from "../components/SubscriberList";

export default function AdminDashboard() {

  const [activeTab, setActiveTab] = useState("projects");

  const handleLogout = () => {
      localStorage.removeItem("token");
      window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col shadow-xl">
        <div className="p-6 text-2xl font-bold border-b border-blue-800 text-center tracking-wider">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4 text-sm font-medium">
          <button 
            onClick={() => setActiveTab("projects")} 
            className={`w-full text-left p-3 rounded transition ${activeTab === "projects" ? "bg-blue-700 shadow-inner" : "hover:bg-blue-800"}`}
          >
            Manage Projects
          </button>
          <button 
            onClick={() => setActiveTab("clients")} 
            className={`w-full text-left p-3 rounded transition ${activeTab === "clients" ? "bg-blue-700 shadow-inner" : "hover:bg-blue-800"}`}
          >
            Manage Clients
          </button>
          <button 
            onClick={() => setActiveTab("contacts")} 
            className={`w-full text-left p-3 rounded transition ${activeTab === "contacts" ? "bg-blue-700 shadow-inner" : "hover:bg-blue-800"}`}
          >
            Contact Submissions
          </button>
          <button 
            onClick={() => setActiveTab("subscribers")} 
            className={`w-full text-left p-3 rounded transition ${activeTab === "subscribers" ? "bg-blue-700 shadow-inner" : "hover:bg-blue-800"}`}
          >
            Newsletter Subscribers
          </button>
        </nav>
        <div className="p-4 border-t border-blue-800">
            <button 
                onClick={handleLogout} 
                className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded transition font-semibold"
            >
                Logout
            </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 capitalize">
                {activeTab === "projects" && "Project Management"}
                {activeTab === "clients" && "Client Management"}
                {activeTab === "contacts" && "Contact Responses"}
                {activeTab === "subscribers" && "Subscribed Emails"}
            </h1>
            <p className="text-gray-500 mt-1 text-sm">View and manage your application data.</p>
        </header>
        
        {/* Dynamic Component Rendering */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            {activeTab === "projects" && <AddProject />}
            {activeTab === "clients" && <AddClient />}
            {activeTab === "contacts" && <ContactList />}
            {activeTab === "subscribers" && <SubscriberList />}
        </div>
      </main>
    </div>
  );
}