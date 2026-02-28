import { useEffect, useState } from "react";
import API from "../services/api";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get("/contact");
      setContacts(res.data || []);
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
      setError("Failed to load contacts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact submission?")) return;
    
    try {
      await API.delete(`/contact/${id}`);
      alert("Contact deleted successfully!");
      fetchContacts();
    } catch (err) {
      alert("Failed to delete contact.");
    }
  };

  if (loading) {
    return <div className="loading-message">Loading contacts...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message-admin">{error}</p>
        <button onClick={fetchContacts} className="btn-primary-admin">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="list-container">
      <div className="list-header">
        <h3>Contact Submissions ({contacts.length})</h3>
      </div>
      
      {contacts.length === 0 ? (
        <div className="empty-state">
          <p>No contact submissions yet.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>City</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(c => (
                <tr key={c._id}>
                  <td>{c.fullName}</td>
                  <td>
                    <a href={`mailto:${c.email}`} className="table-link">
                      {c.email}
                    </a>
                  </td>
                  <td>
                    <a href={`tel:${c.mobile}`} className="table-link">
                      {c.mobile}
                    </a>
                  </td>
                  <td>{c.city}</td>
                  <td className="actions-cell">
                    <button 
                      onClick={() => handleDelete(c._id)} 
                      className="btn-delete"
                      title="Delete"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
