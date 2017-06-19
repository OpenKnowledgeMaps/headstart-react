import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import uiStore from './UIStore';
import './index.css';


ReactDOM.render(
  <App store={uiStore}/>,
  document.getElementById('root')
);
