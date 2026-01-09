import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    // Adres API
    const API_URL = 'https://localhost:7139/api/Account';

    const navigate = useNavigate();

    // Stan formularza
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<{ 
        username?: string; 
        firstName?: string; 
        lastName?: string; 
        email?: string; 
        password?: string; 
        form?: string 
    }>({});
    
    const [isLoading, setIsLoading] = useState(false);

    // Regex patterns
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const nameRegex = /^[a-zA-Z\s-]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const validateField = (name: string, value: string): string | undefined => {
        let error: string | undefined;

        switch (name) {
            case 'username':
                if (!value.trim()) {
                    error = 'Username is required.';
                } else if (value.length < 3) {
                    error = 'Username must be at least 3 characters.';
                } else if (!usernameRegex.test(value)) {
                    error = 'Username can only contain letters and numbers.';
                }
                break;

            case 'firstName':
                if (!value.trim()) {
                    error = 'First name is required.';
                } else if (value.length < 2) {
                    error = 'First name must be at least 2 characters.';
                } else if (!nameRegex.test(value)) {
                    error = 'First name contains invalid characters.';
                }
                break;

            case 'lastName':
                if (!value.trim()) {
                    error = 'Last name is required.';
                } else if (value.length < 2) {
                    error = 'Last name must be at least 2 characters.';
                } else if (!nameRegex.test(value)) {
                    error = 'Last name contains invalid characters.';
                }
                break;

            case 'email':
                if (!value.trim()) {
                    error = 'Email is required.';
                } else if (!emailRegex.test(value)) {
                    error = 'Please enter a valid email address.';
                }
                break;

            case 'password':
                if (!value) {
                    error = 'Password is required.';
                } else if (/\s/.test(value)) {
                    error = 'Password must not contain spaces.';
                } else if (value.length < 6) {
                    error = 'Password must be at least 6 characters.';
                }
                break;
            
            default:
                break;
        }

        return error;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({ ...prev, [name]: value }));

        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error,
            form: undefined
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const newErrors: typeof errors = {};
        let isValid = true;

        Object.keys(formData).forEach((key) => {
            const fieldName = key as keyof typeof formData;
            const error = validateField(fieldName, formData[fieldName]);
            if (error) {
                newErrors[fieldName] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);

        if (!isValid) return;

        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    displayName: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    password: formData.password
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token || data.jwt;

                if (token) {
                    localStorage.setItem('jwt', token);
                    console.log("Registration successful, token saved.");
                    navigate('/cars');
                } else {
                    console.warn("Registration successful but no token received. Redirecting to login.");
                    navigate('/login');
                }
            } else {
                let errorMessage = 'Registration failed. Please try again.';
                try {
                    const errorData = await response.json();
                    if (errorData.errors) {
                        const errorValues = Object.values(errorData.errors).flat();
                        if (errorValues.length > 0) errorMessage = String(errorValues[0]);
                    } else if (errorData.message) {
                        errorMessage = errorData.message;
                    } else if (typeof errorData === 'string') {
                        errorMessage = errorData;
                    }
                } catch {
                    if (response.status === 400) errorMessage = "Invalid data provided.";
                    if (response.status === 409) errorMessage = "User already exists.";
                }
                
                setErrors(prev => ({ ...prev, form: errorMessage }));
            }
        } catch (error) {
            console.error("Registration error:", error);
            setErrors(prev => ({ ...prev, form: 'Server connection failed. Try again later.' }));
        } finally {
            setIsLoading(false);
        }
    };

    const getInputClass = (error?: string) => {
        const baseClass = "w-full px-4 py-2 border rounded-md outline-none transition duration-150";
        return error 
            ? `${baseClass} border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-red-50`
            : `${baseClass} border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
            <div className="max-w-md w-full bg-white shadow-xl overflow-hidden">
                <div className="bg-indigo-600 px-6 py-4">
                    <h2 className="text-white text-xl font-bold flex items-center justify-center gap-2">
                        📝 Create an account
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6" noValidate>
                    {errors.form && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm text-center">
                            {errors.form}
                        </div>
                    )}

                    {/* First Name & Last Name Container - MOVED UP */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* First Name */}
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={getInputClass(errors.firstName)}
                                placeholder="John"
                                disabled={isLoading}
                            />
                            {errors.firstName && (
                                <p className="mt-1 text-xs text-red-600 font-medium">{errors.firstName}</p>
                            )}
                        </div>

                        {/* Last Name */}
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={getInputClass(errors.lastName)}
                                placeholder="Doe"
                                disabled={isLoading}
                            />
                            {errors.lastName && (
                                <p className="mt-1 text-xs text-red-600 font-medium">{errors.lastName}</p>
                            )}
                        </div>
                    </div>

                    {/* Username - MOVED DOWN */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={getInputClass(errors.username)}
                            placeholder="JohnDoe"
                            disabled={isLoading}
                        />
                        {errors.username && (
                            <p className="mt-1 text-xs text-red-600 font-medium">{errors.username}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={getInputClass(errors.email)}
                            placeholder="your@email.com"
                            disabled={isLoading}
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-600 font-medium">{errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={getInputClass(errors.password)}
                            placeholder="••••••••"
                            disabled={isLoading}
                        />
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-600 font-medium">{errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full px-6 py-2 text-sm font-medium text-white rounded-md shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                            ${isLoading 
                                ? 'bg-indigo-400 cursor-not-allowed' 
                                : 'bg-indigo-600 hover:bg-indigo-700'
                            }`}
                    >
                        {isLoading ? 'Signing up...' : 'Sign up'}
                    </button>

                    <div className="text-center mt-4 text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
                            Log in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;