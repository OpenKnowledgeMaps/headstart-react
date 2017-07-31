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
    const glyphicon = (this.state.currentValue !== '') ?
      <Glyphicon id='searchclear' glyph="remove-circle" onClick={this.clearSearch.bind(this)} style={{display: this.state.displayClearButton}}/>
      : '';
    return (
      <div className="" id="filter_container" style={{width: '187px', height: "30px"}}>
        <form>
          <FormGroup>
              <FormControl
                type="text"
                id="searchinput"
                value={this.state.currentValue}
                placeholder="Search..."
                onChange={this.handleChange.bind(this)}
              />
          </FormGroup>

        </form>
            {glyphicon}
      </div>

    );
  }
});

export default Filter;