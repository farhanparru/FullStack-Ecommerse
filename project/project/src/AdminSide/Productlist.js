import React, { useEffect, useState } from 'react';
import { Axios } from '../App';
import { toast } from 'react-toastify';
import SideBar from './SideBar';
import { useNavigate} from 'react-router-dom';

const Productlist = () => {

    const [product,setProduct]=useState([])

    const navigate = useNavigate()

  
    console.log(product,"kkk");

    useEffect(()=>{
        const fetchProducts = async()=>{
            try{
                const response = await Axios.get('http://localhost:3000/api/admin/products')
                console.log(response,"kkkk");

                if(response.status === 200){
                    setProduct(response.data.data)
                }
            }catch(error){
                console.log(error);
                toast.error(error.response.data.message)
            }
        }
        fetchProducts()
    },[])
  

    //edit product


    const handleRemoveItem = async(productId)=>{
        try{
            await Axios.delete('http://localhost:3000/api/admin/products',{
               data:{productId},
            });

            setProduct(prevProducts => prevProducts.filter(item => item._id !== productId))
            toast.success('Product deleted successfully')
        }catch(error){
            console.log('Error deleting product:',error);
            toast.error("Failed to delete product:")
        }
    }


    const handleEdit = ()=>{
      navigate("/EditProduct")
    }


  return (
    <div>
    <div style={{ display: 'flex' }}>
    <SideBar/>
      <section style={{ backgroundColor: '#eee' }}>
      {product.map((item)=>(

     
        <div className="container py-1">
          <div className="row justify-content-center mb-3">
            <div className="col-md-12 col-xl-10">
              <div className="card shadow-0 border rounded-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                      <div className="bg-image hover-zoom ripple rounded ripple-surface">
                        <img
                          src={item.image}
                          className="w-100"
                          alt="Product"
                        />
                        <a href="#!">
                          <div className="hover-overlay">
                            <div
                              className="mask"
                              style={{ backgroundColor: 'rgba(253, 253, 253, 0.15)' }}
                            ></div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6 col-xl-6">
                      <h5>{item.title}</h5>
                      <div className="d-flex flex-row">
                        <div className="text-danger mb-1 me-2">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </div>
                        <span>310</span>
                      </div>
                      <div className="mt-1 mb-0 text-muted small">
                        <span>100% Best Product</span>
                        <span className="text-primary"> • </span>
                        <span>Bets Offers</span>
                        <span className="text-primary"> • </span>
                        <span>Best qality</span>
                        <br />
                      </div>
                      <div className="mb-2 text-muted small">
                        <span>Unique design</span>
                        <span className="text-primary"> • </span>
                        <span>For men</span>
                        <span className="text-primary"> • </span>
                        <span>Casual</span>
                        <br />
                      </div>
                      <p className="text-truncate mb-4 mb-md-0">
                        
                      </p>
                    </div>
                    <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                      <div className="d-flex flex-row align-items-center mb-1">
                        <h4 className="mb-1 me-1">${item.price}</h4>
                        <span className="text-danger">
                          <s>${item.OldPrice}</s>
                        </span>
                      </div>
                      <h6 className="text-success">Free shipping</h6>
                      <div className="d-flex flex-column mt-4">

                      <button className="btn btn-danger btn-sm" type="button" onClick={()=>handleRemoveItem(item._id)}>
                      <i className="fas fa-trash-alt"></i>
                       </button>

                       <button class="btn btn-outline-primary btn-sm mt-2" type="button" onClick={()=>handleEdit("/EditProduct")}>
                     <i class="fas fa-edit"></i>
                                 </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>  
          </div>
        </div>
        ))}
      </section>
      
    </div>
    </div>
  );
};

export default Productlist;
