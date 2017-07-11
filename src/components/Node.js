import React from 'react';
import {observer} from 'mobx-react';
import {onBubbleMouseEnter, onBubbleMouseLeave, onBubbleClick, onBubbleDoubleClick} from '../eventhandlers/BubbleEvents';

const Node =
  observer(
    ({node, store}) => {
      let circle_style = {
        "fill": "#fff",
        "fillOpacity": "0.2",
        "stroke": "#333",
        "strokeWidth": "1.px"
      };

      let text_style = {
        "display": "block"
      };

      if (node.active || node.selected) {
        circle_style.fillOpacity = "1";
        text_style.display = "none";
      }
      else {
        circle_style.fillOpacity = "0.8";
        text_style.display = "inline";
      }

      // const x_ = (store.zoomFactor*node.x + store.translationVecX)*(store.svgWidth/store.svgW);
      // const y_ = (store.zoomFactor*node.y + store.translationVecY)*(store.svgWidth/store.svgW);
      // const r_ = (store.zoomFactor*node.r);
      let {x: x_, y: y_, r: r_} = node;

      return (
        <g onMouseEnter={onBubbleMouseEnter.bind(this, store, node)}
           onMouseLeave={onBubbleMouseLeave.bind(this, store)}
           onClick={onBubbleClick.bind(this, store, node)}
           onDoubleClick={onBubbleDoubleClick.bind(this, store, node)}
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
            <p style={{textAlign: "center", marginTop:(r_ - 5) }}>{node.area}</p>
          </foreignObject>
        </g>
      );
    }
  );
export default Node;