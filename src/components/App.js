import React, {Component} from 'react';
import Visualization from './Visualization';
import addWindowResizer from '../eventhandlers/WindowEvents';
import { startForceSim } from '../helpers/forceSimulation';

// TODO General
// TODO papers skalieren, paper text skalieren
// TODO subtitle aendern bei ausgewaehlter bubble
// TODO pdf modal
// TODO zoom animation
// TODO HTML link in Liste
// TODO SVG Click fixen
// TODO Force Sim kalibrieren
// TODO Styling
// TODO Sort by buttons
// TODO Abstract abkuerzen wenn kein Paper ausgewaehlt
// TODO Lange Bubbletitles abkuerzen
// TODO Whats this modal
// TODO selected title click -> html
// TODO Hide list
// TODO Style bei gezoomeden nicht aktiven Bubbles

// TODO Toolbox
// TODO Filter
// TODO Struktur Tools/Case Studies + notwendige Anpassungen
// TODO evtl. Liste Anpassung
// TODO short description
class App extends Component {
    componentDidMount() {
      startForceSim(this.props.store);
      addWindowResizer(this.props.store);
    }
    render() {
        return (
          <div>
            {<Visualization store={this.props.store}/>}
          </div>
        );
    }
}

export default App;
