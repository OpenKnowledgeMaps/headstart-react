import React, {Component} from 'react';
import Visualization from './Visualization';
import { startForceSim } from '../helpers/forceSimulation';

class App extends Component {
    componentDidMount() {
      startForceSim(this.props.store);
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
