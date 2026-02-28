import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddProject from "../components/AddProject";
import AddClient from "../components/AddClient";
import ContactList from "../components/ContactList";
import SubscriberList from "../components/SubscriberList";
import Logo from "../assets/images/logo.svg";
import "../admin-dashboard.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("projects");
  const navigate = useNavigate();

  const handleLogout = () => {
      localStorage.removeItem("token");
      window.location.href = "/login";
  };

  const tabs = [
    { id: "projects", label: "Manage Projects" },
    { id: "clients", label: "Manage Clients" },
    { id: "contacts", label: "Contact Submissions" },
    { id: "subscribers", label: "Newsletter Subscribers" }
  ];

  const getTitle = () => {
    switch(activeTab) {
      case "projects": return "Project Management";
      case "clients": return "Client Management";
      case "contacts": return "Contact Responses";
      case "subscribers": return "Subscribed Emails";
      default: return "Dashboard";
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <img src={Logo} alt="Logo" className="sidebar-logo" />
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)} 
              className={`nav-button ${activeTab === tab.id ? "active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
            <button onClick={() => navigate('/')} className="back-button">
                ← Back to Home
            </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <header className="admin-header">
            <div>
                <h1 className="admin-title">{getTitle()}</h1>
                <p className="admin-subtitle">View and manage your application data.</p>
            </div>
        </header>
        
        {/* Dynamic Component Rendering */}
        <div className="admin-content-card">
            {activeTab === "projects" && <AddProject />}
            {activeTab === "clients" && <AddClient />}
            {activeTab === "contacts" && <ContactList />}
            {activeTab === "subscribers" && <SubscriberList />}
        </div>
      </main>
    </div>
  );
}
