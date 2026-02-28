import { useState, useRef } from "react";
import API from "../services/api";

export default function AddClient() {
  const [client, setClient] = useState({ name: "", designation: "", description: "" });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", client.name);
    formData.append("designation", client.designation);
    formData.append("description", client.description);
    if(image) formData.append("image", image);

    try {
        await API.post("/clients", formData, { headers: { "Content-Type": "multipart/form-data" }});
        alert("Client Added successfully!");
        setClient({ name: "", designation: "", description: "" });
        setImage(null);
        if(fileInputRef.current) fileInputRef.current.value = "";
    } catch(err) {
        alert("Failed to add client.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-xl space-y-4">
      <div className="form-group-admin">
          <label className="form-label">Client Name</label>
          <input required className="form-input-admin" value={client.name} onChange={e => setClient({...client, name: e.target.value})} />
      </div>
      <div className="form-group-admin">
          <label className="form-label">Designation</label>
          <input required className="form-input-admin" placeholder="e.g. CEO" value={client.designation} onChange={e => setClient({...client, designation: e.target.value})} />
      </div>
      <div className="form-group-admin">
          <label className="form-label">Testimonial Description</label>
          <textarea required className="form-input-admin form-textarea" value={client.description} onChange={e => setClient({...client, description: e.target.value})} />
      </div>
      <div className="form-group-admin">
          <label className="form-label">Profile Image</label>
          <input type="file" ref={fileInputRef} required className="form-file-input" accept="image/*" onChange={e => setImage(e.target.files[0])} />
      </div>
      <button type="submit" disabled={loading} className="btn-primary-admin">
         {loading ? "Adding..." : "Add Client"}
      </button>
    </form>
  );
}
