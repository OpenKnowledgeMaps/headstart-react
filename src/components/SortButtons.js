import React from 'react';
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/lib/ToggleButton';
import { observer } from 'mobx-react';

function sortOptionsHandle(event, store) {
  if (event.target.dataset.key !== undefined)
    store.sortOption = event.target.dataset.key;
}

const SortButtons = observer(class List extends React.Component {
  componentDidMount() {
    this.props.store.sortOption = 'readers';
  }

  render() {
    return (
      <div className="" id="sort_container" style={{display: "block"}}>
        <span id="sortby">sort by:</span>
        <ToggleButtonGroup bsSize="small" type="radio" name="sortbyoptions" defaultValue={1} >
          <ToggleButton value={1} data-key="readers" onClick={(e) => sortOptionsHandle(e, this.props.store)}>citations</ToggleButton>
          <ToggleButton value={2} data-key="title" onClick={(e) => sortOptionsHandle(e, this.props.store)}>title</ToggleButton>
          <ToggleButton value={3} data-key="authors" onClick={(e) => sortOptionsHandle(e, this.props.store)}>authors</ToggleButton>
          <ToggleButton value={4} data-key="year" onClick={(e) => sortOptionsHandle(e, this.props.store)}>year</ToggleButton>
        </ToggleButtonGroup>
      </div>
    );
  }
});

export default SortButtons;