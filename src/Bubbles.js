import React from 'react';
import Nodes from './Nodes';
import Papers from './Papers';
import { observer } from 'mobx-react';
import {onSVGClick, onSVGMouseOver} from './SVGEvents';
/* eslint-disable react/no-direct-mutation-state */

const Bubbles =
  observer(
    (props) => (
      <svg
        style={{"border": "2px solid black", "margin": "20px"}}
        width={props.store.svgWidth}
        height={props.store.svgHeight}
        onClick={onSVGClick.bind(this, props.store.data.nodes)}
        onMouseOver={onSVGMouseOver.bind(this)}
        >
        <g>
          <Papers papers={props.store.data.papers.filter((paper) => paper.active === false)} />
          <Nodes nodes={props.store.data.nodes} />
          <Papers papers={props.store.data.papers.filter((paper) => ((paper.active === true) || (paper.selected === true)))} />
        </g>
      </svg>
    )
  );

export default Bubbles;