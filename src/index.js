import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';

import App from './components/App';
import UIStore from './models/UIStore';
import pubmedPayload from './static/cool_pubmed';
import { startForceSim } from './helpers/forceSimulation';
import {ProgressBar} from 'react-bootstrap';
import DomainStoreFactory from './models/DomainStoreFactory';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './stylesheets/main.css';
import './index.css';
import config from './config';

const domainStoreModel = DomainStoreFactory(config.service);
let domainStore = window.domainStore = new domainStoreModel(pubmedPayload);
domainStore.populateObjects();

let uiStore = new UIStore(domainStore, 900, config);
uiStore.bubblesStore.saveAllCoordsToOriginalCoords();
uiStore.papersStore.saveAllCoordsToOriginalCoords();

const PBar = observer(({store}) => {
  const progress = store.progress;
  return <ProgressBar now={progress}/>
}
);

ReactDOM.render(<PBar store={uiStore}/>, document.getElementById('root'));

startForceSim(uiStore, (store) => {
  uiStore.bubblesStore.saveAllCoordsToOriginalCoords();
  uiStore.papersStore.saveAllCoordsToOriginalCoords();
  uiStore.forceSimIsDone = true;
  ReactDOM.render(
    <App store={store}/>,
    document.getElementById('root')
  );
});
