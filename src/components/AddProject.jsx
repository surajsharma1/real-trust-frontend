import { useState, useRef, useEffect } from "react";
import API from "../services/api";

export default function AddProject() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  // Form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const fileInputRef = useRef(null);

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setFetching(true);
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects");
    } finally {
      setFetching(false);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setImage(null);
    setExistingImage("");
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setName(project.name);
    setDescription(project.description);
    setExistingImage(project.image);
    setImage(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    
    try {
      await API.delete(`/projects/${id}`);
      alert("Project deleted successfully!");
      fetchProjects();
    } catch (err) {
      alert("Failed to delete project.");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !description) return alert("Name and description are required");
    
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      if (editingId) {
        await API.put(`/projects/${editingId}`, formData, { 
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert("Project updated successfully!");
      } else {
        if (!image) return alert("Image is required for new project");
        await API.post("/projects", formData, { 
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert("Project added successfully!");
      }
      resetForm();
      fetchProjects();
    } catch (err) {
      alert(editingId ? "Failed to update project." : "Failed to add project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manage-items-container">
      {/* Form Section */}
      <div className="item-form-section">
        <h3>{editingId ? "Edit Project" : "Add New Project"}</h3>
        <form onSubmit={submit} className="item-form">
          <div className="form-group-admin">
            <label className="form-label">Project Name</label>
            <input 
              className="form-input-admin" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="Enter project name"
            />
          </div>
          <div className="form-group-admin">
            <label className="form-label">Description</label>
            <textarea 
              className="form-input-admin form-textarea" 
              value={description} 
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter project description"
            />
          </div>
          <div className="form-group-admin">
            <label className="form-label">Project Image {editingId ? "(leave empty to keep existing)" : ""}</label>
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
              {loading ? (editingId ? "Updating..." : "Adding...") : (editingId ? "Update Project" : "Add Project")}
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
        <h3>Existing Projects ({projects.length})</h3>
        {fetching ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="empty-message">No projects yet. Add your first project above.</p>
        ) : (
          <div className="items-grid">
            {projects.map(project => (
              <div key={project._id} className="item-card">
                <div className="item-image">
                  <img src={project.image} alt={project.name} />
                </div>
                <div className="item-details">
                  <h4>{project.name}</h4>
                  <p>{project.description.substring(0, 100)}...</p>
                </div>
                <div className="item-actions">
                  <button onClick={() => handleEdit(project)} className="btn-edit">
                    ✏️ Edit
                  </button>
                  <button onClick={() => handleDelete(project._id)} className="btn-delete">
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
