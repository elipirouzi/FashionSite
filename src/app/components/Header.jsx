"use client";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faBars,
  faChevronRight,
  faXmark,
  faUser,
  faLock,
  faEye, 
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import styled from "styled-components";
import useStore from "../store/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReactDOM from "react-dom"; 


const MenuItem = styled.li`
  position: relative;
  padding: 1px;
  margin: 0 2px;
  display: flex;
  align-items: align-items;
`;
const SubMenu = styled.ul`
  opacity: 0;
  position: absolute;
  width: 190px;
  top: 30px;
  left: -10px;
  background-color: white;
  padding-left: 2px;
  transition: 0.4s;
  visibility: hidden;
`;
const ItemWithSubMenu = styled(MenuItem)`
  &:hover ${SubMenu} {
    opacity: 1;
    flex-wrap: wrap;
    visibility: visible;
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  }
`;


export default function HeaderComponent() {

  const [user, setUser] = useState(null);
  const [isClient, setIsClient] = useState(false); // اضافه کردن وضعیت برای تشخیص سمت کلاینت
  const [categories, setCategories] = useState([]);
  const router = useRouter(); // استفاده از useRouter بعد از بارگذاری در سمت کلاینت
  const cartItemCount = useStore((state) => state.cartItemCount(state)); // محاسبه تعداد اقلام
  const [isMyAccountMenuOpen, setIsMyAccountMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 100 });
  const userIconRef = useRef(null);

  // استفاده از useLayoutEffect به جای useEffect
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);


  useEffect(() => {
    if (userIconRef.current && isMyAccountMenuOpen) {
      const rect = userIconRef.current.getBoundingClientRect();
      if (!isNaN(rect.top) && !isNaN(rect.left)) {
        setMenuPosition({
          top: rect.bottom + 10,  // فاصله 10px از پایین آیکون
          left: rect.left - 230 ,
        });
      }
    }
  }, [isMyAccountMenuOpen]);


  useEffect(() => {
    const fetchData = async () => {
      const res1 = await fetch(
        "https://6778e691482f42b62e8fe02c.mockapi.io/fashion?category=ClothingCollections"
      );
      const res2 = await fetch(
        "https://6778e691482f42b62e8fe02c.mockapi.io/fashion?category=Shoes&BagsCollections"
      );
      const res3 = await fetch(
        "https://6778e691482f42b62e8fe02c.mockapi.io/fashion?category=Accessories"
      );
      const res4 = await fetch(
        "https://6778e691482f42b62e8fe02c.mockapi.io/fashion?category=BeautyProduct"
      );
      const data1 = await res1.json();
      const data2 = await res2.json();
      const data3 = await res3.json();
      const data4 = await res4.json();

      // ترکیب همه‌ی داده‌ها در یک آرایه
      setCategories([...data1, ...data2, ...data3, ...data4]);
    };
    fetchData();
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const [isSecondSubMenuOpen, setIsSecondSubMenuOpen] = useState(false);
  const toggleSecondSubmenu = () => {
    setIsSecondSubMenuOpen(!isSecondSubMenuOpen);
  };

  const [isThirdSubMenuOpen, setIsThirdSubMenuOpen] = useState(false);
  const toggleThirdSubMenu = () => {
    setIsThirdSubMenuOpen(!isThirdSubMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsSubMenuOpen(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // غیرفعال کردن اسکرول وقتی منو باز است
      if (isMenuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = ""; // برگرداندن اسکرول به حالت اولیه
      }
      // پاکسازی در زمان بسته شدن منو
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isMenuOpen]);

  const toggleMyAccountMenu = () => {
    // setIsMyAccountMenuOpen(!isMyAccountMenuOpen);
    setIsMyAccountMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isMyAccountMenuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isMyAccountMenuOpen]);

  // تغيير وضعيت login به createuser
  const [isLogin,setIsLogin] = useState(true)
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorSignupMessage, setErrorSignupMessage] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // وضعیت برای نمایش یا پنهان کردن پسورد
  const [name, setName] = useState('')
  const [gender, setGender] =useState('')
  const [country, setCountry] = useState('')

  const validateEmail = (email) => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleBlur = () => {
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address!');
      setErrorSignupMessage('Please enter a valid email address!');
    } else {
      setErrorMessage(''); // اگر ایمیل معتبر بود، پیام خطا پاک می‌شود
      setErrorSignupMessage(''); // اگر ایمیل معتبر بود، پیام خطا پاک می‌شود
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // تغییر وضعیت نمایش پسورد
  };


  const handleLogin = async () => {
    try {
      const response = await fetch(
        `https://6778e691482f42b62e8fe02c.mockapi.io/persons?email=${email}&password=${password}`,
        { method: "GET" }
      );
      
      if (response.status === 404) {
        alert("User not found. Please check your email and password.");
        setEmail('');
        setPassword('')
        return;
      }

      if (!response.ok) {
        alert("There was an error with the request. Status code: " + response.status);
        return;
      }
  
      const data = await response.json();
  
      // اگر داده‌ها خالی بودند
      if (Array.isArray(data) && data.length === 0) {
        alert("Invalid email or password");
        return;
      }
  
      // در صورتی که کاربر پیدا شد، بررسی ایمیل و پسورد
      const user = data[0];
      if (
        user.email.trim().toLowerCase() === email.trim().toLowerCase() &&
        user.password.trim() === password.trim()
      ) {
        // ذخیره کردن اطلاعات کاربر در localStorage
        localStorage.setItem('user', JSON.stringify(user));
        setIsLogin(true); // وضعیت ورود کاربر را تغییر می‌دهیم
        setUser(user);

        // هدایت به صفحه مورد نظر پس از ورود موفق
        setTimeout(() => {
          if (email.toLowerCase() === "admin") {
            router.push("/adminpanel");
            setIsMyAccountMenuOpen(false)
            setEmail('')
            setPassword('')
          } else {
            router.push("./");
            setIsMyAccountMenuOpen(false)
            setEmail('');
            setPassword('')
          }
        }, 200);
      } else {
        alert("Invalid email or password");
        setEmail('');
        setPassword('')
      }
    } catch (error) {
      console.error("Error during the request:", error);
      alert("There was an error with the request.");
    }
  };

  const handleSignup = async () => {
    if (!validateEmail(email)) {
      setErrorSignupMessage('Please enter a valid email address!');
      return; // جلوگیری از ادامه عملیات ثبت‌نام
    } else {
      setErrorSignupMessage(''); // اگر ایمیل معتبر است، پیام خطا پاک می‌شود
    } 

    // بررسی ایمیل تکراری
    const checkEmailResponse = await fetch(`https://6778e691482f42b62e8fe02c.mockapi.io/persons?email=${email}`, {
      method: "GET",
    });

    if (!checkEmailResponse.ok) {
      alert("There was an error checking the email");
      return;
    }
  
    const existingUsers = await checkEmailResponse.json();
  
    // اگر کاربری با این ایمیل قبلاً وجود داشته باشد
    if (existingUsers.length > 0) {
      setErrorSignupMessage('This email is already registered!');
      return;
    }
  
    // اگر ایمیل تکراری نیست، ادامه ثبت‌نام
    const userData = {
      name,
      email,
      password,
      gender,
      country,
      role: "user"  // اضافه کردن نقش ثابت 'user'
    };
    const response = await fetch("https://6778e691482f42b62e8fe02c.mockapi.io/persons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      alert("There was an error with the signup");
      return;
    }
    const data = await response.json();
    alert("Account created successfully!");

    // Reset form fields after successful signup
    setName('');
    setEmail('');
    setPassword('');
    setGender('');  // Reset gender
    setCountry('');  // Reset country
    setIsAgree(false);  // Reset checkbox
};

  const [isAgree, setIsAgree] = useState(false)

  // عملیات خروج کاربر
  const handleLogout = () => {
    setUser(null); // زمانی که کاربر خارج می‌شود
    localStorage.removeItem("user"); // اطلاعات کاربر از localStorage پاک می‌شود
    useStore.getState().clearBasket();
    setIsMyAccountMenuOpen(false); // بستن منو
    setIsLogin(false); // وضعیت ورود کاربر را به false تغییر می‌دهیم
    router.push('/');

  };

  return (
    <div className="w-full">
      {/* First Header */}
      <div className="h-12 bg-black	w-full flex justify-center m-auto overflow-hidden">
        <div className="w-full 2xl:w-11/12 3xl:w-80 4xl:w-70 5xl:w-60 flex flex-wrap items-center ml-5">
          <div className="hidden md:flex w-1/2 justify-start">
            <p className="text-white text-xs">
              Free shipping, 30-day return or refund guarantee.
            </p>
          </div>
          <div className="w-full justify-center md:w-1/2 flex md:justify-end">
            <div className="flex items-center">
              {user ? (
                <p className="text-gray-400 text-xs">Dear, {user.name} !</p> // نمایش ایمیل کاربر
              ) 
              : ('')
              }
            </div>
            {/* User Icon */}
            <div ref={userIconRef} className="relative cursor-pointer">
              <div
                className="text-white text-sm font-bold px-3 hover:text-[#F71357]"
                onClick={toggleMyAccountMenu}
              >
                <FontAwesomeIcon icon={faUser} className="text-lg" />
              </div>
              {/* فقط زمانی که کاربر وارد شده باشد، گزینه‌های Log out و Account Settings */}
              {user && isMyAccountMenuOpen && ReactDOM.createPortal(
                <div
                  className="ml-5 w-[290px] h-[150px] flex flex-wrap left-1000 justify-center absolute z-50 bg-white border-[1px] border-gray-200"
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px",
                      top: menuPosition.top, // استفاده از مقدار معتبر top
                      left: menuPosition.left, // استفاده از مقدار معتبر left
                  }}>
                  <div className="w-full flex justify-center flex-wrap mt-3">
                    <div
                      className="flex justify-center items-center w-[260px] h-[50px] border-[1px] border-gray-300 hover:border-black cursor-pointer"
                      // onClick={() => alert("Go to Account Settings")}
                    >
                      <Link href='/accountsetting'>
                        <h6 className="text-black">Account Setting</h6>
                      </Link>
                    </div>
                    <div
                      className="flex justify-center items-center w-[260px] h-[50px] bg-black hover:bg-gray-600 cursor-pointer"
                      onClick={handleLogout}
                    >
                      <h6 className="text-white">Log out</h6>
                    </div>
                  </div>
                </div>,
                document.body // در اینجا منو را به `body` می‌چسبانیم تا در بالاترین لایه قرار گیرد
              )}

              {/* اگر کاربر وارد نشده باشد، گزینه My Account */}
              {!user && isMyAccountMenuOpen && (
                <div
                  className={`w-full h-full flex fixed justify-center flex-wrap m-auto shadow-lg transition-all duration-700 ease-in-out overflow-y-auto top-0 left-0 z-50 bg-white opacity-[.98] ${
                    isMyAccountMenuOpen ? "translate-y-0" : "translate-y-full"
                  }`}
                >
                  <div className="hidden md:flex md:w-[55%] lg:w-[57%] xl:w-[70%] h-full shadow-md overflow-y-auto max-h-full">
                    <Image
                      src="/pexels-valeriya-965989.jpg"
                      width={10000}
                      height={10000}
                      alt="loginpic"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full md:w-[45%] lg:w-[43%] xl:w-[30%] flex flex-wrap justify-center overflow-y-auto max-h-full">
                    <div className="w-full h-[60px] text-white bg-black flex items-center justify-center ">
                      <h2 className="text-xl font-bold">My Account</h2>
                      <div className="w-6 h-7 text-white flex items-center m-2 absolute top-2 right-2">
                        <FontAwesomeIcon
                          icon={faXmark}
                          onClick={toggleMyAccountMenu}
                          className="cursor-pointer p-1"
                        />
                      </div>
                    </div>
                    <div className="w-[70%] md:w-[80%] h-[80%] m-3 flex justify-center flex-wrap">
                      {/* header */}
                      <div className="w-full flex h-fit justify-center">
                        <div
                          className={`bg-[#ebebeb] p-3 border-[1px] border-[#d9d9d9] border-b-[black] hover:bg-[#ebebeb] hover:border-b-[black] hover:transition-all duration-500 cursor-pointer ${
                            isLogin ? "bg-[#ebebeb]" : "bg-white , border-b-[#d9d9d9]"
                          }`}
                          onClick={() => setIsLogin(true)}
                        >
                          <h4 className="text-xs font-bold lg:text-sm">Log in</h4>
                        </div>
                        <div
                          className={`bg-white p-3 border-[1px] hover:bg-[#ebebeb] hover:border-b-[black] hover:transition-all duration-500 cursor-pointer ${
                            isLogin ? "bg-white , border-b-[#d9d9d9]" : "bg-gray-200 , border-b-black"
                          }`}
                          onClick={() => setIsLogin(false)}
                        >
                          <h4 className="text-xs font-bold lg:text-sm">Create an account</h4>
                        </div>
                      </div>
                      {/* login */}
                      <div className={`w-full h-fit flex justify-center ${isLogin ? "" : "hidden"}`}>
                        <div className="w-full">
                          <div className="mb-8 mt-10">
                            <span className="ml-2 text-xs font-bold lg:text-sm">Email</span>
                            <div className="border-b-2 m-2">
                              <FontAwesomeIcon icon={faUser} className="pl-1" />
                              <input
                                type="email"
                                className="w-[87%] pl-2 outline-0 text-xs lg:text-sm py-2 bg-transparent"
                                placeholder="Email Address"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} // ذخیره مقدار ایمیل
                                onBlur={handleBlur} // بررسی فرمت ایمیل هنگام از دست دادن فوکوس
                                autoFocus
                              />
                            </div>
                              {errorMessage && <p style={{ color: 'red', fontSize:'14px', paddingLeft:'10px' }}>{errorMessage}</p>}
                          </div>
                          <div className="mb-24">
                            <span className="ml-2 text-xs font-bold lg:text-sm">Password</span>
                            <div className="border-b-2 m-2">
                              <div className="flex flex-wrap items-center">
                                <FontAwesomeIcon icon={faLock} className="pl-1" />
                                <input
                                  type={showPassword ? "text" : "password"} // تغییر نوع ورودی بر اساس وضعیت
                                  className="w-[80%] lg:w-[87%] pl-2 outline-0 text-xs lg:text-sm py-2 bg-transparent"
                                  placeholder="Password"
                                  required
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)} // ذخیره مقدار پسورد
                                />
                                <FontAwesomeIcon
                                  icon={showPassword ? faEyeSlash : faEye} // انتخاب آیکون مناسب
                                  className="flex justify-end items-center cursor-pointer"
                                  onClick={togglePasswordVisibility} // تابع برای تغییر وضعیت نمایش پسورد
                                />
                              </div>
                              
                            </div>
                          </div>
                          <div className="w-full flex justify-center">
                            <button
                              className="w-[300px] h-[40px] mb-10 text-xs lg:text-sm font-bold bg-black text-white hover:bg-white hover:text-black hover:border-[1px] border-black hover:transition-all duration-500"
                              onClick={handleLogin}
                            >
                              Log in
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* signup */}
                      <div className={`w-full min-h-full flex justify-center ${isLogin ? "hidden" : ""}`}>
                        <div className="w-full flex justify-center flex-wrap">
                          <div className="w-full mt-8">
                            <h2 className="text-md font-bold m-2">Create your account</h2>
                            <p className="text-xs m-2 mb-3 lg:text-sm">
                              Let's get started with your free sign up
                            </p>
                          </div>
                          <div className="mb-5 w-full m-1">
                            <span className="flex ml-2 text-xs font-bold lg:text-sm">Name:</span>
                            <input
                              autoFocus
                              type="text"
                              className="w-[87%] m-1 outline-0 text-xs border-b-2 p-2 bg-transparent lg:text-sm"
                              placeholder="Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                          </div>
                          <div className="mb-5 w-full m-1">
                            <span className="flex ml-2 text-xs font-bold lg:text-sm">Email:</span>
                            <input
                              type="text"
                              className="w-[87%] m-1 outline-0 text-xs border-b-2 p-2 bg-transparent lg:text-sm"
                              placeholder="Email Address"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              onBlur={handleBlur} // بررسی فرمت ایمیل هنگام از دست دادن فوکوس
                            />
                            <div>
                              {errorSignupMessage && <p className="text-red-500 text-sm pl-2">{errorSignupMessage}</p>}
                            </div>
                          </div>
                          
                          <div className="mb-5 w-full m-1">
                            <span className="ml-2 text-xs font-bold lg:text-sm">Password:</span>
                            <input
                              type="password"
                              className="w-[87%] m-1 outline-0 text-xs border-b-2 p-2 bg-transparent lg:text-sm"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                          </div>
                          <div className="mb-5 w-full m-1">
                            <span className="ml-2 text-xs font-bold lg:text-sm">Gender:</span>
                            <select
                              name="gender"
                              className="text-xs w-[87%] m-1 outline-0 border-b-2 p-2 bg-transparent lg:text-sm"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                            >
                              <option value="" disabled>
                                Select your gender ...
                              </option>
                              <option value="Female">Female</option>
                              <option value="Male">Male</option>
                            </select>
                          </div>
                          <div className="mb-5 w-full m-1">
                            <span className="ml-2 text-xs font-bold lg:text-sm">Country:</span>
                            <select
                              name="country"
                              className="text-xs w-[87%] m-1 outline-0 border-b-2 p-2 bg-transparent lg:text-sm"
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                            >
                              <option value="" disabled>
                                select country ...
                              </option>
                              <option value="Austria">Austria</option>
                              <option value="Denmark">Denmark</option>
                              <option value="France">France</option>
                              <option value="Germany">Germany</option>
                              <option value="Italy">Italy</option>
                              <option value="Japan">Japan</option>
                              <option value="Kuwait">Kuwait</option>
                              <option value="Korea, South">Korea, South</option>
                              <option value="Monaco">Monaco</option>
                              <option value="Singapore">Singapore</option>
                              <option value="Sweden">Sweden</option>
                              <option value="Switzerland">Switzerland</option>
                              <option value="United Kingdom">United Kingdom</option>
                              <option value="United States">United States</option>
                            </select>
                          </div>
                          <div className="mb-10 w-full m-1">
                            <input
                              type="checkbox"
                              id="approve"
                              required
                              checked={isAgree}
                              onChange={() => setIsAgree(!isAgree)}
                            />
                            <span className="text-xs pl-2 pb-2">
                              I agree to all Term, Privacy Policy and Fees
                            </span>
                          </div>
                          <div className="w-full flex justify-center">
                            <button
                              className={`w-[300px] h-[40px] mb-10 text-xs lg:text-sm font-bold bg-black text-white hover:bg-white hover:text-black hover:border-[1px] border-black hover:transition-all duration-500 ${
                                !isAgree || !name || !email || !password || !gender || !country
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              onClick={handleSignup}
                              disabled={
                                !isAgree || !name || !email || !password || !gender || !country
                              }
                            >
                              Sign Up
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Basket Icon */}
            <Link href="/basket" className="relative">
              <FontAwesomeIcon
                icon={faCartShopping}
                className="text-lg text-white px-5 w-8 hover:text-[#F71357]"
              />
              {cartItemCount > 0 && (
                <span className="absolute top-2 right-3 text-xs bg-[#F71357] text-white rounded-full px-1.5 py-0.5">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
      {/* Second Header */}
      <div className="h-20 bg-white w-full flex items-center shadow-lg justify-center relative z-10">
        <div className="w-full 2xl:w-11/12 3xl:w-80 4xl:w-70 5xl:w-60 flex flex-wrap items-center ml-5">
          <div className="w-1/2 pl-3 flex justify-start md:hidden">
            <div onClick={toggleMenu} className="cursor-pointer">
              {isMenuOpen ? (
                ""
              ) : (
                <FontAwesomeIcon icon={faBars} className="text-2xl" />
              )}
            </div>
          </div>
          {/* mobile menu */}
          <div
            className={`md:hidden w-full flex justify-start items-center fixed h-full top-0 left-0 bg-white bg-opacity-90 transition-all duration-700 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="absolute top-16 left-5 text-2xl m-2 font-bold">
              <FontAwesomeIcon
                icon={faXmark}
                className="cursor-pointer p-1"
                onClick={toggleMenu}
              />
            </div>
            <ul className="w-full flex flex-col items-center">
              {/* home */}
              <li className="m-6 w-11/12">
                <Link
                  href="./"
                  className="w-full flex p-1 text-lg font-bold hover:text-[#F71357]"
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              {/* store */}
              <li className="m-6 w-11/12 flex">
                <Link
                  href=""
                  className="w-full flex justify-between items-center p-1 text-lg font-bold hover:text-[#F71357]"
                  onClick={toggleSubMenu}
                >
                  Store
                  <div>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="text-sm cursor-pointer"
                    />
                  </div>
                </Link>
                <ul
                  className={`md:hidden w-full flex justify-start content-center flex-wrap fixed h-full top-0 left-0 bg-white bg-opacity-100 transition-all duration-700 ease-in-out ${
                    isSubMenuOpen ? "translate-x-0" : "-translate-x-full"
                  }`}
                >
                  <li className="absolute top-16 left-5 text-2xl m-2 font-bold">
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="cursor-pointer p-1"
                      onClick={toggleSubMenu}
                    />
                  </li>
                  {categories.map((val) => (
                    <li
                      key={val.id}
                      className="w-full text-lg text-black  m-5 font-bold p-1 hover:text-[#F71357]"
                      onClick={closeMenu}
                    >
                      <Link href={val.category}>{val.category}</Link>
                    </li>
                  ))}
                </ul>
              </li>
              {/* Contact */}
              <li className="m-6 w-11/12">
                <Link
                  href="/"
                  className="w-full flex justify-between items-center p-1 text-lg font-bold hover:text-[#F71357]"
                  onClick={toggleSecondSubmenu}
                >
                  Contact
                  <div>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="text-sm cursor-pointer"
                    />
                  </div>
                </Link>
                <ul
                  className={`md:hidden w-full flex justify-start content-center flex-wrap fixed h-full top-0 left-0 bg-white bg-opacity-100 transition-all duration-700 ease-in-out ${
                    isSecondSubMenuOpen ? "translate-x-0" : "-translate-x-full"
                  }`}
                >
                  <li className="absolute top-16 left-5 text-2xl m-2 font-bold">
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="cursor-pointer p-1"
                      onClick={toggleSecondSubmenu}
                    />
                  </li>
                  <li className="w-full text-lg text-black  m-5 font-bold p-1 hover:text-[#F71357]">
                    <Link href="/contact" onClick={closeMenu}>
                      Contact us
                    </Link>
                  </li>
                  <li className="w-full text-lg text-black  m-5 font-bold p-1 hover:text-[#F71357]">
                    <Link href="/delivery" onClick={closeMenu}>
                      Delivery Conditions
                    </Link>
                  </li>
                </ul>
              </li>
              {/* Customer Support */}
              <li className="m-6 w-11/12">
                <Link
                  href=""
                  className="w-full flex justify-between items-center p-1 text-lg font-bold hover:text-[#F71357]"
                  onClick={toggleThirdSubMenu}
                >
                  Customer Support
                  <div>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="text-sm cursor-pointer"
                    />
                  </div>
                </Link>
                <ul
                  className={`md:hidden w-full flex justify-start content-center flex-wrap fixed h-full top-0 left-0 bg-white bg-opacity-100 transition-all duration-700 ease-in-out ${
                    isThirdSubMenuOpen ? "translate-x-0" : "-translate-x-full"
                  }`}
                >
                  <li className="absolute top-16 left-5 text-2xl m-2 font-bold">
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="cursor-pointer p-1"
                      onClick={toggleThirdSubMenu}
                    />
                  </li>
                  <li className="w-full text-lg text-black  m-5 font-bold p-1 hover:text-[#F71357]">
                    <Link href="/howtoorder" onClick={closeMenu}>
                      How to order
                    </Link>
                  </li>
                  <li className="w-full text-lg text-black  m-5 font-bold p-1 hover:text-[#F71357]">
                    <Link href="/giftcards" onClick={closeMenu}>
                      Gift Cards
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          {/* logo */}
          <div className="w-1/2 md:w-1/3 flex justify-end md:justify-start">
            <Image
              src="/logo.svg"
              width="250"
              height="50"
              alt="Male&FemaleFashion"
            />
          </div>
          {/* desktop menu */}
          <ul className="hidden md:w-2/3 h-[50px] md:flex justify-end items-center pr-4">
            <li className="h-full p-1 mx-2 flex items-center">
              <Link
                href="./"
                className="text-md font-bold hover:text-[#F71357]"
              >
                Home
              </Link>
            </li>
            <ItemWithSubMenu>
              <Link
                href=""
                className="text-md font-bold hover:text-[#F71357] mx-2"
              >
                Store
              </Link>
              <SubMenu>
                {categories.map((val) => (
                  <li
                    key={val.id}
                    className="w-[93%] text-sm text-black py-3 font-bold border-b-[1px] border-gray-300 p-1 hover:text-[#F71357]"
                  >
                    <Link href={val.category}>{val.category}</Link>
                  </li>
                ))}
              </SubMenu>
            </ItemWithSubMenu>
            <ItemWithSubMenu>
              <Link
                href=""
                className="text-md font-bold hover:text-[#F71357] mx-2"
              >
                Contact
              </Link>
              <SubMenu>
                <li className="w-[93%] text-sm text-black py-3 font-bold border-b-[1px] border-gray-300 p-1 hover:text-[#F71357]">
                  <Link href="/contact">Contact Us</Link>
                </li>
                <li className="w-[93%] text-sm text-black py-3 font-bold border-b-[1px] border-gray-300 p-1 hover:text-[#F71357]">
                  <Link href="/delivery">Delivery Conditions</Link>
                </li>
              </SubMenu>
            </ItemWithSubMenu>
            <ItemWithSubMenu>
              <Link
                href=""
                className="text-md font-bold hover:text-[#F71357] mx-2"
              >
                Customer Support
              </Link>
              <SubMenu>
                <li className="w-[93%] text-sm text-black py-3 font-bold border-b-[1px] border-gray-300 p-1 hover:text-[#F71357]">
                  <Link href="/howtoorder">How to order</Link>
                </li>
                <li className="w-[93%] text-sm text-black py-3 font-bold border-b-[1px] border-gray-300 p-1 hover:text-[#F71357]">
                  <Link href="/giftcards">Gift Cards</Link>
                </li>
              </SubMenu>
            </ItemWithSubMenu>
          </ul>
        </div>
      </div>
    </div>
  );
}


