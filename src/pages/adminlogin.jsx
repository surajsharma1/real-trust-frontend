import { useState } from "react";
import API from "../services/api";

export default function AdminLogin() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">Admin Portal</h2>
                
                {error && <div className="mb-4 text-red-600 text-sm text-center bg-red-50 py-2 rounded border border-red-200">{error}</div>}
                
                <form onSubmit={login} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            placeholder="admin@example.com" 
                            type="email"
                            required
                            onChange={e => setForm({...form, email: e.target.value})} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            placeholder="••••••••" 
                            type="password"
                            required
                            onChange={e => setForm({...form, password: e.target.value})} 
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700 transition disabled:bg-blue-400"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}