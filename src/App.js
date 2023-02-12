import React, {useState} from 'react';
import './index.css';
import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';


function App() {
  const [footerCounter, setFooterCounter] = useState([{}]);

  return (
        <>
          <Header/>
          <Main footerInfo={setFooterCounter}/>
          <Footer info={footerCounter}/>
        </>
  );
}

export default App;
