import { useState } from "react";
import API from "../services/api";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const subscribe = async (e) => {
    e.preventDefault();
    try {
      await API.post("/subscribe", { email });
      setMessage("Subscribed successfully!");
      setEmail("");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Subscription failed.");
    }
  };

  return (
    <div className="newsletter-section">
      <h2 style={{marginBottom: '20px'}}>Subscribe Us</h2>
      <form onSubmit={subscribe} className="newsletter-form">
        <input required type="email" placeholder="Enter Email Address" value={email}
          onChange={e => setEmail(e.target.value)} />
        <button type="submit">Subscribe</button>
      </form>
      {message && <p style={{marginTop: '10px', color: 'green'}}>{message}</p>}
    </div>
  );
}