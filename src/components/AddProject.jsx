import { useState, useRef } from "react";
import API from "../services/api";

export default function AddProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !description || !image) return alert("All fields are required");
    
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);

    try {
        await API.post("/projects", formData, { headers: { "Content-Type": "multipart/form-data" }});
        alert("Project added successfully!");
        setName("");
        setDescription("");
        setImage(null);
        if(fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
        alert("Failed to add project.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-xl space-y-4">
      <div className="form-group-admin">
          <label className="form-label">Project Name</label>
          <input className="form-input-admin" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div className="form-group-admin">
          <label className="form-label">Description</label>
          <textarea className="form-input-admin form-textarea" value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div className="form-group-admin">
          <label className="form-label">Project Image</label>
          <input type="file" ref={fileInputRef} className="form-file-input" accept="image/*" onChange={e => setImage(e.target.files[0])} />
      </div>
      <button type="submit" disabled={loading} className="btn-primary-admin">
          {loading ? "Adding..." : "Add Project"}
      </button>
    </form>
  );
}
