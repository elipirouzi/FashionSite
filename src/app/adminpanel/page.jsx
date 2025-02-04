'use client'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faBagShopping, faSackDollar, faCaretRight, faTrashCan, faUserPen, faCircleInfo } from '@fortawesome/free-solid-svg-icons' 
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import CountryMapChart from '../components/CountryMapChart'


ChartJS.register(ArcElement, Tooltip, Legend); // Register the plugin

async function getUser(params) {
    const res = await fetch('https://6778e691482f42b62e8fe02c.mockapi.io/persons')
    if(!res.ok){
        throw new Error('Failed to fetch data')
    }
    const data = await res.json()
    return data;
}

async function deleteUser(id) {
    const res = await fetch(`https://6778e691482f42b62e8fe02c.mockapi.io/persons/${id}`, {
        method: 'DELETE',
    })
    return res.ok
}

async function editUser(id, updatedData) {
    const res = await fetch(`https://6778e691482f42b62e8fe02c.mockapi.io/persons/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    })
    return res.ok
}

export default function AdminPanel() {
    const [data, setData] = useState([])
    const [isInfoOpen,setIsInfoOpen] = useState(false)
    const [editFormData,setEditFormData] = useState({
        name:'',
        email:'',
        password:'',
        gender:'',
        country:''
    })
    const[currentUser,setCurrentUser] =useState(null)
    const [editMode,setEditMode] = useState(false)

    // تعداد محصولات سبد خرید از localStorage
    const getBasketItemCount = () => {
        if (typeof window !== 'undefined') {  // این بررسی می‌کند که کد در سمت کاربر در حال اجرا باشد
            const savedBasket = localStorage.getItem('basket');
            if (savedBasket) {
                const basket = JSON.parse(savedBasket);
                return basket.reduce((total, product) => total + product.quantity, 0); // تعداد کل اقلام
            }
        }
        return 0;
    }
    
    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         const savedBasket = localStorage.getItem('basket');
    //         if (savedBasket) {
    //             const basket = JSON.parse(savedBasket);
    //             setBasketItemCount(basket.reduce((total, product) => total + product.quantity, 0));
    //         }
    //     }
    // }, []);


    const toggleInfoOpen = (id) => {
        setIsInfoOpen(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }))
    }

    useEffect(() => {
        const fetchData = async () => {
            const userData = await getUser()
            setData(userData)
        }
        fetchData()
    }, [])

    const handleDelete = async (id) =>{
        const success = await deleteUser(id)
        if (success){
            setData(data.filter(user=>user.id !== id))
        }
    }

    const handleEdit = (user)=>{
        setEditFormData({
            name: user.name || '',
            email: user.email || '',
            password: user.password || '',
            gender: user.gender || '',
            country: user.country || ''
        })
        setCurrentUser(user)
        setEditMode(true)
    }

    const handleFormChange = (e)=>{
        const {name,value}=e.target
        setEditFormData((prevData)=>({
            ...prevData,
            [name]:value
        }))
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const success = await editUser(currentUser.id, editFormData);
        if (success) {
            const updatedData = data.map((user) =>
                user.id === currentUser.id ? { ...user, ...editFormData } : user
            );
            setData(updatedData);
            setEditMode(false);
        }
    }

    const getGenderData = () => {
        const maleCount = data.filter(user => user.gender === 'Male').length
        const femaleCount = data.filter(user => user.gender === 'Female').length
        return [maleCount, femaleCount]
    }

    const genderData = getGenderData()

    const genderDataForChart = {
        labels: ['Male', 'Female'],
        datasets: [
            {
                data: genderData,
                backgroundColor: ['#FFBAE2', '#9FFCFD'], // رنگ‌های متفاوت برای هر بخش
                hoverBackgroundColor: ['#FF0886', '#05ECF2'],
                offset: 10,
                hoverOffset: 25, // فاصله هنگام هوور کردن
                borderWidth: 10, // ضخامت مرز
                borderColor: 'transparent',
                hoverBorderColor: 'transparent',
                cutout: '60%', // این مقدار برش داخلی نمودار را تنظیم می‌کند. هر چه کمتر باشد، شعاع بیشتر می‌شود.
                borderRadius: 10,
            },
        ],
        options: {
            responsive: true,
            plugins: {
                legend: {
                    // position: 'right', // قرار دادن legend در سمت راست
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.raw; // نمایش تعداد در tooltip
                        },
                    },
                },
            },
        },
    };
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1) // صفحه فعلی
    // const [itemsPerPage, setItemsPerPage] = useState(5)
    const itemsPerPage = 10 // تعداد موارد نمایش داده شده در هر صفحه
    // محاسبه داده‌های صفحه خاص
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

    // تغییر صفحه
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    // تعداد صفحات
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pageNumbers.push(i)
    }


    return (
        <div className="w-full 2xl:w-11/12 3xl:w-80 4xl:w-70 5xl:w-60 flex justify-start flex-wrap m-auto bg-[#f0f2f5] shadow-lg ">
            <div className='w-full mt-10'>
                {/* Dashboard */}
                <div className='flex flex-wrap justify-evenly mt-10'>
                    <div className='w-[300px] h-[120px] bg-white shadow-xl relative m-5'>
                        <span className='bg-[#f7328dd6] w-[60px] h-[60px] flex justify-center items-center absolute -top-4 left-5 rounded-sm'>
                            <FontAwesomeIcon icon={faUserPlus} className='text-white text-2xl'/>
                        </span>
                        <h5 className='w-full flex justify-end items-center mt-3 text-lg pr-4'>Registered User</h5>
                        <h6 className='w-full flex justify-end items-center text-lg font-bold pr-4'>+‍{data.length}</h6>
                        <h6 className='ml-3 mt-4 text-gray-500'>See more
                            <FontAwesomeIcon icon={faCaretRight} className='pl-1 text-sm'/>
                        </h6>
                    </div>
                    <div className='w-[300px] h-[120px] bg-white shadow-xl relative m-5'>
                        <span className='bg-[#0af3b48a] w-[60px] h-[60px] flex justify-center items-center absolute -top-4 left-5 rounded-sm'>
                            <FontAwesomeIcon icon={faBagShopping} className='text-white text-2xl'/>
                        </span>
                        <h5 className='w-full flex justify-end items-center mt-3 text-lg pr-4'>Total Orders</h5>
                        <h6 className='w-full flex justify-end items-center text-lg font-bold pr-4'>+{getBasketItemCount()}</h6>
                        <h6 className='ml-3 mt-4 text-gray-500'>See more
                            <FontAwesomeIcon icon={faCaretRight} className='pl-1 text-sm'/>
                        </h6>
                    </div>
                    <div className='w-[300px] h-[120px] bg-white shadow-xl relative m-5'>
                        <span className='bg-[#FFFD55] w-[60px] h-[60px] flex justify-center items-center absolute -top-4 left-5 rounded-sm'>
                            <FontAwesomeIcon icon={faSackDollar} className='text-white text-2xl'/>
                        </span>
                        <h5 className='w-full flex justify-end items-center mt-3 text-lg pr-4'>Total Sales</h5>
                        <h6 className='w-full flex justify-end items-center text-lg font-bold pr-4'>$</h6>
                        <h6 className='ml-3 mt-4 text-gray-500'>See more
                            <FontAwesomeIcon icon={faCaretRight} className='pl-1 text-sm'/>
                        </h6>
                    </div>
                </div>
                {/* List */}
                <div className='w-full flex justify-center my-10'>
                    <ul className='w-fit flex flex-wrap justify-center border-[1px] border-gray-300 overflow-x-scroll mx-10 xl:mx-0'>
                    <li className='w-full'>
                            <ul className='w-fit'>
                                <li className='w-full flex justify-between bg-[#e7eaee] shadow-sm p-2 font-bold'>
                                    <span className='w-[40px]'>ID</span>
                                    <h3 className='w-[200px]'>NAME</h3>
                                    <h3 className='w-[300px]'>EMAIL</h3>
                                    <h3 className='w-[250px]'>PASSWORD</h3>
                                    <h3 className='w-[250px]'>Gender</h3>
                                    <h3 className='w-[200px]'>COUNTRY</h3>
                                    <span className='p-3'></span>
                                </li>
                                {currentItems.map((val) => (
                                    <li key={val.id} className='w-full flex justify-between border-[1px] border-gray-100 text-sm p-3 bg-white relative'>
                                        <span className='w-[40px]'>{val.id}</span>
                                        <h4 className='w-[200px]'>{val.name}</h4>
                                        <h4 className='w-[300px]'>{val.email}</h4>
                                        <h4 className='w-[250px]'>{val.password}</h4>
                                        <h4 className='w-[250px]'>{val.gender}</h4>
                                        <h4 className='w-[200px]'>{val.country}</h4>
                                        <span className='text-base text-[#f58420b5] cursor-pointer pr-2'>
                                            <FontAwesomeIcon icon={faCircleInfo} onClick={()=>toggleInfoOpen(val.id)}/>
                                        </span>
                                        <span className={`w-[140px] h-[100px] flex flex-wrap justify-start absolute z-50 top-8 right-5 bg-white bg-opacity-90 transition-all duration-500 ease-in-out border-[1px] border-gray-200 ${isInfoOpen[val.id]? '':'hidden'}`} style={{ boxShadow:'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px'}}>
                                            <span className='w-full flex flex-wrap my-3'>
                                                <span className='flex w-full px-3 py-2 hover:bg-[#0000000a] cursor-pointer' onClick={() => handleEdit(val)}>
                                                    <FontAwesomeIcon icon={faUserPen} className='text-[#1dd783] pr-1.5 mt-0.5'/>
                                                    <h6 className=''>Edit</h6>
                                                </span>
                                                <span className='flex w-full px-3 py-2 hover:bg-[#0000000a] cursor-pointer' onClick={()=>handleDelete(val.id)}>
                                                    <FontAwesomeIcon icon={faTrashCan} className='text-[#f7336e] pr-2 mt-0.5'/>
                                                    <h6 className=''>Delete</h6>
                                                </span>
                                            </span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                    </li>
                    </ul>
                </div>
                 {/* Pagination Controls */}
                <div className="flex justify-center my-5">
                    <ul className="flex">
                        {pageNumbers.map((number) => (
                            <li key={number} className="mx-2">
                                <button onClick={() => paginate(number)} className={`w-[30px] h-[30px] text-center rounded-full shadow-sm text-xs ${currentPage === number ? 'bg-[#f8a861bd] text-white' : 'bg-white'}`}>
                                    {number}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                 {/* Edit Form */}
                {editMode && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                        <div className="bg-white w-[80%] md:w-[65%] lg:w-[40%] xl:w-1/4 p-5 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold mb-5">Edit User</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="block text-sm">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editFormData.name}
                                        onChange={handleFormChange}
                                        className="w-full p-1.5 border border-gray-300 rounded text-xs"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-sm">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={editFormData.email}
                                        onChange={handleFormChange}
                                        className="w-full p-1.5 border border-gray-300 rounded text-xs"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-sm">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={editFormData.password}
                                        onChange={handleFormChange}
                                        className="w-full p-1.5 border border-gray-300 rounded text-xs"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-sm">Gender</label>
                                    <input
                                        type="text"
                                        name="gender"
                                        value={editFormData.gender}
                                        onChange={handleFormChange}
                                        className="w-full p-1.5 border border-gray-300 rounded text-xs"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-sm">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={editFormData.country}
                                        onChange={handleFormChange}
                                        className="w-full p-1.5 border border-gray-300 rounded text-xs"
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <button type="submit" className="bg-green-400 text-white p-2 rounded">Save</button>
                                    <button type="button" onClick={() => setEditMode(false)} className="bg-gray-400 text-white p-2 rounded">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                
                )}
                {/* Charts */}
                <div className='w-full min-h-[500px] flex flex-wrap mt-8 mb-16'>
                    {/* Users Geolocation */}
                    <div className='w-full lg:w-1/2 flex justify-center flex-wrap'>
                        <div className='w-full flex justify-start py-5'>
                            <h6 className='font-bold ml-10'>Map of the distribution of users around the world</h6>
                        </div>
                        <div className='w-[90%] min-h-[520px] bg-white shadow-md flex justify-center items-center'>
                            <div className='w-[95%] overflow-hidden'>
                                <CountryMapChart users={data} />                         
                            </div>
                        </div>
                    </div>
                    {/* Gender Distribution */}
                    <div className='w-full h-full lg:w-1/2 flex justify-center flex-wrap'>
                        <div className='w-full flex justify-start py-5'>
                            <h6 className='font-bold ml-10'>Gender Distribution</h6>
                        </div>
                        <div className='w-[90%] min-h-[520px] xl:h-full bg-white shadow-md flex justify-center items-center'>
                            <div className='w-[60%] xl:w-[40%] flex justify-center'>
                                <Doughnut data={genderDataForChart} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
