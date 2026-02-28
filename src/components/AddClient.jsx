import { useState, useRef, useEffect } from "react";
import API from "../services/api";

export default function AddClient() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  // Form fields
  const [client, setClient] = useState({ name: "", designation: "", description: "" });
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const fileInputRef = useRef(null);

  // Fetch clients on mount
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setFetching(true);
    try {
      const res = await API.get("/clients");
      setClients(res.data);
    } catch (err) {
      console.error("Failed to fetch clients");
    } finally {
      setFetching(false);
    }
  };

  const resetForm = () => {
    setClient({ name: "", designation: "", description: "" });
    setImage(null);
    setExistingImage("");
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setClient({ name: item.name, designation: item.designation, description: item.description });
    setExistingImage(item.image);
    setImage(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client testimonial?")) return;
    
    try {
      await API.delete(`/clients/${id}`);
      alert("Client deleted successfully!");
      fetchClients();
    } catch (err) {
      alert("Failed to delete client.");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!client.name || !client.description) return alert("Name and description are required");
    
    setLoading(true);
    const formData = new FormData();
    formData.append("name", client.name);
    formData.append("designation", client.designation);
    formData.append("description", client.description);
    if (image) {
      formData.append("image", image);
    }

    try {
      if (editingId) {
        await API.put(`/clients/${editingId}`, formData, { 
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert("Client updated successfully!");
      } else {
        if (!image) return alert("Image is required for new client");
        await API.post("/clients", formData, { 
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert("Client added successfully!");
      }
      resetForm();
      fetchClients();
    } catch (err) {
      alert(editingId ? "Failed to update client." : "Failed to add client.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manage-items-container">
      {/* Form Section */}
      <div className="item-form-section">
        <h3>{editingId ? "Edit Client" : "Add New Client"}</h3>
        <form onSubmit={submit} className="item-form">
          <div className="form-group-admin">
            <label className="form-label">Client Name</label>
            <input 
              required
              className="form-input-admin" 
              value={client.name} 
              onChange={e => setClient({...client, name: e.target.value})}
              placeholder="Enter client name"
            />
          </div>
          <div className="form-group-admin">
            <label className="form-label">Designation</label>
            <input 
              required
              className="form-input-admin" 
              placeholder="e.g. CEO"
              value={client.designation} 
              onChange={e => setClient({...client, designation: e.target.value})}
            />
          </div>
          <div className="form-group-admin">
            <label className="form-label">Testimonial Description</label>
            <textarea 
              required
              className="form-input-admin form-textarea" 
              value={client.description} 
              onChange={e => setClient({...client, description: e.target.value})}
              placeholder="Enter testimonial description"
            />
          </div>
          <div className="form-group-admin">
            <label className="form-label">Profile Image {editingId ? "(leave empty to keep existing)" : ""}</label>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="form-file-input" 
              accept="image/*" 
              onChange={e => setImage(e.target.files[0])}
            />
          </div>
          
          {existingImage && (
            <div className="current-image-preview">
              <p>Current Image:</p>
              <img src={existingImage} alt="Current" />
            </div>
          )}
          
          <div className="form-buttons">
            <button type="submit" disabled={loading} className="btn-primary-admin">
              {loading ? (editingId ? "Updating..." : "Adding...") : (editingId ? "Update Client" : "Add Client")}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="btn-secondary-admin">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List Section */}
      <div className="item-list-section">
        <h3>Existing Clients ({clients.length})</h3>
        {fetching ? (
          <p>Loading clients...</p>
        ) : clients.length === 0 ? (
          <p className="empty-message">No clients yet. Add your first client above.</p>
        ) : (
          <div className="items-grid">
            {clients.map(item => (
              <div key={item._id} className="item-card">
                <div className="item-image client-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="item-designation">{item.designation}</p>
                  <p className="item-description">{item.description.substring(0, 80)}...</p>
                </div>
                <div className="item-actions">
                  <button onClick={() => handleEdit(item)} className="btn-edit">
                    ✏️ Edit
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="btn-delete">
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
