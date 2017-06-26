import React from 'react';
import {observer} from 'mobx-react';
import {onBubbleMouseEnter, onBubbleMouseLeave, onBubbleClick, onBubbleDoubleClick} from './BubbleEvents';

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
        "display": "block"
      };
      if (props.node.active) {
        circle_style.fillOpacity = "1";
        text_style.display = "none";
      }
      else if (props.node.selected) {
        circle_style.fillOpacity = "1";
        text_style.display = "none";
      }
      else
      {
        circle_style.fillOpacity = "0.8";
        text_style.display = "inline";
      }
      return (
        <g onMouseEnter={onBubbleMouseEnter.bind(this, props.node)}
           onMouseLeave={onBubbleMouseLeave.bind(this, props.node)}
           onClick={onBubbleClick.bind(this, props.node)}
           onDoubleClick={onBubbleDoubleClick.bind(this, props.node)}
        >

          <circle
            r={props.node.r}
            cx={props.node.x}
            cy={props.node.y}
            style={circle_style}
          />
          <foreignObject
            x={props.node.x - (props.node.r - 10)*0.25}
            y={props.node.y - (props.node.r - 10)*0.25}
            width={props.node.r - 10}
            height={props.node.r - 10}
            fontSize="12"
            fontFamily="Verdana"
            style={text_style}
          >
            <p>{props.node.area}</p>
          </foreignObject>
        </g>
          );
    }
  )
export default Node;