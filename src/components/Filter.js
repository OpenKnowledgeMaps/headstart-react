import React from 'react';
import { observer } from 'mobx-react';
import {FormGroup, FormControl, Glyphicon, InputGroup} from 'react-bootstrap';

const Filter = observer(class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      displayClearButton: 'none',
      currentValue: ''
    }
  }

  handleChange(e) {
    this.props.store.searchString = e.target.value;
    this.setState({currentValue: e.target.value});
    if (e.target.value !== '') {
      this.setState({displayClearButton: 'block'})
    } else {
      this.setState({displayClearButton: 'none'})
    }
  }

  clearSearch(e) {
    this.props.store.searchString = '';
    this.setState({currentValue: ''});
  }

  render() {
    return (
      <div className="" id="filter_container">
        <form>
          <FormGroup>
              <FormControl
                type="text"
                id="searchinput"
                value={this.state.currentValue}
                placeholder="Search..."
                onChange={this.handleChange.bind(this)}
              />
                <Glyphicon id='searchclear' glyph="remove-circle" onClick={this.clearSearch.bind(this)} style={{display: this.state.displayClearButton}}/>
          </FormGroup>

        </form>
      </div>

    );
  }
});

export default Filter;