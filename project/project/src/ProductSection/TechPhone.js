import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../App';
import { toast } from 'react-toastify';


function TechPhone() {

   const navigate = useNavigate()
   const [products,setProducts]=useState([])

   useEffect(()=>{
    const fetchproduct = async()=>{
       try{
         const response = await Axios.get('http://localhost:3000/api/users/products')
        //  console.log(response,"hai");

         if(response.status===200){
          //  toast.success('product SuccessFuly fetched',{
          //    toastId:'success'
          //  })
           setProducts(response.data.data)
         }
       }catch(error){
         toast("error occured",error)
       }
    }
   
     fetchproduct()
   },[])

  

   const viewhandle=(id)=>{
    console.log(id,"hia");
    navigate(`/View/${id}`)
   }


 
  const smartProduct = products.filter((item) => item.category === 'SmartPhone');
  console.log(smartProduct);

  return (
    <div className='w-full h-auto flex gap-10 flex-wrap p-14'>
    {smartProduct.map((item) => (
      <div
        key={item.id}
        className="card w-96 bg-base-100 shadow-xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out"
      >
        <figure>
          <img src={item.image} alt="" className="w-full object-cover" />
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title text-xl font-semibold">{item.title}</h2>
          <del><span className="font-bold text-gray-500">${item.OldPrice}</span></del>
          <p className='font-bold text-green-500'>${item.price}</p>

          <div className="card-actions justify-between mt-4">
            <div className="rating rating-lg">
            <input type="radio" name="rating-0" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-0" className="mask mask-star-2 bg-orange-400" checked />
  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />



            </div>

            <button className="btn btn-primary transform hover:scale-105 transition duration-300 ease-in-out"
            onClick={()=> viewhandle(item._id)}
            >Buy Now</button>
          </div>
        </div>
      </div>
    ))}
  </div>
  );
}

export default TechPhone;
