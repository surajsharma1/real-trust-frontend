import { useEffect, useState } from "react";
import API from "../services/api";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);

  // Static fallback data for demonstration
  const fallbackContacts = [
    {
      _id: "1",
      fullName: "Emily Davis",
      email: "emily@example.com",
      mobile: "+1 234 567 8901",
      city: "New York",
    },
    {
      _id: "2",
      fullName: "Robert Wilson",
      email: "robert@example.com",
      mobile: "+1 234 567 8902",
      city: "Los Angeles",
    },
    {
      _id: "3",
      fullName: "Jennifer Martinez",
      email: "jennifer@example.com",
      mobile: "+1 234 567 8903",
      city: "Chicago",
    },
  ];

  useEffect(() => {
    API.get("/contact")
      .then(res => {
        if (res.data && res.data.length > 0) {
          setContacts(res.data);
        }
      })
      .catch(err => {
        console.log("Using fallback contacts data");
        setContacts(fallbackContacts);
      });
  }, []);

  // Use fallback data if no contacts from API
  const displayContacts = contacts.length > 0 ? contacts : fallbackContacts;

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {displayContacts.map(c => (
            <tr key={c._id}>
              <td>{c.fullName}</td>
              <td>{c.email}</td>
              <td>{c.mobile}</td>
              <td>{c.city}</td>
            </tr>
          ))}
          {displayContacts.length === 0 && <tr><td colSpan="4" className="empty-state">No submissions yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
