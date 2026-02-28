import { useEffect, useState } from "react";
import API from "../services/api";

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);

  const fallbackProjects = [
    {
      _id: "1",
      name: "Modern Villa Construction",
      description: "A beautiful modern villa with panoramic views and luxury amenities.",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
    },
    {
      _id: "2",
      name: "Commercial Complex",
      description: "State-of-the-art commercial building with modern infrastructure.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
    },
    {
      _id: "3",
      name: "Residential Apartment",
      description: "Luxurious residential apartments with premium facilities.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
    },
    {
      _id: "4",
      name: "Office Building",
      description: "Modern office space designed for productivity and comfort.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    },
  ];

  useEffect(() => {
    API.get("/projects")
      .then(res => {
        if (res.data && res.data.length > 0) {
          setProjects(res.data);
        }
      })
      .catch(err => {
        console.log("Using fallback projects data");
        setProjects(fallbackProjects);
      });
  }, []);

  const displayProjects = projects.length > 0 ? projects : fallbackProjects;

  return (
    <div style={{ padding: '60px 0', backgroundColor: '#f9fafb' }}>
      <h2 className="section-title">Our Projects</h2>
      <div className="projects-grid">
        {displayProjects.map(project => (
          <div key={project._id} className="project-card">
            <img src={project.image || "https://via.placeholder.com/400x250"} alt={project.name} />
            <div className="project-content">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <button 
                className="read-more" 
                onClick={() => alert("Read more coming soon!")}
              >
                READ MORE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
