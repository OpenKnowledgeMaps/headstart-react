import React from 'react';
import { observer } from 'mobx-react';
import {onPaperMouseEnter, onPaperMouseLeave, onPaperClick} from '../models/PaperEvents';
import logicStore from '../models/logicStore';
import uiStore from '../models/UIStore';
//
// onMouseOut={logicStore.onPaperMouseOut.bind(logicStore, props.paper)}
const Paper =
  observer(
    (props) =>{

      let rect_style = {
        "fill": "#eee",
        "fillOpacity": "1",
        "stroke":"#000",
        "strokeWidth":"1px"
      };

      rect_style.strokeWidth = props.paper.clicked ? "2px" : "1px";
      rect_style.stroke = props.paper.clicked ? "#f00" : "#000";
      const zoomFactor = uiStore.zoomFactor;
      const paperZoomFactor = uiStore.paperZoomFactor;
      const translationVecX = uiStore.translationVecX;
      const translationVecY = uiStore.translationVecY;
      const x_ = zoomFactor*props.paper.x + translationVecX;
      const y_ = zoomFactor*props.paper.y + translationVecY;
      const w_ =  props.paper.zoomed ? paperZoomFactor*zoomFactor*props.paper.width : zoomFactor*props.paper.width;
      const h_ =  props.paper.zoomed ? paperZoomFactor*zoomFactor*props.paper.height : zoomFactor*props.paper.height;
      const fs_ = props.paper.zoomed ? paperZoomFactor*zoomFactor*props.paper.fontsize : zoomFactor*props.paper.fontsize;

      return (
        <g
          width={w_}
          height={h_}
          onMouseEnter={onPaperMouseEnter.bind(logicStore, props.paper)}
          onMouseLeave={onPaperMouseLeave.bind(logicStore, props.paper)}
          onClick={onPaperClick.bind(logicStore, props.paper)}
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
            <p>{props.paper.area}</p>
          </foreignObject>
        </g>
      )
    }
  );

export default Paper;
