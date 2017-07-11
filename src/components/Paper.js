import React from 'react';
import { observer } from 'mobx-react';
import {onPaperMouseEnter, onPaperMouseLeave, onPaperClick} from '../eventhandlers/PaperEvents';


const Paper =
  observer(
    ({store, paper}) =>{

      let rect_style = {
        "fill": "#eee",
        "fillOpacity": "1",
        "stroke":"#000",
        "strokeWidth":"1px"
      };

      rect_style.strokeWidth = paper.clicked ? "2px" : "1px";
      rect_style.stroke = paper.clicked ? "#f00" : "#000";
      const paperZoomFactor = store.paperZoomFactor;
      let {x: x_, y: y_, width: w_, height: h_, fontsize: fs_, zoomed} = paper;
      w_ = zoomed ? paperZoomFactor*w_ : w_;
      h_ = zoomed ? paperZoomFactor*h_ : h_;
      fs_ = zoomed ? paperZoomFactor*fs_ : fs_;
      const authors = paper.authors.split(';');
      let correctedAuthors = authors.map((author) => {
        let names = author.split(',');
        return names[1] + ' ' + names[0];
      });
      let displayAuthors = correctedAuthors[0];
      if (authors.length > 2) displayAuthors = correctedAuthors[0] + ', ' + correctedAuthors[1];
      const title = paper.title;
      return (
        <g
          width={w_}
          height={h_}
          onMouseEnter={onPaperMouseEnter.bind(this, store, paper)}
          onMouseLeave={onPaperMouseLeave.bind(this, store, paper)}
          onClick={onPaperClick.bind(this, store, paper)}
        >
          <rect
            x={x_}
            y={y_}
            width={w_}
            height={h_}
            rx="3"
            ry="3"
            style={rect_style}
          />
          <foreignObject
            x={x_}
            y={y_}
            width={w_}
            height={h_}
            fontSize={fs_}
            style={{"overflow":"hidden"}}
          >
            <div style={{'padding':'3px'}}>
              <p>{title}</p>
              <p>{displayAuthors}</p>
              <p>in {paper.published_in}</p>
              <p>{paper.readers} citations</p>
            </div>
          </foreignObject>
        </g>
      )
    }
  );

export default Paper;
