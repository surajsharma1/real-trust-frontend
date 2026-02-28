import { useEffect, useState } from "react";
import API from "../services/api";

export default function ClientsSection() {
  const [clients, setClients] = useState([]);

  const fallbackClients = [
    {
      _id: "1",
      name: "John Smith",
      designation: "CEO, TechCorp",
      description: "Exceptional service and attention to detail. The team delivered our project on time and within budget.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
    {
      _id: "2",
      name: "Sarah Johnson",
      designation: "Director, RealEstate Inc",
      description: "Professional and reliable. We are extremely satisfied with the construction quality.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    },
    {
      _id: "3",
      name: "Michael Brown",
      designation: "Owner, Brown Enterprises",
      description: "Outstanding craftsmanship and excellent communication throughout the project.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    },
  ];

  useEffect(() => {
    API.get("/clients")
      .then(res => {
        if (res.data && res.data.length > 0) {
          setClients(res.data);
        }
      })
      .catch(err => {
        console.log("Using fallback clients data");
        setClients(fallbackClients);
      });
  }, []);

  const displayClients = clients.length > 0 ? clients : fallbackClients;

  return (
    <div style={{ padding: '60px 0', backgroundColor: 'white' }}>
      <h2 className="section-title">Happy Clients</h2>
      <div className="clients-grid">
        {displayClients.map(client => (
          <div key={client._id} className="client-card">
            <div className="client-img-wrapper">
                <img src={client.image || "https://via.placeholder.com/150"} alt={client.name} />
            </div>
            <p className="client-desc">"{client.description}"</p>
            <h4 className="client-name">{client.name}</h4>
            <span className="client-desig">{client.designation}</span>
            <button 
              className="read-more" 
              style={{ marginTop: '10px' }}
              onClick={() => alert("Read more coming soon!")}
            >
              READ MORE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
