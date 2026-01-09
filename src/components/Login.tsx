import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    // Zmień ten adres na adres swojego backendu (np. http://localhost:8080 lub https://twoja-api.com)
    const API_URL = 'https://localhost:7139/api/Account';

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    // Standard Email Regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const validateField = (name: string, value: string): string | undefined => {
        let error: string | undefined;

        switch (name) {
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
            form: undefined // Clear global form error on change
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // 1. Walidacja lokalna
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

        // 2. Logika logowania (API)
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email, // Backend często oczekuje 'username', nawet jeśli to email
                    password: formData.password
                }),
            });

            if (response.ok) {
                // Pobieranie tokena z odpowiedzi
                // Zależnie od backendu: może być w body { "token": "..." } lub w nagłówku Authorization
                const data = await response.json();
                const token = data.token || data.jwt; // Dostosuj do struktury JSON z backendu

                if (token) {
                    // Zapisanie tokena
                    localStorage.setItem('jwt', token);
                    console.log("Login successful, token saved.");
                    
                    // Przekierowanie do aplikacji
                    navigate('/cars');
                } else {
                    setErrors(prev => ({ ...prev, form: 'Token not received from server.' }));
                }
            } else {
                // Obsługa błędów (np. 401 Unauthorized)
                setErrors(prev => ({ ...prev, form: 'Invalid email or password.' }));
            }
        } catch (error) {
            console.error("Login error:", error);
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
                        Sign in
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6" noValidate>
                    {/* Global Error Message */}
                    {errors.form && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm text-center">
                            {errors.form}
                        </div>
                    )}

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
                            <p className="mt-1 text-xs text-red-600 font-medium">
                                {errors.email}
                            </p>
                        )}
                    </div>

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
                            <p className="mt-1 text-xs text-red-600 font-medium">
                                {errors.password}
                            </p>
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
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>

                    <div className="text-center mt-4 text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-indigo-600 hover:text-indigo-500 font-medium">
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;