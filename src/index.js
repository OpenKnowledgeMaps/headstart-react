import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import uiStore from './models/UIStore';
import './index.css';


ReactDOM.render(
  <App store={uiStore}/>,
  document.getElementById('root')
);
