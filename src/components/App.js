import React, {Component} from 'react';
import Visualization from './Visualization';

/**
 * Top level Component of this project.
 * Wraps Visualization component, passes uiStore along.
 */
class App extends Component {
    componentDidMount() {
    }
    render() {
        return (
          <div className="headstart" id="visualization">
            {<Visualization store={this.props.store}/>}
          </div>
        );
    }
}

export default App;
