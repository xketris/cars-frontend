import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

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
                // Only check if password is provided, no complexity checks for login
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
        
        // 1. Update form data
        setFormData(prev => ({ ...prev, [name]: value }));

        // 2. Real-time validation
        const error = validateField(name, value);
        
        // 3. Update errors state
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate all fields before submission
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

        if (isValid) {
            console.log("Login valid, authenticating...", formData);
            // Login API call here
        } else {
            console.log("Login form contains errors.");
        }
    };

    const getInputClass = (error?: string) => {
        const baseClass = "w-full px-4 py-2 border rounded-md outline-none transition duration-150";
        return error 
            ? `${baseClass} border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-red-50`
            : `${baseClass} border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`;
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="max-w-md w-full bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="bg-indigo-600 px-6 py-4">
                    <h2 className="text-white text-xl font-bold flex items-center justify-center gap-2">
                        Sign in
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6" noValidate>
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
                        />
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-600 font-medium">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition-colors"
                    >
                        Sign in
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