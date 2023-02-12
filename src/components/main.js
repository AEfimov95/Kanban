import React from 'react';
import '../index.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import KanbanBoard from './kanban';
import Content from './taskContent';

function Main (props) {
    return (
<Router>
      <main className='flex justify-between px-5 py-3 w-full bg-blue-600 h-[calc(100vh-110px)]'>
      <Routes>
          <Route path="/" 
          element={<KanbanBoard footerInfo={props.footerInfo} />}/>
          <Route path="/task/:id" element={<Content footerInfo={props.footerInfo} />} />
      </Routes>
          
      </main>
</Router>
    );
  }

 export default Main; 