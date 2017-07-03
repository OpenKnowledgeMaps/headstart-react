import React from 'react';
import { observer } from 'mobx-react';
import {onPaperMouseEnter, onPaperMouseLeave, onPaperClick} from '../models/PaperEvents';
import logicStore from '../models/logicStore';
import uiStore from '../models/UIStore';


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
      const zoomFactor = uiStore.zoomFactor;
      const paperZoomFactor = uiStore.paperZoomFactor;
      const translationVecX = uiStore.translationVecX;
      const translationVecY = uiStore.translationVecY;
      const x_ = zoomFactor*paper.x + translationVecX;
      const y_ = zoomFactor*paper.y + translationVecY;
      const w_ =  paper.zoomed ? paperZoomFactor*zoomFactor*paper.width : zoomFactor*paper.width;
      const h_ =  paper.zoomed ? paperZoomFactor*zoomFactor*paper.height : zoomFactor*paper.height;
      const fs_ = paper.zoomed ? paperZoomFactor*zoomFactor*paper.fontsize : zoomFactor*paper.fontsize;

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
