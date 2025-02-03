import React from 'react'

export default function ConfirmModal({isOpen,onClose,onConfirm,productName}) {
    if(!isOpen) return null

  return (
    <div className='w-full h-full fixed top-0 left-0 bg-[#00000087] flex justify-center items-center z-50 overflow-hidden'>
        <div className='w-[420px] h-[260px] bg-white p-5 text-center relative shadow-[0 4px 6px rgba(0, 0, 0, 0.1)] flex flex-wrap justify-center content-center'>
            <h2 className='w-full text-lg font-bold'>Remove Product?</h2>
            <h4 className='w-full text-sm mt-3'>Are you sure you want to remove the following product from the basket?</h4>
            <h5 className='w-full mt-3 text-xs'>{productName}</h5>
            <div className='mt-10'>
                <button onClick={onConfirm} className='w-[170px] mx-2 p-2 bg-black text-white cursor-pointer border-[1px] border-black hover:bg-white hover:text-black duration-500 hover:transition-all hover:duration-500'>REMOVE</button>
                <button onClick={onClose} className='w-[170px] mx-2 p-2 bg-white text-black border-[1px] border-black cursor-pointer hover:bg-black hover:text-white duration-500 hover:transition-all hover:duration-500'>CANCEL</button>
            </div>
        </div>
    </div>
  )
}
