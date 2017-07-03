import React, {Component} from 'react';
import './App.css';
import Bubbles from './Bubbles';
import logicStore from '../models/logicStore';

class App extends Component {
    componentDidMount() {
      logicStore.onAppStart();
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
