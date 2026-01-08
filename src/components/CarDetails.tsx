import { useParams, Link } from 'react-router-dom';

const CarDetails = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
            <div className="bg-white shadow-xl rounded-lg p-8 max-w-lg w-full border border-gray-200">
                
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
                    Car Details
                </h2>
                
                <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
                        <span className="text-gray-500 font-medium">Vehicle ID:</span>
                        <span className="text-indigo-600 font-bold text-lg">{id}</span>
                    </div>
                    
                    <div className="p-4 bg-blue-50 text-blue-800 rounded text-sm">
                        <p>
                            It's car details view. Here are shown the details of the chosen car.
                        </p>
                    </div>
                </div>

                <Link 
                    to="/cars" 
                    className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                    &larr; Back to list
                </Link>
            </div>
        </div>
    );
};

export default CarDetails;