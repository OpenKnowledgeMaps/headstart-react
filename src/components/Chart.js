import React from 'react';
import Bubble from './Bubble';
import Paper from './Paper';
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
    // TODO show indicator/spinner while layout is calculating ?
    startForceSim(this.props.store, (store) => {
      this.props.store.bubblesStore.saveAllCoordsToOriginalCoords();
      this.props.store.papersStore.saveAllCoordsToOriginalCoords();
      this.props.store.forceSimIsDone = true;
    });
    this.props.store.updateDimensions();
    addWindowResizer(this.props.store);
  }

  /**
   * Renders the left column of the visualization
   * containing the svg and the subtitle.
   * Papers are split into 4 categories so they can be rendered
   * to the svg in the correct order (last rendered element in an svg is 'topmost' element).
   * @returns {*}
   */
  render() {
    let {
      flaglessPapers,
      activeEntities,
      selectedEntities,
      hoveredEntity,
    } = this.props.store.papersStore;
    const { searchString, svgWidth, svgHeight, bubblesStore } = this.props.store;
    const store = this.props.store;

    const { hasSelectedEntities, hasHoverEntities} = this.props.store.papersStore;
    //
    // // Filter papers according to the flags they have (hover/selected/active)
    // // and the searchString;
    // // Convert them to Papers components
    // // searchString is the input of the list search
    // flaglessPapers = hasSelectedEntities ? '' :
    //   <Papers store={store} papers={flaglessPapers.filter((paper) => hasSubstring(paper, searchString))}/>;
    // const activePapers = hasSelectedEntities ? '' :
    //   <Papers store={store} papers={activeEntities.filter((paper) => hasSubstring(paper, searchString))}/>;
    // const selectedPapers = !hasSelectedEntities ? '' :
    //   <Papers store={store} papers={selectedEntities.filter((paper) => hasSubstring(paper, searchString))}/>;
    // const hoverPapers =
    //   <Papers store={store} papers={this.props.store.papersStore.entities} />;
    const compareEntities = (a,b) => {
      return a.zIndex - b.zIndex;
    };
    const entities = store.bubblesStore.entities.concat(store.papersStore.entities);
    const zIndices = [0,1,2,3,4,5,6,7,8];
    return (
        <div className="vis-col">

          <SubTitle store={store}/>

          <div id="headstart-chart">
            <svg
              width={svgWidth}
              height={svgHeight}
              id="chart-svg"
              // onClick={onSVGClick.bind(this, store)}
              // onMouseOver={onSVGMouseOver.bind(this, store)}
            >
              <g id="chart_canvas">
                <rect width={svgWidth} height={svgHeight}/>
                {zIndices.map((index) =>
                  entities.filter((entity) => entity.zIndex === index).map((entity) =>
                  (entity.type === 'bubble'
                  ?
                    <Bubble         key={entity.id}
                                    id={entity.id}
                                    node={entity}
                                    nodes={store.bubblesStore.entities}
                                    store={store}
                    />
                  :
                    <Paper
                      store={store}
                      key={entity.title}
                      paper={entity}
                    />
                  )
                ))};
              </g>
            </svg>
          </div>
      </div>
  )
  }
});

export default Chart;
