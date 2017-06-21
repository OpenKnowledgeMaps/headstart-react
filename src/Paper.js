import React from 'react';
import { observer } from 'mobx-react';

const Paper =
  observer(
    (props) =>
      <g>
      <rect
        x={props.paper.x}
        y={props.paper.y}
        width={props.paper.width}
        height={props.paper.height}
        rx="3"
        ry="3"
        style={{
          "fill": "#fff",
          "fillOpacity": "0.8",
          "stroke":"#000",
          "strokeWidth":"1px"
        }}/>
        <text  x={props.paper.x + props.paper.width*0.5} y={props.paper.y + props.paper.height*0.5} fontFamily="Verdana" fontSize={props.paper.fontsize} textAnchor="middle">
          {props.paper.area}
        </text>
      </g>
  )

export default Paper;