import React from 'react';
import Chart from './Chart';
import List from './mainHtmlCarriers/List';
import { observer } from 'mobx-react';
/* eslint-disable react/no-direct-mutation-state */

/**
 * Visualization component.
 * Wraps components Chart and List.
 * Passes uiStore as a prop to Chart and List.
 */
const Visualization =
  observer(
    ({store}) => (
      <div>
        <div className="container-headstart">
          <Chart store={store}/>
          <List store={store}/>
        </div>
      </div>
    )
  );

export default Visualization;
