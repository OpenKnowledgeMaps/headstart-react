import React from 'react';
import {observer} from 'mobx-react';
import logicStore from './logicStore';

const Node =
  observer(
    (props) => {
      let circle_style = {
        "fill": "#fff",
        "fillOpacity": "0.2",
        "stroke": "#333",
        "strokeWidth": "1.px"
      };
      let text_style = {
        "display": "inline"
      };
      if (props.node.hover || props.node.selected ) {
        circle_style.fillOpacity = "0.2";
        text_style.display = "none";
      }
      else
      {
        circle_style.fillOpacity = "0.8";
        text_style.display = "inline";
      }
      return (
        <g onMouseOver={logicStore.onBubbleMouseOver.bind(this, props.node)}
           onMouseOut={logicStore.onBubbleMouseOut.bind(this, props.node)}
           onClick={logicStore.onBubbleClick.bind(logicStore, props.node)}>

          <circle
            r={props.node.r}
            cx={props.node.x}
            cy={props.node.y}
            style={circle_style}
          />

          <text
            x={props.node.x}
            y={props.node.y + 6}
            fontFamily="Verdana"
            fontSize="12"
            fill="white"
            stroke="black"
            textAnchor="middle"
            style={text_style}>
              {props.node.id}/{props.node.area}
          </text>

        </g>
          );
    }
  )
export default Node;