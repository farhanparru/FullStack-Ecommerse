import React from 'react';

const OfferCard = () => {
 
    return (
      <div className='d-flex justify-center'>
        <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md mx-2">
          <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
            <img className="peer absolute top-0 right-0 h-full w-full object-cover" src="https://img.freepik.com/free-photo/electronic-device-balancing-concept_23-2150422322.jpg" alt="product image" />
            <img className="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0" src="https://img.freepik.com/free-photo/laptop-wooden-table_53876-20635.jpg" alt="product image" />
            <div className="absolute  bottom-0 mb-4 flex space-x-4 w-full justify-center">
              <div className="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div> 
              <div className="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
              <div className="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
            </div> 
            <svg className="pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white  transition-opacity group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>
            <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span> 
          </a>
          <div className="mt-4 px-5 pb-5">
            <h5 className="text-xl tracking-tight text-slate-900">Laptop is best selling in India</h5>
            <div className="mt-2 mb-5 flex items-center justify-between">
              <p>
                <span className="text-3xl font-bold text-slate-900">₹30000.00</span>
                <span className="text-sm text-slate-900 line-through">₹50009.00</span>
              </p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            View
          </div>
        </div>
  
        <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md mx-2">
          <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
            <img className="peer absolute top-0 right-0 h-full w-full object-cover" src="https://img.freepik.com/free-photo/tech-device-with-nature-background_23-2150470431.jpg" alt="product image" />
            <img className="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0" src="https://img.freepik.com/free-vector/realistic-white-smartphone-design-with-three-cameras_23-2148374059.jpg" alt="product image" />
            <div className="absolute  bottom-0 mb-4 flex space-x-4 w-full justify-center">
              <div className="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div> 
              <div className="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
              <div className="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
            </div> 
            <svg className="pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white  transition-opacity group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>
            <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span> 
          </a>
          <div className="mt-4 px-5 pb-5">
            <h5 className="text-xl tracking-tight text-slate-900">The iPhone 14 was the best-selling smartphone</h5>
            <div className="mt-2 mb-5 flex items-center justify-between">
              <p>
                <span className="text-3xl font-bold text-slate-900">₹70000.0</span>
                <span className="text-sm text-slate-900 line-through">₹100000</span>
              </p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            View
          </div>
        </div>
  
        <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md mx-2">
          <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
            <img className="peer absolute top-0 right-0 h-full w-full object-cover" src="https://img.freepik.com/free-psd/dark-mobile-device-mockup_149660-801.jpg" alt="product image" />
            <img className="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0" src="https://img.freepik.com/free-photo/electronic-devices-balancing-concept_23-2150422328.jpg" alt="product image" />
            <div className="absolute  bottom-0 mb-4 flex space-x-4 w-full justify-center">
              <div className="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div> 
              <div className="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
              <div className="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
            </div> 
            <svg className="pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white  transition-opacity group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>
            <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span> 
          </a>
          <div className="mt-4 px-5 pb-5">
            <h5 className="text-xl tracking-tight text-slate-900">The iPhone 14 was the best-selling smartphone</h5>
            <div className="mt-2 mb-5 flex items-center justify-between">
              <p>
                <span className="text-3xl font-bold text-slate-900">₹70000.0</span>
                <span className="text-sm text-slate-900 line-through">₹100000</span>
              </p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            View
          </div>
        </div>
      </div>
    );
  };
  
  export default OfferCard;