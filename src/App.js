import * as React from 'react';
import Topbar from "./scenes/global/Topbar";
import Sidemenu from './scenes/global/Sidemenu';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './scenes/dashboard';

function App() {
  return (
    <div className='app'>
      <Sidemenu />
      <main className='content'>
        <Topbar />
        <Routes>
              <Route path="/" element={ <Dashboard /> }/>
              {/* <Route path="/data" element={ <Data /> }/> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
