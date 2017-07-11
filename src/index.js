import React from 'react';
import ReactDOM from 'react-dom';
import data from './static/Data';
import App from './components/App';
import UIStore from './models/UIStore';
import pubmedPayload from './static/cool_pubmed';
import DomainStore from './models/domainStore';
import './index.css';

let domainStore = window.domainStore = new DomainStore(pubmedPayload);
domainStore.populateObjects();

let uiStore = new UIStore(domainStore);
uiStore.papersStore.disposer();
uiStore.disposer();


ReactDOM.render(
  <App store={uiStore}/>,
  document.getElementById('root')
);
