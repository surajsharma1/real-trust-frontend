import { useEffect, useState } from "react";
import API from "../services/api";

export default function SubscriberList() {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    API.get("/subscribe").then(res => setSubs(res.data)).catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-md border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <h3 className="text-xs font-medium text-gray-500 uppercase">Email Addresses</h3>
        </div>
        <ul className="divide-y divide-gray-200 bg-white">
            {subs.map(s => (
                <li key={s._id} className="px-6 py-4 text-sm text-gray-800 hover:bg-gray-50">
                    {s.email}
                </li>
            ))}
            {subs.length === 0 && <li className="px-6 py-4 text-sm text-gray-500 text-center">No subscribers yet.</li>}
        </ul>
    </div>
  );
}