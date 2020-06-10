import React from 'react';
import {observer} from 'mobx-react';
import HighlightableText from './HighlightableText';
import {onBubbleMouseEnter, onBubbleMouseLeave, onBubbleClick, onBubbleDoubleClick} from '../eventhandlers/BubbleEvents';
import * as d3 from "d3";

/**
 * Bubble component
 * Sets Bubble coordinates/dimensions and other styling according to state
 * Binds eventlisteners to bubbles
 * @type {<T extends IReactComponent>(clazz: T) => void | IReactComponent | (function({node?: *, store?: *}))}
 */
class Bubble extends React.Component {
  constructor(props) {
    super(props);
    const { x_, y_, r_ } = this.getCoordinates();
    this.state = {
      x: x_,
      y: y_,
      r: r_
    };
    this.circleRef = React.createRef();
  }

  getCoordinates() {
    const { orig_x, orig_y, orig_r } = this.props.node;
    const { zoomFactor, translationVecX, translationVecY } = this.props.store;
  
    const x_ = zoomFactor * orig_x + translationVecX;
    const y_ = zoomFactor * orig_y + translationVecY;
    const r_ = zoomFactor * orig_r;
  
    return { x_, y_, r_ };
  };

  componentDidUpdate(prevProps) {
    const { zoomFactor, translationVecX, translationVecY } = this.props.store;
    if (prevProps.zoomFactor === zoomFactor && prevProps.translationVecX === translationVecX && prevProps.translationVecY === translationVecY) {
      return;
    }
    let el = d3.select(this.circleRef.current);
    const { x_, y_, r_ } = this.getCoordinates();

    el.transition()
      // TODO config
      .duration(500)
      .ease(d3.easeLinear)
      .attr("cx", x_)
      .attr("cy", y_)
      .attr("r", r_)
      .on("end", () =>
        this.setState({
          ...this.state,
          x: x_,
          y: y_,
          r: r_
        })
      );
  } 

  render() {
    let node = this.props.node;
    let store = this.props.store;

    let circleClassName = null;
    let circleStyle = {fillOpacity: "0.8"};
    if (store.bubblesStore.hasSelectedEntities) {
      circleClassName = (node.selected) ? "zoom_selected" : "zoom_unselected";
      circleStyle.fillOpacity = (node.selected) ? "1." : "0.1";
    } else {
      circleClassName = node.active ? "zoom_selected" : "area";
      circleStyle.fillOpacity = (node.active || node.selected) ? "1." : "0.8";
    }
    
    const { x_, y_, r_ } = this.getCoordinates();
    const { x, y, r } = this.state;

    const sqrtOfTwo = Math.sqrt(2);
    let areaTitleStyle = {wordWrap : "break-word", fontSize : "12px", width: 2*r_/sqrtOfTwo, height: 2*r_/sqrtOfTwo};
    if ((node.active || node.selected) || (store.bubblesStore.hasSelectedEntities && !node.selected)) {
      areaTitleStyle.display = "none";
    }

    if (x !== x_ || y !== y_ || r !== r_) {
      areaTitleStyle.display = "none";
    }
    
    let titleFontSize = "16px";
    if (store.svgWidth <= 650) {
      titleFontSize = "12px";
    } else if (store.svgWidth <= 1050) {
      titleFontSize = "14px";
    }

    const highlightStrings = store.searchString.split(' ');

    const areaName = (node.area.length > 55) ? node.area.slice(0,55) + "..." : node.area;
    return (
      <g onMouseEnter={onBubbleMouseEnter.bind(this, store, node)}
          onMouseLeave={onBubbleMouseLeave.bind(this, store)}
          onClick={onBubbleClick.bind(this, store, node)}
          onDoubleClick={onBubbleDoubleClick.bind(this, store, node)}
          className="bubble_frame"
      >
        <circle
          ref={this.circleRef}
          className={circleClassName}
          r={r}
          cx={x}
          cy={y}
          style={circleStyle}
        />
        <foreignObject
          x={x_ - r_/sqrtOfTwo}
          y={y_ - r_/sqrtOfTwo}
          width={2 * r_ / sqrtOfTwo}
          height={2 * r_ / sqrtOfTwo}
          id="area_title_object"
          className="headstart"
        >
          <div className="outerDiv">
            <div id="area_title" style={areaTitleStyle} className="innerDiv">
                <h2 className="highlightable" style={{fontSize: titleFontSize}}>
                  <HighlightableText highlightStrings={highlightStrings} value={areaName} />
                  </h2>
            </div>
          </div>
        </foreignObject>
      </g>
    );
  }
}

export default observer(Bubble);
