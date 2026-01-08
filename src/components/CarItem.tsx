function CarItem({ brand, model, year, price }: {id:number, brand: string, model: string, year: number, price: string}) {

    return (
        <>
            <div className="h-2 bg-indigo-500 group-hover:bg-indigo-600 transition-colors"></div>
                            
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                            {brand} {model}
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">Year: {year}</p>
                    </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">{price}</span>
                    <span className="text-indigo-600 text-sm font-medium group-hover:underline">
                        Details &rarr;
                    </span>
                </div>
            </div>
        </>
    )
}

export default CarItem;