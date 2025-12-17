import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '', role: '' });
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        try {
            const response = await axios.post(
                'https://ecommerce-backend-mu-self.vercel.app/api/auth/login',
                formData
            );
            console.log(response.data);
            if (response.data.token) {
                if (response.data.token) {
                    localStorage.setItem('authToken', response.data.token);
                    localStorage.setItem("userRole", response.data.user.role);
                    if (response.data.user && response.data.user._id) {
                        localStorage.setItem("userId", response.data.user._id);
                    }

                }
                const role = response.data.role || response.data.user?.role;
                // console.log("Role:", role);
                if (role === 'admin') {
                    navigate("/dashboard");
                } else if (role === "user") {
                    navigate("/");
                } else {
                    setErrorMsg("Unknown User");
                }
            }
            else {
                setErrorMsg(response.data.message || 'Invalid credentials');
            }
        } catch (err) {
            setErrorMsg('Email or password is incorrect.');
        }
    };
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 relative p-4">
            <div className="relative w-full max-w-md">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[92%] bg-gradient-to-r from-blue-400 to-blue-600  text-white rounded-2xl shadow-xl py-5 text-center z-10">
                    <h2 className="text-2xl font-semibold">Log in</h2>
                </div>
                <div className="bg-white rounded-2xl shadow-lg pt-28 pb-8 px-6 mt-10">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        {errorMsg && (
                            <Typography color="error" sx={{ mt: 1 }}>
                                {errorMsg}
                            </Typography>
                        )}
                        <div className="flex items-center mt-1 mb-3">
                            <Checkbox defaultChecked />
                            <span className="text-gray-600">Remember me</span>
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                py: 1.3,
                                mt: 1,
                                borderRadius: "8px",
                                fontWeight: "bold",
                                background: "linear-gradient(to right, #2F80ED, #56CCF2)",
                            }}
                        >
                            Login
                        </Button>
                        <p className="text-center mt-4 text-gray-600">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-blue-600 font-semibold hover:underline"
                            >
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );

};

export default LoginPage;
