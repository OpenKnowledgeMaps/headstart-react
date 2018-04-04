import React from 'react';
import Nodes from './Bubbles';
import Papers from './Papers';
import SubTitle from './SubTitle';
import {observer} from 'mobx-react';
import {onSVGClick, onSVGMouseOver} from '../eventhandlers/SVGEvents';
import {hasSubstring} from './Helpers';
import addWindowResizer from '../eventhandlers/WindowEvents';
import {startForceSim} from "../helpers/forceSimulation";

/**
 * The Chart component.
 * Renders the subtitle of the chart and the chart svg element itself.
 * Connected to MobX through the observer() wrapper;
 * @type {<T extends IReactComponent>(clazz: T) => void | IReactComponent | Chart}
 */
const Chart = observer(
  class Chart extends React.Component {
  /**
   * React lifecycle hook called after the initial rendering of
   * the Chart component.
   * Uses d3 force methods to calculate the bubbe and paper layout.
   * When done updates the current size of the svg according
   * to the vis-col div's width;
   */
  componentDidMount() {
    const { store } = this.props;
    let { bubblesStore, papersStore, forceSimIsDone } = store;
    // TODO show indicator/spinner while layout is calculating ?
    startForceSim(store, (store) => {
      bubblesStore.saveAllCoordsToOriginalCoords();
      papersStore.saveAllCoordsToOriginalCoords();
      forceSimIsDone = true;
    });
    store.updateDimensions();
    addWindowResizer(store);
  }

  /**
   * Renders the left column of the visualization
   * containing the svg and the subtitle.
   * Papers are split into 4 categories so they can be rendered
   * to the svg in the correct order (last rendered element in an svg is 'topmost' element).
   * @returns {*}
   */
  render() {
    const { store } = this.props;
    const { searchString, svgWidth, svgHeight, bubblesStore, papersStore } = store;
    let {
      hasSelectedEntities,
      hasHoverEntities,
      flaglessPapers,
      activeEntities,
      selectedEntities,
      hoveredEntities
    } = papersStore;

    // Filter papers according to the flags they have (hover/selected/active)
    // and the searchString;
    // Convert them to Papers components
    // searchString is the input of the list search
    flaglessPapers = hasSelectedEntities ? '' :
      <Papers store={store} papers={flaglessPapers.filter((paper) => hasSubstring(paper, searchString))}/>;
    const activePapers = hasSelectedEntities ? '' :
      <Papers store={store} papers={activeEntities.filter((paper) => hasSubstring(paper, searchString))}/>;
    const selectedPapers = !hasSelectedEntities ? '' :
      <Papers store={store} papers={selectedEntities.filter((paper) => hasSubstring(paper, searchString))}/>;
    const hoverPapers = !hasHoverEntities ? '' :
      <Papers store={store} papers={hoveredEntities.filter((paper) => hasSubstring(paper, searchString))}/>;

    return (
        <div className="vis-col">

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
      </div>
  )
  }
});

export default Chart;
