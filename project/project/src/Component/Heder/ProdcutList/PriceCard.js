import React from 'react'
import {Link} from 'react-router-dom'

const PriceCard = () => {
  return (
    <div>
     
<div class="bg-white py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-4xl text-center">
      <h2 class="text-base font-semibold leading-7 text-teal-600">Pricing</h2>
      <p class="mt-2 text-4xl font-bold tracking-tight text-blue-500 sm:text-5xl">Best laptops 2024: Premium, budget, gaming, 2-in-1s, and more</p>
    </div>
    <p class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-cyan-600">Black Friday and Cyber Monday sales are obviously a good time to buy a laptop, but it's more than just the.</p>
    <div class="mt-16 flex justify-center">
      <fieldset class="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-red-400">
        <legend class="sr-only">Payment frequency</legend>
       
        <label class="cursor-pointer rounded-full px-2.5 py-1">
          <input type="radio" name="frequency" value="monthly" class="sr-only"/>
          <span>Monthly</span>
        </label>
      
        <label class="cursor-pointer rounded-full px-2.5 py-1">
          <input type="radio" name="frequency" value="annually" class="sr-only"/>
          <span>Annually</span>
        </label>
      </fieldset>
    </div>
    <div class="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      <div class="rounded-3xl p-8 ring-1 xl:p-10 ring-yellow-400">
        <h3 id="tier-freelancer" class="text-lg font-semibold leading-8 text-orange-600">HP</h3>
        <p class="mt-4 text-sm leading-6 text-green-600">The essentials to provide your best work for clients.</p>
        <p class="mt-6 flex items-baseline gap-x-1">
          
          <span class="text-4xl font-bold tracking-tight text-pink-900">₹27,999.00</span>
        
          <span class="text-sm font-semibold leading-6 text-purple-600"></span>
        </p>
       <Link to="/laptop"><a href="#" aria-describedby="tier-freelancer" class="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-cyan-600 text-gray-600 shadow-sm hover:bg-red-500 focus-visible:outline-orange-600">Best Offer</a></Link> 
        <ul role="list" class="mt-8 space-y-3 text-sm leading-6 xl:mt-10 text-gray-400">
          <li class="flex gap-x-3">
            <svg class="h-6 w-5 flex-none text-yellow-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            Storage 256 GB
          </li>
          <li class="flex gap-x-3">
            <svg class="h-6 w-5 flex-none text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            4400 mAh.
          </li>
          <li class="flex gap-x-3">
            <svg class="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            13” to 15 inches
          </li>
          <li class="flex gap-x-3">
            <svg class="h-6 w-5 flex-none text-teal-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            Best overall: HP Spectre x360 Luxury 14T.
           </li>
        </ul>
      </div>
      <div class="rounded-3xl p-8 ring-1 xl:p-10 ring-gray-700">
        <h3 id="tier-startup" class="text-lg font-semibold leading-8 text-gray-900">Apple</h3>
        <p class="mt-4 text-sm leading-6 text-cyan-600">A 10% discount is available to current and Veteran members of the US Military, National Guard and Reserve.
</p>
        <p class="mt-6 flex items-baseline gap-x-1">
         
          <span class="text-4xl font-bold tracking-tight text-yellow-700">₹13800.00</span>
         <span class="text-sm font-semibold leading-6 text-teal-600"> </span>
        </p>
       <Link to="/laptop"> <a href="#" aria-describedby="tier-startup" class="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-green-600 text-white shadow-sm hover:bg-green-800 focus-visible:outline-red-600">Best Offer</a></Link> 
        <ul role="list" class="mt-8 space-y-3 text-sm leading-6 xl:mt-10 text-pink-600">
          <li class="flex gap-x-3">
            <svg class="h-6 w-5 flex-none text-purple-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            5 GB of storage for free.
          </li>
          <li class="flex gap-x-3">
            <svg class="h-6 w-5 flex-none text-yellow-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            80% or above
          </li>
          <li class="flex gap-x-3">
            <svg class="h-6 w-5 flex-none text-red-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            5.8 inches
          </li>
          <li class="flex gap-x-3">
            <svg class="h-6 w-5 flex-none text-blue-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
           Mac Opreting name
          </li>
          <li class="flex gap-x-3">
            <svg class="h-6 w-5 flex-none text-orange-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            Apple clinches top spot as world's
          </li>
        </ul>
      </div>
      <div class="rounded-3xl p-8 ring-1 xl:p-10 bg-gray-900 ring-gray-900">
        <h3 id="tier-enterprise" class="text-lg font-semibold leading-8 text-white">Dell</h3>
        <p class="mt-4 text-sm leading-6 text-gray-300">When getting the best quality device, HP is usually the preferred choice</p>
        <p class="mt-6 flex items-baseline gap-x-1">
        <span class="text-4xl font-bold tracking-tight text-yellow-700">₹40000.00</span>
        </p>
       <Link to="/laptop"><a href="#" aria-describedby="tier-enterprise" class="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white">Best offer</a></Link> 
        <ul role="list" class="mt-8 space-y-3 text-sm leading-6 xl:mt-10 text-gray-300">
          <li class="flex gap-x-3">
            <svg class="h-6 w-5 flex-none text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            Capacity · 1 TB - 2 TB (30) 
          </li>
          <li class="flex gap-x-3">
            <svg class="h-6 w-5 flex-none text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            6 to 7 hours per charge
          </li>
          <li class="flex gap-x-3">
            <svg class="h-6 w-5 flex-none text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            Microsoft Windows Server
          </li>
          <li class="flex gap-x-3">
            <svg class="h-6 w-5 flex-none text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            Dell is a subsidiary of Dell Technologies, Inc., 
          </li>
          <li class="flex gap-x-3">
            <svg class="h-6 w-5 flex-none text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            180 countries,
          </li>
          <li class="flex gap-x-3">
            <svg class="h-6 w-5 flex-none text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            Dell is known for quality-built hardware
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default PriceCard
