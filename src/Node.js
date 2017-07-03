import React from 'react';
import {observer} from 'mobx-react';
import {onBubbleMouseEnter, onBubbleMouseLeave, onBubbleClick, onBubbleDoubleClick} from './BubbleEvents';
import uiStore from './UIStore';

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

      if (props.node.active || props.node.selected) {
        circle_style.fillOpacity = "1";
        text_style.display = "none";
      }
      else {
        circle_style.fillOpacity = "0.8";
        text_style.display = "inline";
      }

      const x_ = uiStore.zoomFactor*props.node.x + uiStore.translationVecX;
      const y_ = uiStore.zoomFactor*props.node.y + uiStore.translationVecY;
      const r_ = uiStore.zoomFactor*props.node.r;

      return (
        <g onMouseEnter={onBubbleMouseEnter.bind(this, props.node)}
           onMouseLeave={onBubbleMouseLeave.bind(this, props.node)}
           onClick={onBubbleClick.bind(this, props.node)}
           onDoubleClick={onBubbleDoubleClick.bind(this, props.node)}
        >
          <circle
            r={r_}
            cx={x_}
            cy={y_}
            style={circle_style}
          />
          <foreignObject
            x={x_ - r_}
            y={y_ - r_}
            width={2.*r_}
            height={2.*r_}
            fontSize="12"
            fontFamily="Verdana"
            style={text_style}
          >
            <p style={{textAlign: "center", marginTop:(r_ - 5) }}>{props.node.area}</p>
          </foreignObject>
        </g>
      );
    }
  );
export default Node;