import React from 'react';
import { observer } from 'mobx-react';
import {onPaperMouseEnter, onPaperMouseLeave, onPaperClick} from '../eventhandlers/PaperEvents';

import HighlightableText from './HighlightableText';


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

      let x_ =  zoomFactor  *  orig_x + translationVecX;
      let y_ =  zoomFactor  *  orig_y + translationVecY;
      let w_ =  zoomFactor  *  orig_width;
      let h_ =  zoomFactor  *  orig_height;

      // Caculate enlarged width so it fits in the svg
      while (
        zoomed &&
        ((x_ + w_) < svgWidth) &&
        ((y_ + h_) < svgHeight) &&
        (w_ < svgWidth*0.5) &&
        (h_ < svgHeight*0.5)) {
        w_ += 1;
        h_ += 1.33;
      }

      // CSS and svg stuff
      let textClassName = selected ? 'large highlightable' : 'highlightable';
      if (zoomed) textClassName = 'larger';
      const pathD = 'M ' + 0 + ' ' + 0 +
                    ' h ' + (0.9*w_) +
                    ' l ' + (0.1*w_) + ' ' + (0.1*h_) +
                    ' v ' + (0.9*h_) +
                    ' h ' + (-w_) +
                    ' v ' + (-h_);
      const pathClassName = clicked ? 'framed' : 'unframed';
      const dogearPath = "M " + (0 + 0.9*w_) + ' ' + 0 + " v " + (0.1*h_) + " h " + (0.1*w_);
      let displayStyle = {display: "block"};
      displayStyle.cursor = selected ? "pointer" : "default";
      if (papersStore.hasSelectedEntities && !selected) {
        displayStyle.display = "none";
      }
      const openAccessStyle = oa ? {height: (15) + "px", display: "block", marginBottom:"3px"} : {display: "none"};
      const readersHeight = selected ? 15 : 0.24*h_;
      const metadataStyle = {height: selected ?  (h_ - 20) + "px" : ((0.75*h_) + "px"), width: (0.9*w_) + "px"};
      const readersDivStyle = {height: readersHeight + "px", width: w_ + "px", marginBottom: selected ? "3px" : "0px", marginTop: selected ? "5px" : "0px"};
      const citationsFontSize = (zoomed || selected) ? "11px" : "8px";
      const translateString = "translate(" + x_ + " " + y_ + ")";
      const highlightStrings = searchString.split(' ');

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
            width={w_}
            height={h_}
            style={{"overflow":"hidden"}}
          >
            <div className="paper_holder">

              <div className="metadata" style={metadataStyle}>
                <div id="icons" style={openAccessStyle}>
                  <p id="open-access-logo" className={textClassName}>&#xf09c;</p>
                </div>
                <p id="title" className={textClassName}><HighlightableText highlightStrings={highlightStrings} value={title}/></p>
                <p id="details" className={textClassName}><HighlightableText highlightStrings={highlightStrings} value={displayAuthors}/></p>
                <p id="in" className={textClassName}>in
                  <span className={textClassName}><HighlightableText highlightStrings={highlightStrings} value={published_in}/>
                    <span className="pubyear"> (<HighlightableText highlightStrings={highlightStrings} value={year} />)</span>
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