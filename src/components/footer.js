import React from 'react';
import '../index.css';


function Footer (props) {
  
  const taskBacklog = props.info.filter((el)=>el.status === 'Backlog');
  const taskFinished= props.info.filter((el)=>el.status === 'Finished');

    return (
      <footer className='flex text-base px-5 py-3 justify-between absolute bottom-0 w-full bg-[#0067A3] text-white'>
        <div className='flex'>
            <p className='mr-9'>Active tasks: {taskBacklog.length} </p>
            <p>Finished tasks: {taskFinished.length} </p>
        </div>
        <p>Kanban board by ALEX, 2023</p>
      </footer>
    );
  }

 export default Footer; 