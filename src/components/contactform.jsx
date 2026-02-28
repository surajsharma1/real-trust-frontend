import { useState } from "react";
import API from "../services/api";

export default function ContactForm() {
  const [form, setForm] = useState({ fullName: "", email: "", mobile: "", city: "" });
  const [status, setStatus] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    try {
      await API.post("/contact", form);
      setStatus("Success!");
      setForm({ fullName: "", email: "", mobile: "", city: "" });
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
        setStatus("Error submitting form.");
    }
  };

  return (
    <div className="contact-card">
      <h2>Get a Free<br/>Consultation</h2>
      <form onSubmit={submitForm}>
        <input required placeholder="Full Name" value={form.fullName}
          onChange={e => setForm({ ...form, fullName: e.target.value })}
          className="form-input" />
        <input required type="email" placeholder="Enter Email Address" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="form-input" />
        <input required type="tel" placeholder="Mobile Number" value={form.mobile}
          onChange={e => setForm({ ...form, mobile: e.target.value })}
          className="form-input" />
        <input required placeholder="Area, City" value={form.city}
          onChange={e => setForm({ ...form, city: e.target.value })}
          className="form-input" />
        
        <button type="submit" className="btn-orange">
          {status || "Get Quick Quote"}
        </button>
      </form>
    </div>
  );
}