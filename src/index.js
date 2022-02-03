import React from 'react';
import ReactDOM from 'react-dom';

import MainProvider from './context/MainProvider';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <MainProvider>
      <App />
    </MainProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
