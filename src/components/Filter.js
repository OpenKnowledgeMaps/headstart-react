import React from 'react';
import { observer } from 'mobx-react';
import {FormGroup, FormControl, Glyphicon } from 'react-bootstrap';

/**
 * Filter component
 * Renders an input field.
 * The list and paper contents are filtered according to the input field content.
 * Matching substrings are highlighted.
 * @type {<T extends IReactComponent>(clazz: T) => void | IReactComponent | Filter}
 */
const Filter = observer(
  class Filter extends React.Component {
    constructor() {
      super();
      this.handleChange = this.handleChange.bind(this);
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
            <FormGroup bsSize="sm">
                <FormControl
                  type="text"
                  id="searchinput"
                  value={this.state.currentValue}
                  placeholder="Search..."
                  onChange={this.handleChange}
                  bsSize="sm"
                />
            </FormGroup>

          </form>
              {glyphicon}
        </div>

      );
    }
});

export default Filter;