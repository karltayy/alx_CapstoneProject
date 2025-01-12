import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGalleryStore from "./GalleryStore";

function SignIn() {
    const { loginUser, getRememberedCredentials } = useGalleryStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
        const { rememberMe, email, password } = getRememberedCredentials();
        setRememberMe(rememberMe);
        setEmail(email);
        setPassword(password);
      }, [getRememberedCredentials]);
      
  
    const handleSubmit = (e) => {
      e.preventDefault();
      try {
        loginUser(email, password, rememberMe);
        setError("");
        navigate("/profile");
      } catch (err) {
        setError(err.message);
      }
    };
  
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-sm text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2"
              />
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }
  
  export default SignIn;