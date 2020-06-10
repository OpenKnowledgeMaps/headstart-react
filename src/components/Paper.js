import React from 'react';
import { observer } from 'mobx-react';
import {onPaperMouseEnter, onPaperMouseLeave, onPaperClick} from '../eventhandlers/PaperEvents';
import * as d3 from "d3";

import HighlightableText from './HighlightableText';

/**
 * Paper component.
 * Renders a Paper SVG element from a PaperModel (class holding the state of a paper, see models/PaperModel.js).
 * Also contains math for the actual coordinate of the Paper on the Chart.
 * @type {<T extends IReactComponent>(clazz: T) => void | IReactComponent | (function({store?: *, paper?: *}))}
 */

class Paper extends React.Component {
  constructor(props) {
    super(props);
    const { x_, y_, w_, h_ } = this.getCoordinates();
    const path_ = this.getPath(x_, y_, w_, h_);
    const dogear_ = this.getDogEar(x_, y_, w_, h_);
    this.state = {
      x: x_,
      y: y_,
      w: w_,
      h: h_,
      path: path_,
      dogear: dogear_
    };
    this.pathRef = React.createRef();
    this.dogearRef = React.createRef();
    this.objRef = React.createRef();
  }

  getCoordinates() {
    const { orig_x, orig_y, orig_width, orig_height } = this.props.paper;
    const { zoomFactor, translationVecX, translationVecY } = this.props.store;
  
    // Actual coordinates and dimensions for the Paper is calculated from the
    // orig_ prefixed values
    // zoomFactor & translationVecX,Y are set by the zoom state
    const x_ =  zoomFactor * orig_x + translationVecX;
    const y_ =  zoomFactor * orig_y + translationVecY;
    const w_ =  zoomFactor * orig_width;
    const h_ =  zoomFactor * orig_height;
  
    return { x_, y_, w_, h_ };
  };

  componentDidUpdate(prevProps) {
    const { zoomFactor, translationVecX, translationVecY } = this.props.store;
    if (prevProps.zoomFactor === zoomFactor && prevProps.translationVecX === translationVecX && prevProps.translationVecY === translationVecY) {
      return;
    }

    this.animatePath();
  }

  animatePath() {
    const { x_, y_, w_, h_ } = this.getCoordinates();
    const path = this.getPath(x_, y_, w_, h_);

    let el = d3.select(this.pathRef.current);
    el.transition()
      .duration(500)
      .ease(d3.easeLinear)
      .attr("d", path)
      .on("end", () =>
        this.setState({
          ...this.state,
          path: path
        })
      );
  }

  animateDogEar() {
    const { x_, y_, w_, h_ } = this.getCoordinates();
    const path = this.getDogEar(x_, y_, w_, h_);

    let el = d3.select(this.dogearRef.current);
    el.transition()
      .duration(500)
      .ease(d3.easeLinear)
      .attr("d", path)
      .on("end", () =>
        this.setState({
          ...this.state,
          dogear: path
        })
      );
  }

  getPath(x, y, w, h) {
    const pathD = 'M ' + x + ' ' + y +
                  ' h ' + (0.9 * w) +
                  ' l ' + (0.1 * w) + ' ' + (0.1 * h) +
                  ' v ' + (0.9 * h) +
                  ' h ' + (-w) +
                  ' v ' + (-h);

    return pathD;
  }

  getDogEar(x, y, w, h) {
    return "M " + (x + 0.9 * w) + ' ' + y + " v " + (0.1 * h) + " h " + (0.1 * w);
  }

  render() {
    const store = this.props.store;
    const paper = this.props.paper;

    const { x_, y_, w_, h_ } = this.getCoordinates();
    let { x, y, w, h, path } = this.state;
    const { svgWidth, svgHeight, searchString, papersStore } = store;
    const {
      zoomed,
      selected,
      authors : displayAuthors,
      title,
      clicked,
      oa,
      readers,
      published_in,
      year
    } = paper;

    // Caculate enlarged paper dimensions so paper stays within svg
    // when paper is hovered in zoomed-in visualization state
    // TODO zoomed flag should be renamed hovered
    while (
      zoomed &&
      ((x + w) < svgWidth) &&
      ((y + h) < svgHeight) &&
      (w < svgWidth*0.5) &&
      (h < svgHeight*0.5)) {
      w += 1;
      h += 1.33;
    }

    // The messy part
    // Creates SVG paths
    // Adds css classes/other styles according to visualization state
    // TODO extract parts of it to functions, define css classes instead of manually styling them here
    let textClassName = 'highlightable';
    let pathClassName = clicked ? 'framed' : 'unframed';
    let openAccessStyle = oa ? {height: (15) + "px", display: "block", marginBottom:"3px"} : {display: "none"};

    let dogearPath = this.getDogEar(x, y, w, h);
    let displayStyle = {display: "block", cursor : "default"};
    let metadataStyle = {height: (0.75*h) + "px", width: (0.9*w) + "px"};
    let readersDivStyle = {height: 0.24*h + "px", width: w + "px", marginBottom: "0px", marginTop: "0px"};
    let citationsFontSize = "8px";
    let highlightStrings = searchString.split(' ');

    if (selected) {
      textClassName = 'large highlightable';
      displayStyle.cursor = "pointer";
      metadataStyle.height = (h - 20) + "px";
      readersDivStyle.height = 15 + "px";
      readersDivStyle.marginBottom = '3px';
      readersDivStyle.marginTop = '5px';
      citationsFontSize = '11px';
    } else {
      if (papersStore.hasSelectedEntities) displayStyle.display = "none";
    }
    if (zoomed) {
      textClassName = 'larger';
      citationsFontSize = '11px';
    }

    return (
      <g
        onMouseEnter={onPaperMouseEnter.bind(this, store, paper)}
        onMouseLeave={onPaperMouseLeave.bind(this, store, paper)}
        onClick={onPaperClick.bind(this, store, paper)}
        className="paper"
        style={displayStyle}
      >
        <path
          ref={this.pathRef}
          id="region"
          d={path}
          className={pathClassName}
        >
        </path>

        <path
          className="dogear"
          d={dogearPath}>
        </path>

        <foreignObject
          x={x}
          y={y}
          width={w}
          height={h}
          style={{"overflow":"hidden"}}
        >
          <div className="paper_holder">
            <div className="metadata" style={metadataStyle}>
              <div id="icons" style={openAccessStyle}>
                <p id="open-access-logo" className={textClassName}>&#xf09c;</p>
              </div>
              <p id="title" className={textClassName}>
                <HighlightableText highlightStrings={highlightStrings} value={title}/>
              </p>
              <p id="details" className={textClassName}>
                <HighlightableText highlightStrings={highlightStrings} value={displayAuthors}/>
              </p>
              <p id="in" className={textClassName}>in
                <span className={textClassName}>
                  <HighlightableText highlightStrings={highlightStrings} value={published_in}/>
                  <span className="pubyear">
                    (<HighlightableText highlightStrings={highlightStrings} value={year} />)
                  </span>
                </span>
              </p>
            </div>
            <div className="readers" style={readersDivStyle}>
              <p id="readers" className={textClassName}>
                <span id="num-readers">{readers}</span>
                <span className="readers_entity" style={{fontSize: citationsFontSize}}> citations</span>
              </p>
            </div>
          </div>
        </foreignObject>
      </g>
    )
  }
}

export default observer(Paper);
