'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faPinterest, faInstagram } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';


const CustomDiv = styled.div`
    ul div{
        inset: 0 ;
        opacity: 0 ;
        transition: .4s linear ;
        background-color: #000000d3 ;
    }
    ul li {
        visibility: hidden ;
        opacity: 0 ;
        transform: translatey(55%) ;
        transition: .4s ease-in-out ;
        background-color: transparent ;
        z-index: 20 ;
        position: absolute ;
    }
    ul:hover div{
        opacity: 1 ;
    }
  
    ul:hover li {
        opacity: 1 ;
        visibility: visible ;
        transform: translateY(0%) ;
    }
`

const HomePage = () => {
    // ابتدا state برای ذخیره داده‌ها
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [data4, setData4] = useState([]);

    // استفاده از useEffect برای بارگذاری داده‌ها
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

            // داده‌ها را در state ذخیره کنید
            setData1(data1);
            setData2(data2);
            setData3(data3);
            setData4(data4);
        };

        fetchData();
    }, []); // [] به این معنی است که فقط یکبار در زمان mount شدن کامپوننت اجرا می‌شود

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (e) =>{
        e.preventDefault()        // برای جلوگیری از رفتار پیش‌فرض فرم (که ارسال به صفحه دیگری است)
        console.log(name)
        console.log(email)
        console.log(message)
    }

    return (
        <CustomDiv>
            <div className='w-full min-h-screen'>
                <div className='relative w-full w-auto'>
                    <div>
                        <Image src='/home.jpg' width='2000' height='2000' style={{width:'100%', height:'auto', objectFit:'cover'}} alt='home.jpg'/>
                    </div>
                    <div className='absolute ml-4 top-[20%] lg:top-[10%] xl:top-[30%] left-1/6 md:ml-16 w-1/2 xl:w-4/5'>
                        <h6 className='text-md pb-4 tracking-widest text-[#F71357] font-bold lg:pb-6'>SUMMER COLLECTION</h6>
                        <h3 className='hidden lg:flex text-[42px] font-bold tracking-wide'>FALL - WINTER</h3>
                        <h3 className='hidden lg:flex text-[42px] font-bold tracking-wide'>Collection 2023</h3>
                        <p className='hidden lg:flex text-[18px] tracking-widest font-bold text-[#808080be] w-1/2 pt-6'>A specialist label creating luxury essentials. Ethically crafted
                        with an unwavering commitment to exceptional quality.</p>
                        <div className='my-1 lg:my-6'>
                            <button className='w-28 h-10 text-[#DAD7D7] bg-black md:w-44 h-16'>
                                <Link href='' >SHOP NOW</Link>
                                <FontAwesomeIcon icon={faArrowRight} className='pl-2 hidden md:inline'/>
                            </button>
                        </div>
                        <div className='hidden md:flex '>
                            <FontAwesomeIcon icon={faFacebook} className='m-2'/>
                            <FontAwesomeIcon icon={faTwitter} className='m-2'/>
                            <FontAwesomeIcon icon={faPinterest} className='m-2'/>
                            <FontAwesomeIcon icon={faInstagram} className='m-2'/>
                        </div>
                    </div>
                </div>
                {/* collections*/}
                <div className='flex justify-center flex-wrap mt-16 mb-16 w-full h-auto'>
                    <ul className='w-[300] h-[270] m-5 shadow-custom-light relative'>
                        <Image src='/clothing.webp' width={500} height={500} style={{width:'300px',height:'270px'}} alt='cloth'/>
                        <div className='absolute'></div> {/* پس‌زمینه تغییرپذیر */}
                        {data1.map((val) => {
                            let x =val.category
                            return(
                                <li key={val.id} className='w-1/2 flex flex-wrap justify-center text-center top-16 left-16 pt-3 ml-2 text-lg font-bold text-white'>Clothing Collections
                                    <Link href={x} as={x} className='w-[110px] h-[40px] flex justify-center items-center rounded text-white font-bold mt-5 bg-[#F71357] hover:text-[#f30856] hover:bg-white transition-all duration-700'>SHOP NOW</Link>
                                </li>
                            )
                        })}
                    </ul>
                    <ul className='w-[300] h-[270] m-5 shadow-custom-light relative'>
                        <Image src='/shoes.webp' width={500} height={500} style={{width:'300px',height:'270px'}} alt='shoes'/>
                        <div className='absolute'></div>
                        {data2.map((val) => {
                            let x =val.category
                            return(
                                <li key={val.id} className='w-1/2 flex flex-wrap justify-center text-center top-16 left-16 pt-3 ml-2 text-lg font-bold text-white'>Shoes & Bags Spring
                                    <Link href={x} as={x} className='w-[110px] h-[40px] flex justify-center items-center rounded text-white font-bold mt-5 bg-[#F71357] hover:text-[#f30856] hover:bg-white transition-all duration-700'>SHOP NOW</Link>
                                </li>
                            )
                        })}
                    </ul>
                    <ul className='w-[300] h-[270] m-5 shadow-custom-light relative'>
                        <Image src='/access.webp' width={500} height={500} style={{width:'300px',height:'270px'}} alt='accessory'/>
                        <div className='absolute'></div>
                        {data3.map((val) => {
                            let x =val.category
                            return(
                                <li key={val.id} className='w-1/2 flex flex-wrap justify-center text-center top-16 left-16 pt-3 ml-2 text-lg font-bold text-white'>Accessories Collections
                                    <Link href={x} as={x} className='w-[110px] h-[40px] flex justify-center items-center rounded text-white font-bold mt-5 bg-[#F71357] hover:text-[#f30856] hover:bg-white transition-all duration-700'>SHOP NOW</Link>
                                </li>
                            )
                        })}
                    </ul>
                    <ul className='w-[300] h-[270] m-5 shadow-custom-light relative'>
                        <Image src='/cream.jpg' width={500} height={500} style={{width:'300px',height:'270px'}} alt='cream'/>
                        <div className='absolute'></div>
                        {data4.map((val) => {
                            let x =val.category
                            return(
                                <li key={val.id} className='w-1/2 flex flex-wrap justify-center text-center top-16 left-16 pt-3 ml-2 text-lg font-bold text-white'>Beauty Products
                                    <Link href={x} as={x} className='w-[110px] h-[40px] flex justify-center items-center rounded text-white font-bold mt-5 bg-[#F71357] hover:text-[#f30856] hover:bg-white transition-all duration-700'>SHOP NOW</Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                {/* news */} 
                <div className='flex justify-center flex-wrap mt-24 w-full h-max pb-20'>
                    <div className='w-full flex justify-center mb-2'>
                        <h5 className='text-[#f30856] font-bold tracking-widest text-lg'>LATEST NEWS</h5>
                    </div>
                    <div className='w-full flex justify-center mt-5'>
                        <h3 className='font-bold tracking-widest text-3xl'>Fashion New Trends</h3>
                    </div>
                    <div className='flex justify-center flex-wrap'>
                        <div className='m-8 pb-16 relative'>
                            <div>
                                <Image src='/news1.jpg' width={500} height={500} style={{width:'300px', height:'300px', objectFit:'cover'}} alt='news1'/>
                            </div>
                            <div className='bg-white absolute w-[250px] top-[250px] left-[25px] p-2.5'>
                                <div className='flex justify-center mb-2'>
                                    <FontAwesomeIcon icon={faCalendarDays} />
                                    <p className='pl-2'>12 February 2022</p>
                                </div>
                                <div className='text-center text-md font-semibold mb-2'>
                                    <h5>What Curling Irons Are The Best Ones</h5>
                                </div>
                                <div className='text-[#f30856] font-bold text-lg text-center'>
                                    <Link href=''>read more</Link>
                                </div>
                            </div>
                        </div>
                        <div className='m-8 pb-16 relative'>
                            <div>
                                <Image src='/news2.jpg' width={500} height={500} style={{width:'300px', height:'300px', objectFit:'cover'}} alt='news2'/>
                            </div>
                            <div className='bg-white absolute w-[250px] top-[250px] left-[25px] p-2.5'>
                                <div className='flex justify-center mb-2'>
                                    <FontAwesomeIcon icon={faCalendarDays} />
                                    <p className='pl-2'>17 February 2022</p>
                                </div>
                                <div className='text-center text-md font-semibold mb-2'>
                                    <h5>The Health Benefits Of Sunglasses</h5>
                                </div>
                                <div className='text-[#f30856] font-bold text-lg text-center'>
                                    <Link href=''>read more</Link>
                                </div>
                            </div>
                        </div>
                        <div className='m-8 pb-16 relative'>
                            <div>
                                <Image src='/news3.jpg' width={500} height={500} style={{width:'300px', height:'300px', objectFit:'cover'}} alt='news3'/>
                            </div>
                            <div className='bg-white absolute w-[250px] top-[250px] left-[25px] p-2.5'>
                                <div className='flex justify-center mb-2'>
                                    <FontAwesomeIcon icon={faCalendarDays} />
                                    <p className='pl-2'>26 February 2022</p>
                                </div>
                                <div className='text-center text-md font-semibold mb-2'>
                                    <h5>Eternity Bands Do Last Forever</h5>
                                </div>
                                <div className='text-[#f30856] font-bold text-lg text-center'>
                                    <Link href=''>read more</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* info */}
                <div className='mb-10'>
                    <div className='w-11/12 2xl:w-9/12 m-auto'>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d6470.377624503655!2d51.61356440672483!3d35.81984292315485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d35.81997341699594!2d51.622265492783725!5e0!3m2!1sen!2sus!4v1735999579156!5m2!1sen!2sus" width="600" height="450" style={{width:'100%'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className='w-11/12 2xl:w-9/12 flex flex-wrap m-auto'>
                        <div className='w-full lg:w-1/2 my-5 md:pr-8'>
                            <h5 className='text-[#f30856] font-bold tracking-widest pb-1'>INFORMATION</h5>
                            <h3 className='text-3xl font-bold tracking-widest pb-2'>Contact Us</h3>
                            <p className=' pb-4'>
                                As you might expect of a company that began as a high-end
                                interiors contractor, we pay strict attention.
                            </p>
                            <h6 className='font-bold pb-2'>IRAN</h6>
                            <p className=' pb-4'>Lavasan, Nasim Street Male & Female Fashion meson</p>
                            <h6 className='font-bold pb-2'>USA</h6>
                            <p className=' pb-2'>195 E Parker Square Dr, Parker, CO 801 +43 982-314-0958</p>
                        </div>
                        <div className='w-full lg:w-1/2 my-5'>
                            <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required className='w-full md:w-[48%] lg:w-[46.5%] mr-3.5 mb-5 p-2.5 outline-none border-[1px] border-gray-300 placeholder:text-xs'/>
                            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required className='w-full md:w-[50%] lg:w-[50.5%] 2xl:w-[51%] mb-5 p-2.5 outline-none border-[1px] border-gray-300 placeholder:text-xs'/>
                            <textarea cols="20" rows="6" placeholder="Enter Message..." value={message} onChange={(e)=>setMessage(e.target.value)} className="w-full p-2.5 mb-4 outline-none border-[1px] border-gray-300 placeholder:text-xs"></textarea>
                            <div>
                                <button type="button" onClick={handleSubmit} className='w-[150px] h-[50px] bg-black text-white'>SEND MESSAGE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CustomDiv>
    );
};

export default HomePage;
