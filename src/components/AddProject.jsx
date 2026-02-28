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
      <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
          <input className="w-full p-2 border rounded" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea className="w-full p-2 border rounded h-24" value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
          <input type="file" ref={fileInputRef} className="w-full p-2 border rounded bg-gray-50" accept="image/*" onChange={e => setImage(e.target.files[0])} />
      </div>
      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300">
          {loading ? "Adding..." : "Add Project"}
      </button>
    </form>
  );
}