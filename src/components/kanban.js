import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'
import TheDropDown from './theDropDown';

const KanbanBoard = (props) => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) ||[{ id: '', name: '', status: '', text: '' }]);

  const columns = ['Backlog', 'Ready', 'In Progress', 'Finished'];

  const [selectedTask, setSelectedTask] = useState(null);

  const [text, setText] = useState('');

  const [currentColumn, setCurrentColumn] = useState('');

  const [isShowInput, showInput] = useState(false)

  const dragItem = useRef(null);

  const readyToAdd = useMemo (() => {
    const indexCurrentColumn = columns.findIndex(el => el === currentColumn)
    if(currentColumn === 0) return;
    const previousStatus = columns[indexCurrentColumn-1];
    return previousStatus;
  }, [currentColumn]);

  const tasksForMove = useMemo(()=>{
    if (!tasks) return;
    return tasks.filter((el)=>el.status === readyToAdd)
  },[readyToAdd, tasks]);
  
  const handleDragStart = (e, task) => {
    dragItem.current = task;
    setSelectedTask(task);
  };

  const handleDragEnd = () => {
    setSelectedTask(null);
    dragItem.current = null;
  };

  const handleDragOver = column => e => {
    e.preventDefault();
    const task = dragItem.current;
    if (!task) return;
    task.status = column;
    setTasks([...tasks]);
  };

  const chooseTask = (chosen) => {
    const task = chosen;
    task.status = currentColumn;
    setCurrentColumn('');
    setTasks([...tasks]);
  }

  const addTask = (column) => {
    setCurrentColumn(column)
    if (isShowInput){
      showInput(false);
    }
    if (column === 'Backlog'){
      showInput(true);
    }
  }

  const openTask = () => {
    if (!text || text === ' ') return;
    setTasks([...tasks, { id: tasks.length + 1, name: `${text}`, status: 'Backlog', text: '' }]);
    showInput(false);
    setText('');
    setCurrentColumn('');
  };
  const showContent = (id) =>{
    navigate(`/task/${id}`)
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    props.footerInfo(tasks)
  }, [tasks]);


  return (
    <div className='w-full'>
      <div className='flex justify-between items-start'>
        {columns.map(column => (
          <div
            key={column}
            onDragOver={handleDragOver(column)}
            className=' bg-[#EBECF0] rounded-[10px] p-3 h-50 w-[20vw] '
          >
            <h2>{column}</h2>
            {tasks
              .filter(task => task.status === column)
              .map(task => (
                <div
                  key={task.id}
                  onDragStart={e => handleDragStart(e, task)}
                  onDragEnd={handleDragEnd}
                  draggable
                  className='bg-white rounded-[5px] text-lg mt-4'
                >
                  <h4 className='p-[7px]' onClick={()=>showContent(task.id)}>{task.name}</h4>
                </div>
                
              ))}
              <div className='flex flex-col items-start'>
                {(currentColumn !== 'Backlog' && column === currentColumn)  && <TheDropDown elements={tasksForMove} title='Выберите задачу' chosen={chooseTask} />}
                {(currentColumn === 'Backlog' && column === currentColumn)  && <input className='bg-white rounded-[5px] w-full text-lg mt-4 p-[7px]' 
                  value={text} 
                  onInput={event => setText(event.target.value)}
                />}
                {(currentColumn === 'Backlog' && column === currentColumn)
                &&
                <button 
                  className='border-0 bg-[#0079BF] text-white mt-4 px-2 py-1 rounded-[5px] w-[85px]' 
                  onClick={openTask}>
                    Submit
                </button>}
                
                {(!isShowInput || column !== 'Backlog') &&
                <button 
                  className='border-0 bg-inherit text-black mt-4 disabled:text-gray-500'
                  disabled={column !== 'Backlog' && tasks.filter((el)=>el.status === columns[columns.findIndex(el => el === column) - 1]).length === 0} 
                  onClick={()=>{addTask(column)}}>
                    + Add card
                </button>}
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;