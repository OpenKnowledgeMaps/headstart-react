import React from 'react';
import Chart from './Chart';
import List from './List'
import { observer } from 'mobx-react';
/* eslint-disable react/no-direct-mutation-state */

const Visualization =
  observer(
    ({store}) => (
      <div style={{height: "900px", width: "1304px"}}>
        <Chart store={store}/>
        <List store={store}/>
      </div>
    )
  );

export default Visualization;