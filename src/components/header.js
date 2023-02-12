import React, {useState} from 'react';
import UserAvatarIcon from '../assets/user-avatar';
import DropDownIcon from '../assets/drop-down';
import Menu from './menu';
import '../index.css';



function Header (props) {
  const [isShowMenu,showMenu] = useState(false) 

    return (
      <header className='flex px-5 py-3 justify-between w-full bg-[#0067A3]'>
        <h1 className='text-2xl text-white'>Awesome Kanban Board</h1>
        <div>
          <div className='flex items-center  cursor-pointer' onClick={()=>showMenu(!isShowMenu)}>
              <div className='mr-2'><UserAvatarIcon/></div>
              <div className={isShowMenu ? 'rotate-180': ''}>
                <DropDownIcon color="white"/>
                </div>
            
          </div>
            {isShowMenu && <Menu/>}
        </div>
      </header>
    );
  }

 export default Header; 