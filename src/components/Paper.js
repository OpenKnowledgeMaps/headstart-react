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
    this.isAnimatedOnMount = this.isAnimated();
    const { x_, y_, w_, h_ } = this.getCoordinates(this.isAnimatedOnMount);
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

  /**
   * Returns true if the component is mounted during the animation.
   */
  isAnimated() {
    return this.props.store.animationLock;
  }

  getCoordinates(prev = false) {
    const { orig_x, orig_y, orig_width, orig_height } = this.props.paper;
    let { zoomFactor, translationVecX, translationVecY } = this.props.store;
    if (prev) {
      const { prevZoomFactor, prevTranslationVecX, prevTranslationVecY } = this.props.store;
      zoomFactor = prevZoomFactor;
      translationVecX = prevTranslationVecX;
      translationVecY = prevTranslationVecY;
    }
  
    // Actual coordinates and dimensions for the Paper is calculated from the
    // orig_ prefixed values
    // zoomFactor & translationVecX,Y are set by the zoom state
    const x_ =  zoomFactor * orig_x + translationVecX;
    const y_ =  zoomFactor * orig_y + translationVecY;
    const w_ =  zoomFactor * orig_width;
    const h_ =  zoomFactor * orig_height;
  
    return { x_, y_, w_, h_ };
  };

  componentDidMount() {
    if (this.isAnimatedOnMount) {
      this.animate();
    }
  }

  componentDidUpdate() {
    const { x_, y_, w_, h_ } = this.getCoordinates();
    const { x, y, w, h } = this.state;
    
    if (x === x_ && y === y_ && w === w_ && h === h_ ) {
      return;
    }

    if (this.props.store.animationLock) {
      this.animate();
    } else {
      this.setState({
        ...this.state,
        x: x_,
        y: y_,
        w: w_,
        h: h_,
        path: this.getPath(x_, y_, w_, h_),
        dogear: this.getDogEar(x_, y_, w_, h_)
      });
    }
  }

  animate() {
    const { x_, y_, w_, h_ } = this.getCoordinates();
    this.setPathAnimated(x_, y_, w_, h_);
    this.setDogEarAnimated(x_, y_, w_, h_);
    this.setObjectAnimated(x_, y_, w_, h_);
  }

  componentWillUnmount() {
    d3.select(this.pathRef.current).interrupt();
    d3.select(this.dogearRef.current).interrupt();
    d3.select(this.objRef.current).interrupt();
  }

  setPathAnimated(x_, y_, w_, h_) {
    const path = this.getPath(x_, y_, w_, h_);

    let el = d3.select(this.pathRef.current);
    el.transition(this.props.store.transition)
      .attr("d", path)
      .on("end", () =>
        this.setState({
          ...this.state,
          path: path
        })
      );
  }

  setDogEarAnimated(x_, y_, w_, h_) {
    const path = this.getDogEar(x_, y_, w_, h_);

    let el = d3.select(this.dogearRef.current);
    el.transition(this.props.store.transition)
      .attr("d", path)
      .on("end", () =>
        this.setState({
          ...this.state,
          dogear: path
        })
      );
  }

  setObjectAnimated(x_, y_, w_, h_) {
    let el = d3.select(this.objRef.current);
    el.transition(this.props.store.transition)
      .attr("x", x_)
      .attr("y", y_)
      .attr("width", w_)
      .attr("height", h_)
      .on("end", () =>
        this.setState({
          ...this.state,
          x: x_,
          y: y_,
          w: w_,
          h: h_
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

    let { x, y, w, h, path, dogear } = this.state;
    let { w_, h_ } = this.getCoordinates();
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

    if (zoomed) {
      while (
        ((x + w) < svgWidth) &&
        ((y + h) < svgHeight) &&
        (w < svgWidth*0.5) &&
        (h < svgHeight*0.5)) {
        w += 1;
        h += 1.33;
      }
      path = this.getPath(x, y, w, h);
      dogear = this.getDogEar(x, y, w, h);
    }
    

    // The messy part
    // Creates SVG paths
    // Adds css classes/other styles according to visualization state
    // TODO extract parts of it to functions, define css classes instead of manually styling them here
    let textClassName = 'highlightable';
    let pathClassName = clicked ? 'framed' : 'unframed';
    let openAccessStyle = oa ? {height: (15) + "px", display: "block", marginBottom:"3px"} : {display: "none"};

    let displayStyle = {display: "block", cursor : "default"};
    let metadataStyle = {height: (0.75 * h_) + "px", width: (0.9 * w_) + "px"};
    let readersDivStyle = {height: 0.24 * h_ + "px", width: w_ + "px", marginBottom: "0px", marginTop: "0px"};
    let citationsFontSize = "8px";
    let highlightStrings = searchString.split(' ');

    if (selected) {
      textClassName = 'large highlightable';
      displayStyle.cursor = "pointer";
      metadataStyle.height = (h_ - 20) + "px";
      readersDivStyle.height = 15 + "px";
      readersDivStyle.marginBottom = '3px';
      readersDivStyle.marginTop = '5px';
      citationsFontSize = '11px';
    } else {
      if (papersStore.hasSelectedEntities) {
        displayStyle.display = "none";
      } else {
        displayStyle.cursor = "zoom-in";
      }
    }
    if (zoomed) {
      textClassName = 'larger';
      citationsFontSize = '11px';
    }

    return (
      <g
        onMouseEnter={this.isAnimated() ? undefined : onPaperMouseEnter.bind(this, store, paper)}
        onMouseLeave={onPaperMouseLeave.bind(this, store, paper)}
        onClick={this.isAnimated() ? undefined : onPaperClick.bind(this, store, paper)}
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
          ref={this.dogearRef}
          className="dogear"
          d={dogear}>
        </path>

        <foreignObject
          ref={this.objRef}
          x={x}
          y={y}
          width={w}
          height={h}
          style={{overflow: "hidden"}}
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
