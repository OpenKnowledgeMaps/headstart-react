/**
 * Created by rbachleitner on 6/27/17.
 */
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
          onClick={onSVGClick.bind(this, store.nodesStore.entities)}
          onMouseOver={onSVGMouseOver.bind(this)}
        >
          <g>
            <Papers store={store} papers={store.papersStore.flaglessPapers} />
            <Nodes store={store} nodes={store.nodesStore} />
            <Papers store={store} papers={store.papersStore.activePapers} />
            <Papers store={store} papers={store.papersStore.selectedPapers} />
            <Papers store={store} papers={store.papersStore.hoveredPaper} />
          </g>
        </svg>
      </div>
    )
);

export default Chart;
