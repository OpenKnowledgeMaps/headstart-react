import React, {Component} from 'react';
import Visualization from './Visualization';
import addWindowResizer from '../eventhandlers/WindowEvents';
import { startForceSim } from '../helpers/forceSimulation';

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
