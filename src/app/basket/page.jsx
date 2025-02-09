"use client"
import React, { useEffect, useState } from 'react';
import useStore from '../store/store';
import Link from 'next/link';
import Image from "next/image";
import ConfirmModal from '../components/ConfirmModal';


// تابع برای دریافت اطلاعات موجودی کالا از API
async function getProductStockById(category, id) {
  const res = await fetch(`https://6778e691482f42b62e8fe02c.mockapi.io/fashion?category=${category}`);
  if (!res.ok) {
    throw new Error('Failed to fetch product stock');
  }
  const data = await res.json();
  // جستجوی محصول بر اساس id
  const product = data.find(item => item.id === id);
  return product ? product.count : 0;
}

export default function Basket() {
  const temp = useStore((state) => state.data);
  const updateBasket = useStore((state) => state.updateBasket);
  const decreaseQuantity = useStore((state) => state.decreaseQuantity);
  const removeProduct = useStore((state) => state.removeProduct);

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productToRemove, setProductToRemove] = useState(null)

  // استفاده از useEffect برای کنترل اسکرول فقط در سمت کلاینت
  useEffect (()=>{
    if (isModalOpen){
      document.body.style.overflow = 'hidden';
    }else{
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  },[isModalOpen])

  // بررسی اینکه داده‌ها موجود هستند یا خیر
  if (temp.length === 0) {
    return <div className='w-full text-2xl font-bold text-center tracking-widest my-10'>Your basket is currently empty.</div>; // نمایش پیام اگر سبد خرید خالی باشد
  }

  // تابعی برای بررسی موجودی کالا قبل از افزایش تعداد
  const handleIncreaseQuantity = async (product) => {
    try {
       await getProductStockById(product.category, product.id); // دریافت موجودی کالا از API

      if (product.count > product.quantity) {
        updateBasket(JSON.stringify(product)); // اگر موجودی کافی است تعداد را افزایش بده
      } else {
        alert('Maximum quantity reached!'); // پیغام برای زمانی که موجودی کافی نیست
      }
    } catch (error) {
      console.error("Error fetching product stock:", error);
    }
  };

  // محاسبه مبلغ کل
  const totalAmount = temp.reduce((total, product) => {
    return total + (product.price * product.quantity); // جمع مبلغ کل
  }, 0);

  // محاسبه تعداد کل اقلام سبد خرید
  const totalItemCount = temp.reduce((total, product) => total + product.quantity, 0);


  // تابع برای باز کردن مودال تایید حذف محصول
  const handleRemoveProductClick = (product) => {
    setProductToRemove(product);  // اینجا محصول کامل را ذخیره می‌کنید
    setIsModalOpen(true);  // نمایش مودال
  };

  // تابع برای تایید حذف محصول
  const handleConfirmRemove = () => {
    if (productToRemove) {
      removeProduct(productToRemove.id); // حذف محصول
      setIsModalOpen(false); // بستن مدل
    }
  };
  // تابع برای بستن مدل
  const handleCloseModal = () => {
    setIsModalOpen(false); // بستن مدل
  };

  return (
    <div className='w-full 2xl:w-11/12 3xl:w-80 4xl:w-70 5xl:w-60 flex justify-center flex-wrap m-auto'>
      <div className='w-full text-2xl font-bold text-center tracking-widest my-10'>
        <h4>SHOPPING BAG</h4>
      </div>
      <div className='w-full xl:w-[68%] flex justify-center flex-wrap mb-10'>
        <ul className='w-full flex justify-center flex-wrap'>
          {temp.map((product) => (
            <li key={product.id} className='w-full m-3 md:w-[90%] flex justify-center items-center bg-[#f9f9f9]'>
              {/* بررسی اینکه تصویر و عنوان موجود باشند */}
              {product.image && product.title ? (
                <>
                  <div className='w-[210px] h-[220px] flex justify-start items-center md:pl-2 lg:pl-0'>
                    <Image 
                      src={product.image} 
                      width={500} 
                      height={600} 
                      alt={product.title || "Product Image"} 
                      style={{width:'200px', height:'210px', objectFit:'contain'}}
                    />
                  </div>
                  <div className='w-[52%] h-[100px] flex flex-wrap content-center justify-start pl-2'>
                    <h6 className='w-full flex justify-start text-sm md:justify-start p-1 md:text-xl font-bold'>{product.title}</h6>
                    {/* نمایش تعداد و مبلغ هر محصول */}
                    <div className='font-bold p-1 text-sm'>Quantity: 
                      <button onClick={() => decreaseQuantity(product.id)} className='w-5 md:w-10 text-gray-400 hover:text-black'>-</button>
                      <span>{product.quantity}</span>
                      {/* دکمه افزایش تعداد با بررسی موجودی */}
                      <button onClick={() => handleIncreaseQuantity(product)} className='w-5 md:w-10 text-gray-400 hover:text-black'>+</button>
                    </div>
                    <p className='w-full flex justify-start p-1 text-xs'>price: {product.price} $</p>
                  </div>
                  <div className='w-[16%] h-[90px] flex flex-wrap justify-center content-center pr-2 md:pr-0'>
                    
                    <p className='w-full flex justify-center font-bold pb-1 pt-1 text-sm md:text-base'>{product.price * product.quantity} $</p>
                    {/* حذف محصول از سبد خرید */}
                    <button onClick={() => handleRemoveProductClick(product)} className='w-16 h-8 bg-[#f30856] text-white text-xs rounded-sm'>Remove</button>
                  </div>
                </>
              ) : (
                <p>Product details are missing.</p>
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* نمایش مجموع مبلغ کل سبد خرید */}
      <div className='w-full xl:w-[30%] flex justify-center my-4'>
        <div className='w-[360px] md:w-[400px] h-[149px] p-2.5 border-2 border-black flex flex-wrap justify-center'>
          <div className='w-[348px] flex justify-start items-center'>
            <h3 className='font-bold text-xl'>SUBTOTAL: {totalAmount} $</h3>
          </div>
          <div>
            <button className='w-[348px] h-[40px] bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-all duration-700 mt-3'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
      {/* نمایش مدل تایید حذف محصول */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmRemove} // ارسال تابع handleConfirmRemove به عنوان onConfirm
        productName={productToRemove?.title}  // ارسال نام محصول به مودال
        />
    </div>
  );
}


