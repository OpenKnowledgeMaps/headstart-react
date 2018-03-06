import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';

import App from './components/App';
import UIStore from './models/UIStore';
import pubmedPayload from './static/cool_pubmed';
import { startForceSim } from './helpers/forceSimulation';
import DomainStoreFactory from './models/DomainStoreFactory';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './stylesheets/main.css';
import config from './config';

// main entry point for the app

/*
 * DomainStore is responsible for getting data from the backend
 * and doing any data transformations that are still necessary at that point.
 * For each supported backend endpoint, DomainStoreFactory creates the
 * correct DomainStore subclass.
 */
const domainStoreModel = DomainStoreFactory(config.service);
let domainStore = window.domainStore = new domainStoreModel(pubmedPayload);
domainStore.populateObjects();

/*
 * UIStore holds all of the the application state.
 */
const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
let uiStore = new UIStore(domainStore, config, w*0.6, h);
uiStore.bubblesStore.saveAllCoordsToOriginalCoords();
uiStore.papersStore.saveAllCoordsToOriginalCoords();

/*
 * Takes the results of backend clustering
 * and calculates the paper & bubble layout using the d3 force simulation methods;
 * When done, render the App component to a div with ID root.
 * uiStore is passed down the component hierarchy as a prop to all components that need the
 * application state.
 */
ReactDOM.render(
  <App store={uiStore}/>,
  document.getElementById('root')
);
