import { useEffect, useState } from "react";
import API from "../services/api";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    API.get("/contact").then(res => setContacts(res.data)).catch(err => console.error(err));
  }, []);

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Full Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {contacts.map(c => (
            <tr key={c._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{c.fullName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.mobile}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.city}</td>
            </tr>
          ))}
          {contacts.length === 0 && <tr><td colSpan="4" className="text-center py-4 text-gray-500">No submissions yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}