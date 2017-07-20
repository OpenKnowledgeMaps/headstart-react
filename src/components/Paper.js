import React from 'react';
import { observer } from 'mobx-react';
import {onPaperMouseEnter, onPaperMouseLeave, onPaperClick} from '../eventhandlers/PaperEvents';
import {transformAuthors} from './Helpers';

const Paper =
  observer(
    ({store, paper}) =>{

      let {x: x_, y: y_, width: w_, height: h_, fontsize: fs_, zoomed} = paper;

      // Split author names and turn their names around
      const displayAuthors = transformAuthors(paper.authors);

      const title = paper.title;

      // Caculate enlarged width so it fits in the svg
      while (
        ((x_ + w_) < store.svgWidth) &&
        ((y_ + h_) < store.svgHeight) &&
        zoomed && (w_ < store.svgWidth*0.5) &&
        (h_ < store.svgHeight*0.5)) {
        w_ += 1;
        h_ += 1.33;
      }

      // CSS and svg stuff
      const textClassName = paper.selected ? 'large highlightable' : 'highlightable';
      const pathD = 'M ' + x_ + ' ' + y_ +
                    ' h ' + (0.9*w_) +
                    ' l ' + (0.1*w_) + ' ' + (0.1*h_) +
                    ' v ' + (0.9*h_) +
                    ' h ' + (-w_) +
                    ' v ' + (-h_);
      const pathClassName = paper.clicked ? 'framed' : 'unframed';
      const dogearPath = "M " + (x_ + 0.9*w_) + ' ' + y_ + " v " + (0.1*h_) + " h " + (0.1*w_);
      let displayStyle = {display: "block"};
      if (store.papersStore.hasSelectedEntities && !paper.selected) {
        displayStyle.display = "none";
      }
      const openAccessStyle = paper.oa ? {height: (15) + "px", display: "block", marginBottom:"3px"} : {display: "none"};
      const readersHeight = 0.25*h_ > 15 ? 15 : 0.25*h_;
      const metadataStyle = {height: paper.selected ?  (h_ - 15) + "px" : ((0.75*h_) + "px"), width: (0.9*w_) + "px"};
      const readersDivStyle = {height: readersHeight + "px", width: w_ + "px", marginBottom: paper.selected ? "3px" : "0px"};
      const citationsFontSize = (zoomed || paper.selected) ? "11px" : "8px";

      // TODO hyphenate title
      return (
        <g
          onMouseEnter={onPaperMouseEnter.bind(this, store, paper)}
          onMouseLeave={onPaperMouseLeave.bind(this, store, paper)}
          onClick={onPaperClick.bind(this, store, paper)}
          className="paper"
          style={displayStyle}
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
            x={x_}
            y={y_}
            width={w_}
            height={h_}
            fontSize={fs_}
            style={{"overflow":"hidden"}}
          >
            <div className="paper_holder">

              <div className="metadata" style={metadataStyle}>
                <div id="icons" style={openAccessStyle}>
                  <p id="open-access-logo" className={textClassName}>&#xf09c;</p>
                </div>
                <p id="title" className={textClassName}>{title}</p>
                <p id="details" className={textClassName}>{displayAuthors}</p>
                <p id="in" className={textClassName}>in
                  <span className={textClassName}>
                    {paper.published_in}
                    <span className="pubyear">{paper.year}</span>
                  </span>
                </p>

              </div>

              <div className="readers" style={readersDivStyle}>
                <p id="readers" className={textClassName}>
                  <span id="num-readers">{paper.readers}</span>
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