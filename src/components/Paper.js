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
      const zoomFactor = store.zoomFactor;
      const paperZoomFactor = store.paperZoomFactor;
      const translationVecX = store.translationVecX;
      const translationVecY = store.translationVecY;
      const x_ = (zoomFactor*paper.x + translationVecX)*(store.svgWidth/store.svgW);
      const y_ = (zoomFactor*paper.y + translationVecY)*(store.svgWidth/store.svgW);
      const w_ =  (paper.zoomed ? paperZoomFactor*zoomFactor*paper.width : zoomFactor*paper.width)*(store.svgWidth/store.svgW);
      const h_ =  (paper.zoomed ? paperZoomFactor*zoomFactor*paper.height : zoomFactor*paper.height)*(store.svgWidth/store.svgW);
      const fs_ = (paper.zoomed ? paperZoomFactor*zoomFactor*paper.fontsize : zoomFactor*paper.fontsize)*(store.svgWidth/store.svgW);

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
            width={w_ - 8}
            height={h_ - 8}
            fontSize={fs_ - 3}
          >
            <p>{paper.area}</p>
          </foreignObject>
        </g>
      )
    }
  );

export default Paper;
