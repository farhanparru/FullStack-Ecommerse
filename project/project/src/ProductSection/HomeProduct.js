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
        <div className="bg-gray-900 py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-white mb-8">Introducing Our Latest Product</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {homeData.map((product, index) => (
                        <div className="bg-white rounded-lg shadow-lg p-8" key={index}>
                            <div className="relative overflow-hidden">
                                <img className="object-cover w-full h-full" src={product.image} alt={product.name} />
                                <div className="absolute inset-0 bg-black opacity-40"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <button className="bg-white text-gray-900 py-2 px-6 rounded-full font-bold hover:bg-gray-300">View Product</button>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mt-4">{product.title}</h3>
                            <p className="text-gray-500 text-sm mt-2">{product.OldPrice}</p>
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-gray-900 font-bold text-lg">₹{product.price}</span>
                                <button className="bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeProduct;
