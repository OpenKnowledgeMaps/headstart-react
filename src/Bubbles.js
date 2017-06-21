import React from 'react';
import Nodes from './Nodes';
import Papers from './Papers';
import { observer } from 'mobx-react';
import logicStore from './logicStore';
/* eslint-disable react/no-direct-mutation-state */

const Bubbles =
  observer(
    (props) => (
      <svg
        style={{"border": "2px solid black", "margin": "20px"}}
        width={props.store.svgWidth}
        height={props.store.svgHeight}
        onClick={logicStore.onSVGClick.bind(logicStore, props.store.data.nodes)}
        >
        {/*{props.store.data.papers.map((paper, index) =>*/}
        {/*<Paper*/}
          {/*key={index}*/}
          {/*paper={paper}*/}
          {/*/>)}*/}
        <Papers papers={props.store.data.papers} />
        <Nodes nodes={props.store.data.nodes} />
      </svg>
    )
  );

export default Bubbles;