import React, {useState,useEffect} from 'react';
import '../index.css';
import { useParams, useNavigate } from 'react-router-dom';


function Content (props) {
    const params = useParams();
    const navigate = useNavigate();
    
    const storage = JSON.parse(localStorage.getItem('tasks'));
    const data = storage.find((el)=>el.id == params.id);
    const [isEditText, editText] = useState(false)
    const [changedText, changeText] = useState('')

    const goHome = () =>{
        navigate('/')
      }

    const setNewText = () =>{
        data.text = changedText;
        Object.assign(storage.find((el)=>el.id == params.id), data)
        localStorage.setItem('tasks', JSON.stringify(storage))
        editText(false);
    } 
    
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(storage));
        props.footerInfo(storage)
      }, []);
    return (
      <div className='bg-white w-full p-6'>
        <div className='flex justify-between'>
            <h1 className='text-2xl'>{data.name}</h1>
            <span className='text-3xl cursor-pointer' onClick={()=>goHome()}>X</span>
        </div>
            <textarea className='mt-9 text-lg w-full h-2/3 border-white hover:border-white' placeholder='This task has no description' defaultValue={data.text} onFocus={()=>editText(true)} onChange={(event)=>changeText(event.target.value)}/>
            {isEditText && 
            <button 
            className='border-0 bg-[#0079BF] text-white mt-4 px-2 py-1 rounded-[5px] w-[85px]'
            onClick={()=>setNewText()}>
                    Submit
            </button>}
      </div>
    );
  }

 export default  Content; 