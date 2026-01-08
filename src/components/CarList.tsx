import { Link } from 'react-router-dom';
import CarItem from './CarItem';

const cars = [
    { id: 1, brand: 'Toyota', model: 'Corolla', year: 2020, price: '85 000 PLN' },
    { id: 2, brand: 'Ford', model: 'Mustang', year: 2018, price: '140 000 PLN' },
    { id: 3, brand: 'BMW', model: 'M3', year: 2022, price: '350 000 PLN' },
    { id: 4, brand: 'Audi', model: 'A4', year: 2019, price: '120 000 PLN' },
];

const CarList = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-800">
                        Car List
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cars.map((car) => (
                        <Link 
                            to={`/cars/${car.id}`} 
                            key={car.id}
                            className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
                        >
                            <CarItem id={car.id} brand={car.brand} model={car.model} price={car.price} year={car.year} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CarList;