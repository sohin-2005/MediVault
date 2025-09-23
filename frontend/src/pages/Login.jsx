import React, { useState } from 'react';
import { Eye, EyeOff, Heart } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    loginAs: 'Patient'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      // Update API endpoint to match your FastAPI setup
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          account_type: formData.loginAs.toLowerCase()
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        // Store authentication data
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('account_type', data.account_type);
        
        // Show success message
        alert('Login successful!');
        
        // Redirect based on account type
        switch(data.account_type) {
          case 'patient':
            window.location.href = '/patient-dashboard';
            break;
          case 'doctor':
            window.location.href = '/doctor-dashboard';
            break;
          case 'admin':
            window.location.href = '/admin-dashboard';
            break;
          default:
            window.location.href = '/dashboard';
        }
      } else {
        const error = await response.json();
        alert(error.detail || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" fill="currentColor" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to MediVault</h1>
          <p className="text-gray-600">Sign in to access your medical records securely</p>
        </div>

        <div className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all pr-12"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Login As */}
          <div>
            <label htmlFor="loginAs" className="block text-sm font-medium text-gray-900 mb-2">
              Login as
            </label>
            <select
              id="loginAs"
              name="loginAs"
              value={formData.loginAs}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none"
            >
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>

        {/* Register Link */}
        <div className="text-center mt-6">
          <span className="text-gray-600">Don't have an account? </span>
          <button
            type="button"
            onClick={() => window.location.href = '/register'}
            className="text-blue-600 hover:text-blue-700 font-medium bg-transparent border-none p-0 cursor-pointer"
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;