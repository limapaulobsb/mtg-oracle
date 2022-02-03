import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NameSearch from './components/NameSearch';
import AdvancerSearch from './pages/AdvancedSearch';
import CardDetails from './pages/CardDetails';
import NotFound from './pages/NotFound';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>MtG Oracle</h1>
        <NameSearch />
      </header>
      <Routes>
        <Route path='/' element={<AdvancerSearch />} />
        <Route path='/details/:id' element={<CardDetails />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
