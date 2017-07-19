import React from 'react';
import { observer } from 'mobx-react';
import {onPaperMouseEnter, onPaperMouseLeave, onPaperClick} from '../eventhandlers/PaperEvents';


const Paper =
  observer(
    ({store, paper}) =>{
      const paperZoomFactor = store.paperZoomFactor;
      let {x: x_, y: y_, width: w_, height: h_, fontsize: fs_, zoomed} = paper;
      // w_ = zoomed ? paperZoomFactor*w_ : w_;
      // h_ = zoomed ? paperZoomFactor*h_ : h_;
      // fs_ = zoomed ? paperZoomFactor*fs_ : fs_;

      while (((x_ + w_) < store.svgWidth) && ((y_ + h_) < store.svgHeight) && zoomed && (w_ < store.svgWidth*0.5) && (h_ < store.svgHeight*0.5)) {
        w_ += 1;
        h_ += 1.33;
      }

      const authors = paper.authors.split(';');
      let correctedAuthors = authors.map((author) => {
        let names = author.split(',');
        return names[1] + ' ' + names[0];
      });
      let displayAuthors = correctedAuthors[0];
      if (authors.length > 2) displayAuthors = correctedAuthors[0] + ', ' + correctedAuthors[1];
      const title = paper.title;

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

      let readersDivStyle = {height: "15px", width: w_ + "px", marginTop: "3px"};

      let openAccessStyle = paper.oa ? {display: "inline", height: "20px", marginTop: "10px"} : {display: "none"};
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

              <div className="metadata">
                <div id="icons">
                  <p id="open-access-logo" style={openAccessStyle} className={textClassName}>&#xf09c;</p>
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
                <span className="readers_entity"> citations</span>
              </p>
            </div>

            </div>
          </foreignObject>
        </g>
      )
    }
  );

export default Paper;