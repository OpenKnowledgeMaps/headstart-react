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
      let textClassName = 'highlightable';
      const pathD = 'M ' + 0 + ' ' + 0 +
                    ' h ' + (0.9*w_) +
                    ' l ' + (0.1*w_) + ' ' + (0.1*h_) +
                    ' v ' + (0.9*h_) +
                    ' h ' + (-w_) +
                    ' v ' + (-h_);
      let pathClassName = clicked ? 'framed' : 'unframed';
      let openAccessStyle = oa ? {height: (15) + "px", display: "block", marginBottom:"3px"} : {display: "none"};

      let dogearPath = "M " + (0 + 0.9*w_) + ' ' + 0 + " v " + (0.1*h_) + " h " + (0.1*w_);
      let displayStyle = {display: "block", cursor : "default"};
      let metadataStyle = {height: (0.75*h_) + "px", width: (0.9*w_) + "px"};
      let readersDivStyle = {height: 0.24*h_ + "px", width: w_ + "px", marginBottom: "0px", marginTop: "0px"};
      let citationsFontSize = "8px";
      let translateString = "translate(" + x_ + " " + y_ + ")";
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