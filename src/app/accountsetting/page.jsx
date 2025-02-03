'use client'
import React, { useState, useEffect } from "react";
import { faUserPen, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation';

const AccountSetting = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    gender: '',
    country: '',
    password: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // برای مدیریت باز و بسته شدن منو
  const [isPersonalDetailsEditMode, setIsPersonalDetailsEditMode] = useState(false);
  const [isPasswordEditMode, setIsPasswordEditMode] = useState(false);
  
  const togglePersonalDetailsEditMode = () => setIsPersonalDetailsEditMode(!isPersonalDetailsEditMode);
  const togglePasswordEditMode = () => setIsPasswordEditMode(!isPasswordEditMode);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
       // بررسی نقش کاربر و هدایت به صفحه مناسب
       if (storedUser.role === 'admin') {
        router.push('/adminpanel');  // اگر کاربر Admin بود، به پنل مدیریت هدایت می‌شود
      }
    }
}, []);  // این آرایه وابستگی خالی به این معنی است که این افکت تنها یک بار در زمان مونت شدن کامپوننت اجرا خواهد شد

  const handleUpdate1 = (user) => {
    setEditFormData({
      name: user.name || '',
      gender: user.gender || '',
      country: user.country || ''
    });
    setCurrentUser(user);
    setIsPersonalDetailsEditMode(true);  // فعال کردن حالت ویرایش جزئیات شخصی
  }

  const handleUpdate2 = (user) => {
    setEditFormData({
      password: user.password || '',
    });
    setCurrentUser(user);
    setIsPasswordEditMode(true);  // فعال کردن حالت ویرایش پسورد

  };

  async function editUser(id, updatedData) {
    try {
        const res = await fetch(`https://6778e691482f42b62e8fe02c.mockapi.io/persons/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        // بررسی موفقیت آمیز بودن درخواست
        if (!res.ok) {
            throw new Error('Failed to update user');
        }
        return res.ok;
    } catch (error) {
        console.error("Error updating user:", error);
        return false;
    }
}

const handleSubmitPersonalDetails = async (e) => {
    e.preventDefault();
    const success = await editUser(currentUser.id, editFormData);
    if (success) {
        setUser({
            ...user,
            ...editFormData
        });
        setIsPersonalDetailsEditMode(false);  // بستن فرم ویرایش جزئیات شخصی
    } else {
        alert("Failed to update user. Please try again.");
    }
};

const handleSubmitPassword = async (e) => {
    e.preventDefault();
    const success = await editUser(currentUser.id, editFormData);
    if (success) {
        setUser({
            ...user,
            ...editFormData
        });
        setIsPasswordEditMode(false);  // بستن فرم ویرایش پسورد
    } else {
        alert("Failed to update user. Please try again.");
    }
};

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="w-full 2xl:w-11/12 3xl:w-80 4xl:w-70 5xl:w-60 h-full flex justify-center flex-wrap m-auto">
      <div className="w-full text-2xl font-bold text-center tracking-widest my-10">
        <h4>Account Settings</h4>
      </div>
      <div className="w-full xl:w-[100%] flex justify-center flex-wrap mb-10">
        <div className='w-[90%] h-[180px] my-7 flex content-center flex-wrap border-[1px] border-gray-200'>
          <div className='w-full flex mx-7 p-3 justify-between'>
            <h6 className='text-xl font-bold'>Personal Details</h6>
            <div className='w-[40px] h-[40px] flex justify-center items-center rounded-full cursor-pointer hover:bg-[#f7135736]'>
              <FontAwesomeIcon icon={faUserPen} onClick={() => handleUpdate1(user)} />
            </div>
          </div>
          <div className='mx-7 p-2'>
            <div className='flex p-1'>
              <h5 className='text-sm font-bold'>Name:</h5>
              <h6 className='text-sm pl-2'>{user ? user.name : "Loading..."}</h6>
            </div>
            <div className='flex p-1'>
              <h5 className='text-sm font-bold'>Gender:</h5>
              <h6 className='text-sm pl-2'>{user ? user.gender : "Loading..."}</h6>
            </div>
            <div className='flex p-1'>
              <h5 className='text-sm font-bold'>Country:</h5>
              <h6 className='text-sm pl-2'>{user ? user.country : "Loading..."}</h6>
            </div>
          </div>
        </div>
        <div className='w-[90%] h-[180px] my-7 flex content-center flex-wrap border-[1px] border-gray-200'>
          <div className='w-full flex mx-7 p-3 justify-between'>
            <h6 className='text-xl font-bold'>Email & Password</h6>
            <div className='w-[40px] h-[40px] flex justify-center items-center rounded-full cursor-pointer hover:bg-[#f7135736]'>
              <FontAwesomeIcon icon={faUserPen} onClick={() => handleUpdate2(user)} />
            </div>
          </div>
          <div className='mx-7 p-2'>
            <div className='flex p-1'>
              <h5 className='text-sm font-bold'>Email:</h5>
              <h6 className='text-sm pl-2'>{user ? user.email : "Loading..."}</h6>
            </div>
            <div className='flex p-1'>
              <h5 className='text-sm font-bold'>Password:</h5>
              <h6 className='text-sm pl-2'>{user ? user.password : "Loading..."}</h6>
            </div>
          </div>
        </div>
      </div>
      {/* Personal Details Edit Form */}
      {isPersonalDetailsEditMode && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#19191980] z-50">
          <div className="bg-white w-[80%] md:w-[65%] lg:w-[40%] xl:w-1/4 p-5 shadow-lg">
            <div className="flex justify-between">
              <h3 className="text-xl font-bold mb-5">Personal Details</h3>
              <div className="text-lg m-1 font-bold">
                <FontAwesomeIcon
                  icon={faXmark}
                  className="cursor-pointer p-1 hover:text-[#f71357]"
                  onClick={togglePersonalDetailsEditMode} // اینجا برای بستن منو
                />
              </div>
            </div>
            <form onSubmit={handleSubmitPersonalDetails}>
              <div className="mb-4">
                <label className="block text-sm">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleFormChange}
                  className="w-full p-1.5 border border-gray-300 text-xs"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm">Gender</label>
                <input
                  type="text"
                  name="gender"
                  value={editFormData.gender}
                  onChange={handleFormChange}
                  className="w-full p-1.5 border border-gray-300 text-xs"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm">Country</label>
                <input
                  type="text"
                  name="country"
                  value={editFormData.country}
                  onChange={handleFormChange}
                  className="w-full p-1.5 border border-gray-300 text-xs"
                />
              </div>
              <div className="w-full flex justify-between">
                <button type="submit" className="w-full border-[1px] border-black bg-black text-white p-3 hover:bg-white hover:text-black">SAVE CHANGES</button>
              </div>
            </form>
          </div>
        </div>
      )}
       {/* Password Edit Form */}
       {isPasswordEditMode && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#19191980] z-50">
          <div className="bg-white w-[80%] md:w-[65%] lg:w-[40%] xl:w-1/4 p-5 shadow-lg">
            <div className="flex justify-between">
              <h3 className="text-xl font-bold mb-5">Change Password</h3>
              <div className="text-lg m-1 font-bold">
                <FontAwesomeIcon
                  icon={faXmark}
                  className="cursor-pointer p-1 hover:text-[#f71357]"
                  onClick={togglePasswordEditMode} // اینجا برای بستن منو
                />
              </div>
            </div>
            <form onSubmit={handleSubmitPassword}>
              <div className="mb-4">
                <label className="block text-sm">Email</label>
                <div className="w-full p-1.5 bg-gray-200 text-xs">{user.email}</div>
              </div>
              <div className="mb-4">
                <label className="block text-sm">Password</label>
                <input
                  type="text"
                  name="password"
                  value={editFormData.password}
                  onChange={handleFormChange}
                  className="w-full p-1.5 border border-gray-300 text-xs"
                />
              </div>
              <div className="w-full flex justify-between">
              <button type="submit" className="w-full border-[1px] border-black bg-black text-white p-3 hover:bg-white hover:text-black">SAVE CHANGES</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSetting;
