import React from 'react';
import '../index.css';

function Menu () {
    return (
        <div className='absolute right-5 top-[65px] z-40 shadow-md'>
            <div className='w-[11px] h-[11px] rotate-45 bg-white absolute right-[34px] -top-1.5 '></div>
            <div className='w-[134px] h-[60px] bg-white text-sm p-2 rounded-[5px]'>
                <p className='hover:bg-blue-300 px-2 cursor-pointer'>Profile</p>
                <p className='hover:bg-blue-300 mt-2 px-2 cursor-pointer'>Log Out</p>
            </div>
        </div>
    );
  }

 export default Menu; 