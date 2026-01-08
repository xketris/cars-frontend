import { useParams, Link } from 'react-router-dom';

const CarDetails = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
            <div className="max-w-xl shadow-xl mx-auto bg-white">
                <div className="bg-indigo-600 px-6 py-4">
                    <h2 className="text-white text-xl font-bold flex items-center gap-2">
                        Car Details
                    </h2>
                </div>

                <div className="p-8 space-y-6">
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
                        <span className="text-gray-500 font-medium">Vehicle ID:</span>
                        <span className="text-indigo-600 font-bold text-lg">{id}</span>
                    </div>
                
                    <div className="p-4 bg-blue-50 text-blue-800 rounded text-sm">
                        <p>
                            It's car details view. Here are shown the details of the chosen car.
                        </p>
                    </div>

                    <div className="flex items-center justify-end pt-4 border-t border-gray-100">
                        <Link 
                            to="/cars" 
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Back to list
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CarDetails;