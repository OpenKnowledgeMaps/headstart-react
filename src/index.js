import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import UIStore from './models/UIStore';
import pubmedPayload from './static/cool_pubmed';
import DomainStore from './models/domainStore';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './stylesheets/main.css';

let domainStore = window.domainStore = new DomainStore(pubmedPayload);
domainStore.populateObjects();

let uiStore = new UIStore(domainStore);
uiStore.papersStore.disposer();
uiStore.disposer();


ReactDOM.render(
  <App store={uiStore}/>,
  document.getElementById('root')
);
