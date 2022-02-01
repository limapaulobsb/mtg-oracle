import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Oracle from './pages/Oracle';
import NotFound from './pages/NotFound';

function App() {
  return (
    <main>
      <header>
        <h1>MtG Oracle</h1>
      </header>
      <Routes>
        <Route path='/' element={ <Oracle /> } />
        <Route path='*' element={ <NotFound /> } />
      </Routes>
    </main>  
  );
}

export default App;
