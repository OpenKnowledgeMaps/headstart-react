import React from 'react';
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/lib/ToggleButton';
import { observer } from 'mobx-react';

function sortOptionsHandle(event, store) {
  if (event.target.dataset.key !== undefined)
    store.sortOption = event.target.dataset.key;
}

/**
 * SortButtons component
 * Renders a group of buttons;
 * @type {<T extends IReactComponent>(clazz: T) => void | IReactComponent | {new(): List}}
 */
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
        /* HTML starts here */
      <div className="" id="sort_container" style={{display: "block"}}>
        <span id="sortby">sort by:</span>
        <ToggleButtonGroup type="radio" name="sortbyoptions" defaultValue={1} id="sort-buttons" bsSize="sm">
          {Object.entries(sortOptions).map((entry, index) => {
            return (
              <ToggleButton bsSize="sm" value={index+1} key={index} data-key={entry[0]} onClick={(e) => sortOptionsHandle(e, store)}>{entry[1]}</ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </div>
      /* HTML ends here */
    );
  }
});

export default SortButtons;
