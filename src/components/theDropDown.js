import React, {useState} from 'react';
import '../index.css';
import DropDownIcon from '../assets/drop-down';



function TheDropDown (props) {
    const [isShowElements, showElements] = useState(false);
    const elements = props.elements;
    const title = props.title || '___';

    return (
        <div className='w-full relative bg-white rounded-[5px] mt-4 text-lg'>
            <div className='p-[7px]'>
                {title}
                <div className={isShowElements ? 'absolute right-2 top-4 rotate-180' : 'absolute right-2 top-4'}  onClick={()=>showElements(!isShowElements)}>
                    <DropDownIcon color="black"/>
                </div>
            </div>
            { isShowElements &&
            <div className='absolute w-full bg-white py-2 top-11 z-30 max-h-[128px] overflow-y-auto rounded-[5px]'>
                    {elements && elements.map(task => (
                        <div className='transition duration-300 z-30 ease-out hover:bg-blue-300' key={task.id} onClick={()=>props.chosen(task)}>
                            <div className='p-[7px] z-30 '>
                                {task.name}
                            </div>
                        </div>
                    ))}
            </div>}
        </div>
    );
  }

 export default TheDropDown; 