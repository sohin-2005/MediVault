import React, { useState } from 'react';
import { Eye, EyeOff, Heart } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    accountType: 'Patient',
    address: '',
    emergencyContact: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
  
    // Simple validations
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      alert("Please fill in all required fields");
      setIsLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      setIsLoading(false);
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
          phone_number: formData.phoneNumber,
          date_of_birth: formData.dateOfBirth,   // must be YYYY-MM-DD
          gender: formData.gender,               // must match enum
          account_type: formData.accountType.toLowerCase(), // patient/doctor/admin
          address: formData.address,
          emergency_contact: formData.emergencyContact,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert("Registration successful!");
        window.location.href = "/login";
      } else {
        const error = await response.json();
        alert(error.detail || "Registration failed");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Network error, try again.");
    } finally {
      setIsLoading(false);
    }
  };
  



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" fill="currentColor" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create MediVault Account</h1>
          <p className="text-gray-600">Join MediVault to manage your medical records securely</p>
        </div>

        <div className="space-y-6">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 outline-none transition-all
                           text-gray-900 placeholder-gray-400"
                placeholder="Enter first name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 outline-none transition-all
                           text-gray-900 placeholder-gray-400"
                placeholder="Enter last name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 outline-none transition-all
                         text-gray-900 placeholder-gray-400"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 outline-none transition-all pr-12
                             text-gray-900 placeholder-gray-400"
                  placeholder="Create password"
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
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 outline-none transition-all pr-12
                             text-gray-900 placeholder-gray-400"
                  placeholder="Confirm password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Phone Number & Date of Birth */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 outline-none transition-all
                           text-gray-900 placeholder-gray-400"
                placeholder="Enter phone number"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 outline-none transition-all
                           text-gray-900"
                required
              />
            </div>
          </div>

          {/* Gender & Account Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none
                           text-gray-900"
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Account Type</label>
              <select
                name="accountType"
                value={formData.accountType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none
                           text-gray-900"
              >
                <option value="Patient">Patient</option>
                <option value="Doctor">Doctor</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none
                         text-gray-900 placeholder-gray-400"
              placeholder="Enter your address"
              required
            />
          </div>

          {/* Emergency Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Emergency Contact</label>
            <input
              type="text"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 outline-none transition-all
                         text-gray-900 placeholder-gray-400"
              placeholder="Emergency contact name and phone"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 
                       focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>

        {/* Login Link */}
        <div className="text-center mt-6">
          <span className="text-gray-600">Already have an account? </span>
          <button
            type="button"
            onClick={() => window.location.href = '/login'}
            className="text-blue-600 hover:text-blue-700 font-medium bg-transparent border-none p-0 cursor-pointer"
          >
            Sign in here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
