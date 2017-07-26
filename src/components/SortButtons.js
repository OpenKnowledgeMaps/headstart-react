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
    const {store} = this.props;
    const {sortOptions} = store.config;
    store.sortOption = Object.keys(sortOptions)[0];
  }

  render() {
    const {store} = this.props;
    const {sortOptions} = store.config;
    return (
      <div className="" id="sort_container" style={{display: "block"}}>
        <span id="sortby">sort by:</span>
        <ToggleButtonGroup bsSize="small" type="radio" name="sortbyoptions" defaultValue={1} >
          {Object.entries(sortOptions).map((entry, index) => {
            return (
              <ToggleButton value={index+1} data-key={entry[0]} onClick={(e) => sortOptionsHandle(e, store)}>{entry[1]}</ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </div>
    );
  }
});

export default SortButtons;