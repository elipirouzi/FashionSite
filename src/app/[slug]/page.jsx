"use client";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import useStore from "../store/store";
import { use } from "react";  
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const CustomDiv = styled.div`
  button {
    opacity: 0;
    transition: 0.8s ease;
  }
  li {
    transition: 0.8s ease;
  }
  li:hover button {
    opacity: 100;
  }
  li:hover {
    border: 1px solid #d6d4d4;
  }
`;

async function getData(params) {
  const res = await fetch('https://6778e691482f42b62e8fe02c.mockapi.io/fashion?category=' + params);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return await res.json();
}

export default function Page({ params }) {
  const { updateBasket } = useStore();
  const [data, setData] = useState([]);
  const [sortOption, setSortOption] = useState(null);
  const [filterData, setFilterData] = useState({
    availableOnline: false,
    newItem: false,
    outOfStock: false,
    him: false,
    her: false,
  });

  const { slug } = use(params);

  useEffect(() => {
    if (slug) {
      getData(slug)
        .then(data => {
          setData(data[0].detail); 
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [slug]);

  const handleAddToBag = (product) => {
    if (product.count <= 0) {
      alert(`Sorry, ${product.title} is out of stock!`);
      return;
    }
    updateBasket(JSON.stringify(product));
    alert(`${product.title} has been added to your shopping bag!`);
  };

  const handleSortChange = (e) => {
    setSortOption(e);
  };

  useEffect(() => {
    if (sortOption) {
      let sortedData = [...data];
      if (sortOption === 'lowprice') {
        sortedData.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'highprice') {
        sortedData.sort((a, b) => b.price - a.price);
      }
      setData(sortedData);
    }
  }, [sortOption]);

  const filteredData = useMemo(() => {
    let filtered = [...data];

    // فیلترهای status (برای این که همزمان چندتا فیلتر فعال باشند)
    const filters = [];

    if (filterData.availableOnline) {
      filters.push(item => item.status === 'Available online');
    }
    if (filterData.newItem) {
      filters.push(item => item.status === 'New');
    }
    if (filterData.outOfStock) {
      filters.push(item => item.count <= 0);
    }

    // اگر فیلترهای status وجود دارند، آن‌ها را اعمال می‌کنیم
    if (filters.length > 0) {
      filtered = filtered.filter(item => 
        filters.some(filter => filter(item))  // هر محصول باید با حداقل یک فیلتر مطابقت داشته باشد
      );
    }

    // فیلتر جنسیت (Him و Her)
    if (filterData.him && filterData.her) {
      filtered = filtered.filter(item => item.gender === 'Him' || item.gender === 'Her');
    } else if (filterData.him) {
      filtered = filtered.filter(item => item.gender === 'Him');
    } else if (filterData.her) {
      filtered = filtered.filter(item => item.gender === 'Her');
    }

    return filtered;
  }, [data, filterData]);


  const handleFilterChange = (filterType) => {
    setFilterData(prevState => ({
      ...prevState,
      [filterType]: !prevState[filterType],
    }));
  };

  // مدیریت باز و بسته شدن منوهای فیلتر و مرتب‌سازی
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false)
  const toggleFilterMenu = ()=>{
    setIsFilterMenuOpen(!isFilterMenuOpen)
  }
  const toggleSortMenu = ()=>{
    setIsSortMenuOpen(!isSortMenuOpen)
  }
  // کنترل اسکرول
  useEffect(()=>{
    if(isFilterMenuOpen){
      document.body.style.overflow = 'hidden'
    }else{
      document.body.style.overflow = ''
    }
    return()=>{
      document.body.style.overflow = ''
    }
  },[isFilterMenuOpen])

  // کنترل اسکرول
  useEffect(()=>{
    if(isSortMenuOpen){
      document.body.style.overflow = 'hidden'
    }else{
      document.body.style.overflow = ''
    }
    return()=>{
      document.body.style.overflow = ''
    }
  },[isSortMenuOpen])

  const handleClearFilters = () => {
    // بازنشانی وضعیت فیلترها
    setFilterData({
      availableOnline: false,
      newItem: false,
      outOfStock: false,
      him: false,
      her: false,
    });
    
    // بازنشانی وضعیت مرتب‌سازی
    setSortOption(null);
  
    // بازنشانی چک‌باکس‌ها و رادیوها
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
  
    const radios = document.querySelectorAll("input[type='radio']");
    radios.forEach(radio => {
      radio.checked = false;
    });
  };
  

  const applyFilters = () => {
    let filteredData = [...data];
  
    // اعمال مرتب‌سازی
    if (sortOption === 'lowprice') {
      filteredData.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'highprice') {
      filteredData.sort((a, b) => b.price - a.price);
    }
  
    // اعمال داده‌های فیلتر شده به‌روزشده
    setData(filteredData);

    // بسته شدن منوهای فیلتر و مرتب‌سازی
  setIsFilterMenuOpen(false); // بستن منوی فیلتر
  setIsSortMenuOpen(false);   // بستن منوی مرتب‌سازی
  };
  
  return (
    <CustomDiv>
      <div className="xl:w-full 2xl:w-11/12 3xl:w-80 4xl:w-70 5xl:w-60 flex justify-center flex-wrap m-auto relative overflow-hidden z-45">
        <div className="w-full lg:w-1/5">
          {/* mobile menu */}
          <div className="w-full lg:hidden flex justify-evenly border-t-[1px] border-t-[#d6d4d4] border-b-[1px] border-b-[#d6d4d4] mt-7">
            <div className="p-5 text-xs tracking-widest cursor-pointer" onClick={toggleFilterMenu}>FILTER BY</div>
            <span className="text-[#d6d4d4] mt-4">|</span>
            <div className="p-5 text-xs tracking-widest cursor-pointer" onClick={toggleSortMenu}>SORT BY</div>
          </div>
          {/* filter page */}
          <div className={`lg:hidden w-full fixed flex justify-center items-center h-full overflow-hidden top-0 left-0 z-50 bg-[#ffffffef] bg-opacity-100 transition-all duration-700 ease-in-out ${isFilterMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className='w-6 h-7 fixed top-2 right-0 text-black flex justify-center items-center m-2'>
              <FontAwesomeIcon icon={faXmark} onClick={toggleFilterMenu}  className="cursor-pointer p-1"/>
            </div>
            <div className="w-full h-full flex justify-center content-start flex-wrap">
              <div className="w-[95%] h-[55px] flex justify-center py-2 border-b-[1px] border-[#cccbcb]">
                <h3 className="text-[28px] font-bold tracking-wide">FILTER</h3>
              </div>
              <div className="w-full flex flex-wrap p-5 mt-2">
                <h4 className="w-full text-lg font-bold">FILTER BY</h4>
                <form action="">
                  <label className="w-full flex py-1">
                    <input type="checkbox" className="mr-2.5" 
                      checked={filterData.availableOnline} // وضعیت فعلی فیلتر
                      onChange={() => handleFilterChange('availableOnline')}  value="Available online"/>AVAILABLE ONLINE
                  </label>
                  <label className="w-full flex py-1">
                    <input type="checkbox" className="mr-2.5" 
                      checked={filterData.newItem} // وضعیت فعلی فیلتر
                      onChange={() => handleFilterChange('newItem')} value="New"/>NEW
                  </label>
                  <label className="w-full flex py-1">
                    <input type="checkbox" className="mr-2.5" 
                      checked={filterData.outOfStock} // وضعیت فعلی فیلتر
                      onChange={() => handleFilterChange('outOfStock')} value="Out of stock"/>OUT OF STOCK
                  </label>
                </form>
              </div>
              <div className="w-full flex flex-wrap p-5">
                <h4 className="w-full text-lg font-bold">SELECTION FOR</h4>
                <form action="">  
                  <label className="w-full flex py-1">
                    <input type="checkbox" className="mr-2.5" 
                      checked={filterData.him} // وضعیت فعلی فیلتر
                      onChange={() => handleFilterChange('him')} value="Him"/>HIM
                  </label>
                  <label className="w-full flex py-1">
                    <input type="checkbox" className="mr-2.5" 
                      checked={filterData.her} // وضعیت فعلی فیلتر
                      onChange={() => handleFilterChange('her')} value="Her"/>HER
                  </label>
                </form>
              </div>
              <div className="w-11/12 h-12 mt-10 flex justify-between">
                <span className="w-[48%] flex justify-center items-center border-2 border-black cursor-pointer hover:text-gray-400 transition-all duration-500" onClick={handleClearFilters}>CLEAR ALL</span>
                <span className="w-[48%] flex justify-center items-center bg-black cursor-pointer text-white hover:bg-white hover:text-black border-2 hover: border-black transition-all duration-500" onClick={applyFilters}>APPLY</span>
              </div>
            </div>
          </div>
          {/* sort page */}
          <div className={`lg:hidden w-full fixed flex justify-center items-center h-full overflow-hidden top-0 left-0 z-50 bg-[#ffffffef] bg-opacity-100 transition-all duration-700 ease-in-out ${isSortMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className='w-6 h-7 fixed top-2 right-0 text-black flex justify-center items-center m-2'>
              <FontAwesomeIcon icon={faXmark} onClick={toggleSortMenu} className="cursor-pointer p-1"/>
            </div>
            <div className="w-full h-full flex justify-center content-start flex-wrap">
              <div className="w-[95%] h-[55px] flex justify-center py-2 border-b-[1px] border-[#cccbcb]">
                <h3 className="text-[28px] font-bold tracking-wide">SORT</h3>
              </div>
              <div className="w-full flex flex-wrap p-5 mt-2">
                <h4 className="w-full text-lg font-bold">SORT BY</h4>
                <form action="">
                  <label className="w-full flex py-1">
                    <input type="radio" className="mr-2.5" name="price" value="lowprice" onChange={() => handleSortChange('lowprice')}/>PRICE LOW TO HIGH
                  </label>
                  <label className="w-full flex py-1">
                    <input type="radio" className="mr-2.5" name="price" value="highprice" onChange={() => handleSortChange('highprice')}/>PRICE HIGH TO LOW
                  </label>
                </form>
              </div>
              <div className="w-11/12 h-12 mt-10 flex justify-between">
                <span className="w-[48%] flex justify-center items-center border-2 border-black cursor-pointer hover:text-gray-400 transition-all duration-500" onClick={handleClearFilters}>CLEAR ALL</span>
                <span className="w-[48%] flex justify-center items-center bg-black cursor-pointer text-white hover:bg-white hover:text-black border-2 hover: border-black transition-all duration-500" onClick={applyFilters}>APPLY</span>
              </div>
            </div>
          </div>
          {/* desktop menu */}
          <div className="hidden lg:flex flex-wrap min-w-51 h-[60vh] pt-[55px] ml-10">
            <div className="w-full">
              <h4 className="font-bold pb-3">SORT BY</h4>
              <form action="" className="flex flex-wrap">
                <label className="w-full pb-3 text-sm">
                  <input type="radio" value="lowprice" name="price" className="mr-2"
                    onChange={() => handleSortChange('lowprice')} />
                  PRICE LOW TO HIGH
                </label>
                <label className="w-full pb-3 text-sm">
                  <input type="radio" value="highprice" name="price" className="mr-2"
                    onChange={() => handleSortChange('highprice')} />
                  PRICE HIGH TO LOW
                </label>
              </form>
            </div>
            <div className="w-full">
              <h4 className="font-bold pb-3">FILTER BY</h4>
              <form action="" className="flex flex-wrap">
                <label className="w-full pb-3 text-sm">
                  <input type="checkbox" 
                    checked={filterData.availableOnline} // وضعیت فعلی فیلتر
                    onChange={() => handleFilterChange('availableOnline')} className="mr-2" />
                  AVAILABLE ONLINE
                </label>
                <label className="w-full pb-3 text-sm">
                  <input type="checkbox" 
                    checked={filterData.newItem} // وضعیت فعلی فیلتر
                    onChange={() => handleFilterChange('newItem')} className="mr-2" />
                  NEW
                </label>
                <label className="w-full pb-3 text-sm">
                  <input type="checkbox" 
                    checked={filterData.outOfStock} // وضعیت فعلی فیلتر
                    onChange={() => handleFilterChange('outOfStock')} className="mr-2" />
                  OUT OF STOCK
                </label>
              </form>
            </div>
            <div className="w-full">
               <h4 className="font-bold pb-3">SELECTION FOR</h4>
              <form action="" className="flex flex-wrap">
                 <label className="w-full col-12 pb-3 text-sm">
                  <input type="checkbox" 
                    checked={filterData.him} // وضعیت فعلی فیلتر
                    onChange={() => handleFilterChange('him')} className="mr-2" /> HIM
                </label>
                <label className="w-full col-12 pb-3 text-sm">
                  <input type="checkbox" 
                    checked={filterData.her} // وضعیت فعلی فیلتر
                    onChange={() => handleFilterChange('her')} className="mr-2" /> HER
                 </label>
             </form>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-4/5 flex justify-center">
          <ul className="flex flex-wrap justify-evenly">
            {filteredData.length > 0 ? (
              filteredData.map((val) => (
                <li key={val.id} className="w-[270px] p-2.5 h-[460px] flex flex-wrap justify-center mt-4 m-2 xl:m-5">
                  <Image src={val.image} width={290} height={300} alt={val.title} style={{ width: '95%', height: '250px', objectFit: 'contain' }} />
                  <h4 className="w-full flex flex-wrap justify-center font-bold items-center text-center">{val.title}</h4>
                  <p className="w-full flex flex-wrap justify-center font-bold items-center">{val.price} $</p>
                  {val.count <= 0 ? (
                    <p className="w-[220px] h-[35px] bg-[#F71357] text-white flex justify-center items-center">Out of stock</p>
                  ) : (
                    <button onClick={() => handleAddToBag(val)} className="w-[220px] h-[35px] bg-black text-white">ADD TO BAG</button>
                  )}
                </li>
              ))
            ) : (
              <p>No items match the selected filters.</p>
            )}
          </ul>
        </div>
      </div>
    </CustomDiv>
  );
}
