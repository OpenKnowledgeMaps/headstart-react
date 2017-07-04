import React from 'react';
import Nodes from './Nodes';
import Papers from './Papers';
import {observer} from 'mobx-react';
import {onSVGClick, onSVGMouseOver} from '../models/SVGEvents';

const Chart =
  observer(
    ({store}) => (
      <div style={{float: "left", display: "block"}}>
        <svg
          width={store.svgWidth}
          height={store.svgHeight}
          onClick={onSVGClick.bind(this, store)}
          onMouseOver={onSVGMouseOver.bind(this, store)}
        >
          <g>
            <Papers store={store} papers={store.papersStore.flaglessPapers} />
            <Nodes store={store} nodes={store.bubblesStore} />
            <Papers store={store} papers={store.papersStore.activeEntities} />
            <Papers store={store} papers={store.papersStore.selectedEntities} />
            <Papers store={store} papers={store.papersStore.hoveredEntity} />
          </g>
        </svg>
      </div>
    )
);

export default Chart;
