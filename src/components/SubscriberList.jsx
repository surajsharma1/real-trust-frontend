import { useEffect, useState } from "react";
import API from "../services/api";

export default function SubscriberList() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get("/subscribe");
      setSubs(res.data || []);
    } catch (err) {
      console.error("Failed to fetch subscribers:", err);
      setError("Failed to load subscribers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subscriber?")) return;
    
    try {
      await API.delete(`/subscribe/${id}`);
      alert("Subscriber deleted successfully!");
      fetchSubscribers();
    } catch (err) {
      alert("Failed to delete subscriber.");
    }
  };

  if (loading) {
    return <div className="loading-message">Loading subscribers...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message-admin">{error}</p>
        <button onClick={fetchSubscribers} className="btn-primary-admin">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="list-container">
      <div className="list-header">
        <h3>Newsletter Subscribers ({subs.length})</h3>
      </div>
      
      {subs.length === 0 ? (
        <div className="empty-state">
          <p>No subscribers yet.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Email Address</th>
                <th>Subscribed Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subs.map(s => (
                <tr key={s._id}>
                  <td>
                    <a href={`mailto:${s.email}`} className="table-link">
                      {s.email}
                    </a>
                  </td>
                  <td>{s.createdAt ? new Date(s.createdAt).toLocaleDateString() : 'N/A'}</td>
                  <td className="actions-cell">
                    <button 
                      onClick={() => handleDelete(s._id)} 
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
