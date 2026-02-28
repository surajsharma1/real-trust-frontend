import { useEffect, useState } from "react";
import API from "../services/api";

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get("/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '60px 0', backgroundColor: '#f9fafb' }}>
      <h2 className="section-title">Our Projects</h2>
      <div className="projects-grid">
        {projects.map(project => (
          <div key={project._id} className="project-card">
            <img src={project.image || "https://via.placeholder.com/400x250"} alt={project.name} />
            <div className="project-content">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <button className="read-more">READ MORE</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}