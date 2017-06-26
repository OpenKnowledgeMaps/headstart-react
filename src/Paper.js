import React from 'react';
import { observer } from 'mobx-react';
import {onPaperMouseEnter, onPaperMouseLeave} from './PaperEvents';
import logicStore from './logicStore';
//
// onMouseOut={logicStore.onPaperMouseOut.bind(logicStore, props.paper)}
const Paper =
  observer(
    (props) =>{
      let rect_style = {
        "fill": "#eee",
        "fillOpacity": "0",
        "stroke":"#000",
        "strokeWidth":"1px"
      };
      rect_style.fillOpacity = props.paper.hover ? "0." : "0.";
      return (
        <g
          width={props.paper.width}
          height={props.paper.height}
          onMouseEnter={onPaperMouseEnter.bind(logicStore, props.paper)}
          onMouseLeave={onPaperMouseLeave.bind(logicStore, props.paper)}
        >
          <rect
            x={props.paper.x}
            y={props.paper.y}
            width={props.paper.width}
            height={props.paper.height}
            rx="3"
            ry="3"
            style={rect_style}
          />
            <foreignObject
              x={props.paper.x}
              y={props.paper.y}
              width={props.paper.width - 8}
              height={props.paper.height- 8}
              fontSize={props.paper.fontsize - 3}
            >
              <p>{props.paper.area}</p>
            </foreignObject>
        </g>
        )
    }

  )
export default Paper;
