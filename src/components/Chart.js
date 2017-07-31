import React from 'react';
import Nodes from './Nodes';
import Papers from './Papers';
import SubTitle from './SubTitle';
import {observer} from 'mobx-react';
import {onSVGClick, onSVGMouseOver} from '../eventhandlers/SVGEvents';
import addWindowResizer from '../eventhandlers/WindowEvents';

const Chart = observer(class Chart extends React.Component {
  constructor({store}) {
    super();
    this.store = store;
  }
  componentDidMount() {
    const headstartContainer = window.document.querySelector(".vis-col");
    const newSize = (window.innerHeight - 10 < headstartContainer.clientWidth ? window.innerHeight - 10 : headstartContainer.clientWidth);
    this.store.updateChartSize(newSize, false);
    addWindowResizer(this.store);
  }

  render() {
    let chart_content = '';
    if (this.store.papersStore.hasSelectedEntities) {
      chart_content =
        <g>
        <Nodes store={this.props.store} nodes={this.props.store.bubblesStore}/>
        <Papers store={this.props.store} papers={this.props.store.papersStore.selectedEntities}/>
        <Papers store={this.props.store} papers={this.props.store.papersStore.hoveredEntity}/>
        </g>;
    } else {
      chart_content =
        <g>
          <Papers store={this.props.store} papers={this.props.store.papersStore.flaglessPapers}/>
          <Nodes store={this.props.store} nodes={this.props.store.bubblesStore}/>
          <Papers store={this.props.store} papers={this.props.store.papersStore.activeEntities}/>
          {/*<Papers store={this.props.store} papers={this.props.store.papersStore.selectedEntities}/>*/}
          <Papers store={this.props.store} papers={this.props.store.papersStore.hoveredEntity}/>
        </g>
    }
    return (<div className="vis-col">

      <SubTitle store={this.props.store}/>

      <div id="headstart-chart">
        <svg
          width={this.props.store.svgWidth}
          height={this.props.store.svgHeight}
          id="chart-svg"
          onClick={onSVGClick.bind(this, this.props.store)}
          onMouseOver={onSVGMouseOver.bind(this, this.props.store)}
        >
          <g id="chart_canvas">
            {chart_content}
          </g>
        </svg>
      </div>
    </div>)
  }
});

export default Chart;
