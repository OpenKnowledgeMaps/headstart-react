import React from 'react';
import ReactDOM from 'react-dom';
import data from './static/Data';
import App from './components/App';
import UIStore from './models/UIStore';
import './index.css';

let uiStore = new UIStore(data);
uiStore.papersStore.disposer();
uiStore.disposer();

ReactDOM.render(
  <App store={uiStore}/>,
  document.getElementById('root')
);
