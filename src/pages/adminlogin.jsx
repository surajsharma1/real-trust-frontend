import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Logo from "../assets/images/logo.svg";

export default function AdminLogin() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            const res = await API.post("/admin/login", form);
            localStorage.setItem("token", res.data.token);
            alert("Login successful");
            window.location.href = "/admin";
        } catch (err) {
            setError("Invalid credentials. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            {/* Background Shapes */}
            <div className="bg-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-5"></div>
            </div>

            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <img src={Logo} alt="Logo" className="login-logo" />
                        <h1>Admin Portal</h1>
                        <p>Welcome back! Please login to continue.</p>
                    </div>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <form onSubmit={login} className="login-form">
                        <div className="form-group">
                            <label>Email Address</label>
                            <input 
                                className="form-input"
                                placeholder="admin@example.com" 
                                type="email"
                                required
                                value={form.email}
                                onChange={e => setForm({...form, email: e.target.value})} 
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                className="form-input"
                                placeholder="••••••••" 
                                type="password"
                                required
                                value={form.password}
                                onChange={e => setForm({...form, password: e.target.value})} 
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="login-button"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                    
                    <div className="login-footer">
                        <button className="back-link" onClick={() => navigate('/')}>
                            ← Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
