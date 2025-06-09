import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import BT1 from './BT1';
import BT2 from './BT2'
import MarioGame from './BT3+4';
import reportWebVitals from './reportWebVitals';
import BT6 from './BT6';
import BT5 from './BT5';
import BT7 from './BT7';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BT1 />
    <BT2 cols={6} />
    <MarioGame />
    <BT6 />
    <BT5 />
    <BT7 />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
