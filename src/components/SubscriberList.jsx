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
    <div className="subscriber-list">
        <div className="subscriber-header">
            <h3>Email Addresses</h3>
        </div>
        <ul className="subscriber-list-items">
            {displaySubs.map(s => (
                <li key={s._id}>
                    {s.email}
                </li>
            ))}
            {displaySubs.length === 0 && <li className="empty-state">No subscribers yet.</li>}
        </ul>
    </div>
  );
}
