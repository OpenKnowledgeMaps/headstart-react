import React from 'react';
import Nodes from './Nodes';
import Papers from './Papers';
import SubTitle from './SubTitle';
import {observer} from 'mobx-react';
import {onSVGClick, onSVGMouseOver} from '../eventhandlers/SVGEvents';

const Chart =
  observer(
    ({store}) => (
      <div className="vis-col">
        <SubTitle store={store}/>
        <div id="headstart-chart">
          <svg
            width={store.svgWidth}
            height={store.svgHeight}
            id="chart-svg"
            onClick={onSVGClick.bind(this, store)}
            onMouseOver={onSVGMouseOver.bind(this, store)}
          >
            <g id="chart_canvas">
              <Papers store={store} papers={store.papersStore.flaglessPapers} />
              <Nodes store={store} nodes={store.bubblesStore} />
              <Papers store={store} papers={store.papersStore.activeEntities} />
              <Papers store={store} papers={store.papersStore.selectedEntities} />
              <Papers store={store} papers={store.papersStore.hoveredEntity} />
            </g>
          </svg>
        </div>
      </div>
    )
);

export default Chart;
