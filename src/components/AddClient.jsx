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
      <div className="grid grid-cols-2 gap-4">
          <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
              <input required className="w-full p-2 border rounded" value={client.name} onChange={e => setClient({...client, name: e.target.value})} />
          </div>
          <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
              <input required className="w-full p-2 border rounded" placeholder="e.g. CEO" value={client.designation} onChange={e => setClient({...client, designation: e.target.value})} />
          </div>
      </div>
      <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial Description</label>
          <textarea required className="w-full p-2 border rounded h-24" value={client.description} onChange={e => setClient({...client, description: e.target.value})} />
      </div>
      <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
          <input type="file" ref={fileInputRef} required className="w-full p-2 border rounded bg-gray-50" accept="image/*" onChange={e => setImage(e.target.files[0])} />
      </div>
      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300">
         {loading ? "Adding..." : "Add Client"}
      </button>
    </form>
  );
}