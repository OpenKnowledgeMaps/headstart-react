/**
 * Created by rbachleitner on 6/27/17.
 */
import React from 'react';
import Nodes from './Nodes';
import Papers from './Papers';
import {observer} from 'mobx-react';
import {onSVGClick, onSVGMouseOver} from './SVGEvents';

const Chart =
  observer(
    (props) => (
      <div style={{float: "left", display: "block"}}>
        <svg
          width={props.store.svgWidth}
          height={props.store.svgHeight}
          onClick={onSVGClick.bind(this, props.store.data.nodes)}
          onMouseOver={onSVGMouseOver.bind(this)}
        >
          <g>
            <Papers papers={props.store.papersStore.papers.filter((paper) => paper.active === false)} />
            <Nodes nodes={props.store.data.nodes} />
            <Papers papers={props.store.papersStore.papers.filter((paper) => ((paper.active === true) || (paper.selected === true)))} />
          </g>
        </svg>
      </div>
    )
);

export default Chart;
