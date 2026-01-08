import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
            <div className="rounded-lg p-8 max-w-lg w-full text-center">
                
                <h1 className="text-9xl font-extrabold text-indigo-200 tracking-widest">
                    404
                </h1>

                <div className="mt-5">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                        Page Not Found
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-8">
                        The page you are looking for does not exist
                    </p>

                    <Link 
                        to="/" 
                        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition transform hover:-translate-y-1 hover:shadow-xl"
                    >
                        Back to Main Page
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;