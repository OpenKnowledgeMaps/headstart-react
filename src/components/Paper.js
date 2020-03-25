import React from 'react';
import { observer } from 'mobx-react';
import {onPaperMouseEnter, onPaperMouseLeave, onPaperClick} from '../eventhandlers/PaperEvents';

import HighlightableText from './HighlightableText';

/**
 * Paper component.
 * Renders a Paper SVG element from a PaperModel (class holding the state of a paper, see models/PaperModel.js).
 * Also contains math for the actual coordinate of the Paper on the Chart.
 * @type {<T extends IReactComponent>(clazz: T) => void | IReactComponent | (function({store?: *, paper?: *}))}
 */
const Paper =
  observer(
    ({store, paper}) =>{
      const {
        zoomFactor,
        translationVecX,
        translationVecY,
        svgWidth,
        svgHeight,
        searchString,
        papersStore
      } = store;
      const {
        orig_x,
        orig_y,
        orig_width,
        orig_height,
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

      // Actual coordinates and dimensions for the Paper is calculated from the
      // orig_ prefixed values
      // zoomFactor & translationVecX,Y are set by the zoom state
      let x =  zoomFactor  *  orig_x + translationVecX;
      let y =  zoomFactor  *  orig_y + translationVecY;
      let w =  zoomFactor  *  orig_width;
      let h =  zoomFactor  *  orig_height;

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
      const pathD = 'M ' + 0 + ' ' + 0 +
                    ' h ' + (0.9*w) +
                    ' l ' + (0.1*w) + ' ' + (0.1*h) +
                    ' v ' + (0.9*h) +
                    ' h ' + (-w) +
                    ' v ' + (-h);
      let pathClassName = clicked ? 'framed' : 'unframed';
      let openAccessStyle = oa ? {height: (15) + "px", display: "block", marginBottom:"3px"} : {display: "none"};

      let dogearPath = "M " + (0 + 0.9*w) + ' ' + 0 + " v " + (0.1*h) + " h " + (0.1*w);
      let displayStyle = {display: "block", cursor : "default"};
      let metadataStyle = {height: (0.75*h) + "px", width: (0.9*w) + "px"};
      let readersDivStyle = {height: 0.24*h + "px", width: w + "px", marginBottom: "0px", marginTop: "0px"};
      let citationsFontSize = "8px";
      let translateString = "translate(" + x + " " + y + ")";
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
          transform={translateString}
        >

          <path
            id="region"
            d={pathD}
            className={pathClassName}
          >
          </path>

          <path
          className="dogear"
          d={dogearPath}>
        </path>

          <foreignObject
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
                  </span>{" "}
                  <span className="pubyear">
                    (<HighlightableText highlightStrings={highlightStrings} value={year} />)
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
  );

export default Paper;