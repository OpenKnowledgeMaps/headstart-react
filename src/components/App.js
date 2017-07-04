import React, {Component} from 'react';
import './App.css';
import Bubbles from './Bubbles';
import { startForceSim } from '../helpers/forceSimulation';

class App extends Component {
    componentDidMount() {
      startForceSim(this.props.store);
    }
    render() {
        return (
          <div>
            {<Bubbles store={this.props.store}/>}
          </div>
        );
    }
}

export default App;
