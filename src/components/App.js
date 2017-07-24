import React, {Component} from 'react';
import Visualization from './Visualization';


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
