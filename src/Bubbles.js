import React from 'react';
import Nodes from './Nodes';
import { observer } from 'mobx-react';
/* eslint-disable react/no-direct-mutation-state */

const Bubbles =
  observer(
    (props) => (
      <svg
        style={{"border": "2px solid black", "margin": "20px"}}
        width={props.store.svgWidth}
        height={props.store.svgHeight}>
        <Nodes nodes={props.store.data.nodes} />
      </svg>
    )
  );

export default Bubbles;