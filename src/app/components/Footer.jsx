'use client'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart , faEnvelope} from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Footer() {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
    const res1 = await fetch('https://6778e691482f42b62e8fe02c.mockapi.io/fashion?category=ClothingCollections');
    const res2 = await fetch('https://6778e691482f42b62e8fe02c.mockapi.io/fashion?category=Shoes&BagsCollections');
    const res3 = await fetch('https://6778e691482f42b62e8fe02c.mockapi.io/fashion?category=Accessories');
    const res4 = await fetch('https://6778e691482f42b62e8fe02c.mockapi.io/fashion?category=BeautyProduct');
    const data1 = await res1.json();
    const data2 = await res2.json();
    const data3 = await res3.json();
    const data4 = await res4.json();
  
    // ترکیب همه‌ی داده‌ها در یک آرایه
    setCategories([...data1, ...data2, ...data3, ...data4]);
    };
  fetchData();
}, []);

  const [inputValue, setInputValue] = useState('')
  // تابع براي بروزرساني مقدار ورودي
  const handleInputChange = (e)=>{
    setInputValue(e.target.value)
  }
  // تابع براي ارسال داده ها
  const handleSubmit = (e)=>{
    e.preventDefault()
    alert('مقدار ورودی: ' + inputValue);
  }

  return (
    <footer className='w-full bg-black py-1'>
        <div className='w-full 2xl:w-11/12 3xl:w-80 4xl:w-70 5xl:w-60  my-5 flex flex-wrap m-auto'>
          <div className='w-full lg:w-1/3 py-6 pl-6'>
            <Image src='/logo.svg' width={250} height={40} alt='logo'/>
            <p className='py-5 text-gray-500'>The customer is at the heart of our unique business model, which
            includes design.</p>
            <Image src='/cards.png' width={250} height={150} alt='cards'/>
          </div>
          <div className='w-full lg:w-1/5 py-6 pl-6'>
            <h6 className='text-white font-bold pb-3'>SHOPPING</h6>
            <ul className='flex flex-col'>
              {categories.map((val) => (
                <li key={val.id} className='pb-3'>
                  <Link href={val.category} className='text-gray-500'>
                  {val.category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='w-full lg:w-1/5 py-6 pl-6'>
            <h6 className='text-white font-bold pb-3'>CONTACT</h6>
            <ul className='flex flex-col'>
              <li className='pb-3'><Link href="/contact" className='text-gray-500'>Contact Us</Link></li>
              <li className='pb-3'><Link href="/delivery" className='text-gray-500'>Delivery</Link></li>
            </ul>
          </div>
          <div className='w-full lg:w-1/4 py-6 pl-6'>
            <h6 className='text-white font-bold pb-3'>NEWLETTER</h6>
            <p className='text-gray-500 pb-3'>Be the first to know about new
                arrivals, look books, sales & promos!
            </p>
            <div className='flex border-b-2 border-gray-500 w-56'>
              <input type="text" id="inputField" value={inputValue} // مقدار کنترل‌شده از state
               placeholder="Your Email"
               onChange={handleInputChange} //با تغییرات ورودی state به‌روزرسانی  
               className='pb-3 bg-black outline-none pb-1 pl-2 text-white placeholder:text-xs focus-visible caret-gray-500'
               />
              <div onClick={handleSubmit}>
                <button type="button" ><FontAwesomeIcon icon={faEnvelope} className='text-gray-500'/></button>
              </div>
            </div>
          </div>
        </div>
        <div className='text-center'>
          <h5 className='text-gray-500 font-semibold pb-5'>
              Design and Code with <FontAwesomeIcon icon={faHeart} className='text-[#f30856] '/> by ELi Piroozi
          </h5>
        </div>
    </footer>
  )
}
