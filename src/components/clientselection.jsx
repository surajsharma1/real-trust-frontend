import { useEffect, useState } from "react";
import API from "../services/api";

export default function ClientsSection() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    API.get("/clients").then(res => setClients(res.data)).catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '60px 0', backgroundColor: 'white' }}>
      <h2 className="section-title">Happy Clients</h2>
      <div className="clients-grid">
        {clients.map(client => (
          <div key={client._id} className="client-card">
            <div className="client-img-wrapper">
                <img src={client.image || "https://via.placeholder.com/150"} alt={client.name} />
            </div>
            <p className="client-desc">"{client.description}"</p>
            <h4 className="client-name">{client.name}</h4>
            <span className="client-desig">{client.designation}</span>
          </div>
        ))}
      </div>
    </div>
  );
}