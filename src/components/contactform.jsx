import { useState } from "react";
import API from "../services/api";

export default function ContactForm() {
  const [form, setForm] = useState({ 
    fullName: "", 
    email: "", 
    mobile: "", 
    city: "" 
  });
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setStatus("Submitting...");
    
    try {
      const response = await API.post("/contact", form);
      if (response.data) {
        setStatus("✓ Thank you! We'll contact you soon.");
        setIsError(false);
        setForm({ fullName: "", email: "", mobile: "", city: "" });
      }
    } catch (error) {
      setStatus("✕ Failed to submit. Please try again.");
      setIsError(true);
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatus(""), 5000);
    }
  };

  return (
    <div className="contact-card">
      <div className="contact-card-header">
        <h2>Get a Free<br/>Consultation</h2>
        <p>Fill out the form below and our team will get back to you within 24 hours.</p>
      </div>
      
      <form onSubmit={submitForm} className="contact-form">
        <div className="form-row">
          <div className="form-group-contact">
            <label htmlFor="fullName">Full Name</label>
            <input 
              required 
              id="fullName"
              placeholder="John Doe" 
              value={form.fullName}
              onChange={e => setForm({ ...form, fullName: e.target.value })}
              className="form-input-contact"
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group-contact">
            <label htmlFor="email">Email Address</label>
            <input 
              required 
              id="email"
              type="email" 
              placeholder="john@example.com" 
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="form-input-contact"
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group-contact">
            <label htmlFor="mobile">Mobile Number</label>
            <input 
              required 
              id="mobile"
              type="tel" 
              placeholder="+1 234 567 8900" 
              value={form.mobile}
              onChange={e => setForm({ ...form, mobile: e.target.value })}
              className="form-input-contact"
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group-contact">
            <label htmlFor="city">Area, City</label>
            <input 
              required 
              id="city"
              placeholder="New York, NY" 
              value={form.city}
              onChange={e => setForm({ ...form, city: e.target.value })}
              className="form-input-contact"
              disabled={isLoading}
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          className="btn-orange contact-submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading-content">
              <span className="spinner"></span>
              Submitting...
            </span>
          ) : (
            "Get Quick Quote"
          )}
        </button>
        
        {status && (
          <p className={`contact-status ${isError ? 'error' : 'success'}`}>
            {status}
          </p>
        )}
      </form>
      
      <div className="contact-info">
        <p>📞 Or call us directly: <strong>+1 234 567 8900</strong></p>
      </div>
    </div>
  );
}
