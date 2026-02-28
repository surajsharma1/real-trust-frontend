import { useEffect, useState } from "react";
import API from "../services/api";

export default function SubscriberList() {
  const [subs, setSubs] = useState([]);

  // Static fallback data for demonstration
  const fallbackSubs = [
    { _id: "1", email: "subscriber1@example.com" },
    { _id: "2", email: "subscriber2@example.com" },
    { _id: "3", email: "subscriber3@example.com" },
    { _id: "4", email: "subscriber4@example.com" },
  ];

  useEffect(() => {
    API.get("/subscribe")
      .then(res => {
        if (res.data && res.data.length > 0) {
          setSubs(res.data);
        }
      })
      .catch(err => {
        console.log("Using fallback subscribers data");
        setSubs(fallbackSubs);
      });
  }, []);

  // Use fallback data if no subscribers from API
  const displaySubs = subs.length > 0 ? subs : fallbackSubs;

  return (
    <div className="max-w-md border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <h3 className="text-xs font-medium text-gray-500 uppercase">Email Addresses</h3>
        </div>
        <ul className="divide-y divide-gray-200 bg-white">
            {displaySubs.map(s => (
                <li key={s._id} className="px-6 py-4 text-sm text-gray-800 hover:bg-gray-50">
                    {s.email}
                </li>
            ))}
            {displaySubs.length === 0 && <li className="px-6 py-4 text-sm text-gray-500 text-center">No subscribers yet.</li>}
        </ul>
    </div>
  );
}
