import React from 'react';
import { observer } from 'mobx-react';
import {FormGroup, FormControl} from 'react-bootstrap';

const Filter = observer(class Filter extends React.Component {
  handleChange(e) {
    this.props.store.searchString = e.target.value;
  }

  render() {
    return (
      <div className="" id="filter_container">
        <form>
          <FormGroup>
            <FormControl
              type="text"
              value={this.props.store.searchString}
              placeholder="Search here..."
              onChange={this.handleChange.bind(this)}
            />
          </FormGroup>

        </form>
      </div>

    );
  }
});

export default Filter;