import React from 'react';
import Chart from './Chart';
import List from './List'
import { observer } from 'mobx-react';
/* eslint-disable react/no-direct-mutation-state */

const Visualization =
  observer(
    ({store}) => (
      <div style={{width: store.svgWidth + store.listWidth, height: store.svgHeight, display: "block"}}>
        <Chart store={store}/>
        <List store={store}/>
      </div>
    )
  );

export default Visualization;