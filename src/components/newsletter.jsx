import { useState } from "react";
import API from "../services/api";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setMessage("");
    
    try {
      const response = await API.post("/subscribe", { email });
      if (response.data.success) {
        setMessage("✓ Thank you for subscribing! We'll keep you updated.");
        setIsError(false);
        setEmail("");
      }
    } catch (error) {
      setMessage("✕ Subscription failed. Please try again.");
      setIsError(true);
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <div className="newsletter-section">
      <div className="newsletter-content">
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter for the latest updates on projects and services.</p>
        
        <form onSubmit={subscribe} className="newsletter-form">
          <div className="newsletter-input-group">
            <input 
              required 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="newsletter-input"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="newsletter-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-dots">Subscribing...</span>
              ) : (
                "Subscribe"
              )}
            </button>
          </div>
        </form>
        
        {message && (
          <p className={`newsletter-message ${isError ? 'error' : 'success'}`}>
            {message}
          </p>
        )}
        
        <p className="newsletter-privacy">
          🔒 We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
