import React from 'react';
import {observer} from 'mobx-react';
import logicStore from './logicStore';

const Node =
  observer(
    (props) => {
      let _style = {
        "fill": "#f00",
        "fillOpacity": "0.2",
        "stroke": "#000",
        "strokeWidth": "1.5px"
      };
      _style.fillOpacity = (props.node.hover ? "1.0" : "0.2");
      return (
        <g onMouseOver={logicStore.onBubbleMouseOver.bind(this, props.node)}
           onMouseOut={logicStore.onBubbleMouseOut.bind(this, props.node)}
           onClick={logicStore.onBubbleClick.bind(logicStore, props.node)}>
          <circle
          r={props.node.r}
          cx={props.node.x}
          cy={props.node.y}
          style={_style}
          />
          <text  x={props.node.x - 25} y={props.node.y + 6} fontFamily="Verdana" fontSize="12">
            {props.node.id}/{props.node.area}
          </text>
        </g>
          );
    }
  )
export default Node;