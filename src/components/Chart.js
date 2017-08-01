import React from 'react';
import Nodes from './Nodes';
import Papers from './Papers';
import SubTitle from './SubTitle';
import {observer} from 'mobx-react';
import {onSVGClick, onSVGMouseOver} from '../eventhandlers/SVGEvents';
import {hasSubstring} from './Helpers';
import addWindowResizer from '../eventhandlers/WindowEvents';

const Chart = observer(class Chart extends React.Component {
  constructor({store}) {
    super();
    this.store = store;
  }
  componentDidMount() {
    const headstartContainer = window.document.querySelector(".vis-col");
    const newSize = headstartContainer.clientWidth;
    this.store.updateChartSize(newSize, false);
    addWindowResizer(this.store);
  }

  render() {
    let {
      flaglessPapers : flaglessPapers_,
      activeEntities : activeEntities_,
      selectedEntities : selectedEntities_,
      hoveredEntity : hoveredEntity_,
    } = this.props.store.papersStore;
    const { searchString, svgWidth, svgHeight, bubblesStore } = this.props.store;
    const store = this.props.store;

    const { hasSelectedEntities, hasHoverEntities} = this.props.store.papersStore;

    const flaglessPapers = hasSelectedEntities ? '' :
      <Papers store={store} papers={flaglessPapers_.filter((paper) => hasSubstring(paper, searchString))}/>;
    const activePapers = hasSelectedEntities ? '' :
      <Papers store={store} papers={activeEntities_.filter((paper) => hasSubstring(paper, searchString))}/>;
    const selectedPapers = !hasSelectedEntities ? '' :
      <Papers store={store} papers={selectedEntities_.filter((paper) => hasSubstring(paper, searchString))}/>;
    const hoverPapers = !hasHoverEntities ? '' :
      <Papers store={store} papers={hoveredEntity_.filter((paper) => hasSubstring(paper, searchString))}/>;

    return (<div className="vis-col">

      <SubTitle store={store}/>

      <div id="headstart-chart">
        <svg
          width={svgWidth}
          height={svgHeight}
          id="chart-svg"
          onClick={onSVGClick.bind(this, store)}
          onMouseOver={onSVGMouseOver.bind(this, store)}
        >
          <g id="chart_canvas">
            <rect width={svgWidth} height={svgHeight}/>
            {flaglessPapers}
            <Nodes store={store} nodes={bubblesStore}/>
            {activePapers}
            {selectedPapers}
            {hoverPapers}
          </g>
        </svg>
      </div>
    </div>)
  }
});

export default Chart;
