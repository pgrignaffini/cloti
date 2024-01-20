import React from 'react'
import { RiHome7Line } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { BsShopWindow } from "react-icons/bs";
import { TbHanger } from "react-icons/tb";

function Navigation() {
    return (
        <div className='h-16 bg-white border-t-[1px] sticky bottom-0 w-full flex p-2 justify-between'>
            <div className='flex flex-col items-center space-y-1'>
                <RiHome7Line className='w-6 h-6 text-gray-400' />
                <span className='text-xs text-gray-400'>Home</span>
            </div>
            <div className='flex flex-col items-center space-y-1'>
                <IoSearch className='w-6 h-6 text-gray-400' />
                <span className='text-xs text-gray-400'>Search</span>
            </div>
            <div className='flex flex-col items-center space-y-1'>
                <BsShopWindow className='w-6 h-6 text-gray-400' />
                <span className='text-xs text-gray-400'>Shop</span>
            </div>
            <div className='flex flex-col items-center space-y-1'>
                <TbHanger className='w-6 h-6 text-black' />
                <span className='text-xs text-black'>Guardaroba</span>
            </div>
            <div className='flex flex-col items-center space-y-1'>
                <div className='w-6 h-6 rounded-full bg-gray-400' />
                <span className='text-xs text-gray-400'>Profilo</span>
            </div>
        </div>
    )
}

export default Navigation