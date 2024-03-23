import React, { useEffect, useState } from 'react';
import { Axios } from '../App';

const HomeProduct = () => {
    const [homeData, setDataHome] = useState([]);

    useEffect(() => {
        const fetchHomeProducts = async () => {
            try {
                const response = await Axios.get('/api/users/allProducts');
                if (response.status === 200) {
                    setDataHome(response.data.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchHomeProducts();
    }, []);

    // Function to generate star rating representation
    const generateStarRating = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(<i key={i} className="fas fa-star text-yellow-500"></i>);
            } else {
                stars.push(<i key={i} className="far fa-star text-gray-400"></i>);
            }
        }
        return stars;
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {homeData.map((product, index) => (
                        <div key={index} className="group relative">
                            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img src={product.image} alt={product.name} className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">{product.title}</h3>
                                    <p className="mt-1 text-sm text-gray-500">₹{product.OldPrice}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">₹{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeProduct;