import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import UIStore from './models/UIStore';
import pubmedPayload from './static/cool_pubmed';
import DomainStore from './models/domainStore';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './stylesheets/main.css';
import { startForceSim } from './helpers/forceSimulation';
import {ProgressBar} from 'react-bootstrap';
import {observer} from 'mobx-react';
import config from './config';

let domainStore = window.domainStore = new DomainStore(pubmedPayload);
domainStore.populateObjects();

let uiStore = new UIStore(domainStore, 900, config);
uiStore.bubblesStore.saveAllCoordsToOriginalCoords();
uiStore.papersStore.saveAllCoordsToOriginalCoords();
uiStore.disposer();

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
