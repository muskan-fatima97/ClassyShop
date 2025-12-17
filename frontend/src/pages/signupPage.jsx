import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from 'axios';



const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
  });

  const genders = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.phone || formData.phone.length < 6) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }
    if (!formData.gender) {
      setErrorMsg("Please select a gender.");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone,
      gender: formData.gender.toLowerCase(),
      password: formData.password,
    };

    try {
      const response = await axios.post(
        "https://ecommerce-backend-mu-self.vercel.app/api/auth/signup",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      setSuccessMsg("Signup successful! Redirecting to login...");

      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (error) {
      console.error("Backend Error:", error.response?.data);
      setErrorMsg(error.response?.data?.message?.[0] || "Signup failed!");
      alert(JSON.stringify(error.response?.data));
    }
  };




  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT SIDE – IMAGE + TEXT */}
        <div className="flex flex-col justify-center items-center bg-gray-50 p-8">

          <h2 className="text-3xl font-bold text-[#0A1D37] mb-2 text-center">
            Welcome to ClassyShop
          </h2>

          <p className="text-gray-600 text-center mb-6">
            Sign up now to explore amazing products and deals!
          </p>

          <img
            src="./illust-1.jpg"
            alt="Signup Visual"
            className="w-80 max-w-xs rounded-xl shadow-lg"
          />
        </div>

        {/* RIGHT SIDE – FORM AREA */}
        <div className="relative flex justify-center items-start p-6">

          {/* FLOATING GRADIENT HEADER */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[70%] 
          bg-gradient-to-r from-blue-400 to-blue-600 text-white
          rounded-2xl shadow-lg py-6 text-center z-10">

            <h2 className="text-2xl font-semibold">Sign Up</h2>
            <div className="flex justify-center gap-8 mt-4 text-2xl">
              <i className="fa-brands fa-facebook cursor-pointer"></i>
              <i className="fa-brands fa-github cursor-pointer"></i>
              <i className="fa-brands fa-google cursor-pointer"></i>
            </div>
          </div>

          {/* WHITE CARD */}
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md mx-auto pt-32 pb-6 px-6">

            <form onSubmit={handleSubmit}>

              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />

              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />

              {/* PHONE INPUT */}
              <div className="mt-3 mb-2">
                <PhoneInput
                  country={"us"}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  enableSearch
                  inputStyle={{ width: "100%" }}
                  placeholder="Enter phone number"
                />
              </div>

              <TextField
                select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              >
                {genders.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />

              {/* ERROR */}
              {errorMsg && (
                <Typography color="error" sx={{ mt: 1 }}>
                  {errorMsg}
                </Typography>
              )}

              {/* SUCCESS */}
              {successMsg && (
                <Typography color="green" sx={{ mt: 1 }}>
                  {successMsg}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  py: 1.3,
                  borderRadius: "8px",
                  fontWeight: "bold",
                  background: "linear-gradient(to right, #2F80ED, #56CCF2)",
                }}
              >
                SIGN UP
              </Button>

              <p className="text-center mt-4 text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>

        </div>
      </div>

    </div>
  );

};

export default SignUpPage;
