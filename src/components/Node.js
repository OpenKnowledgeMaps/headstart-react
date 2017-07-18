import React from 'react';
import {observer} from 'mobx-react';
import {onBubbleMouseEnter, onBubbleMouseLeave, onBubbleClick, onBubbleDoubleClick} from '../eventhandlers/BubbleEvents';

const Node =
  observer(
    ({node, store}) => {
      let circle_style = {
        "fillOpacity": "0.2",
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
      let {x: x_, y: y_, r: r_} = node;

      return (
        <g onMouseEnter={onBubbleMouseEnter.bind(this, store, node)}
           onMouseLeave={onBubbleMouseLeave.bind(this, store)}
           onClick={onBubbleClick.bind(this, store, node)}
           onDoubleClick={onBubbleDoubleClick.bind(this, store, node)}
           className="bubble_frame"
        >
          <circle
            className="area"
            r={r_}
            cx={x_}
            cy={y_}
            style={circle_style}
          />
          <foreignObject
            x={x_ - r_}
            y={y_ - 0.25*r_}
            width={2.*r_}
            height={2.*r_}

            style={text_style}
            id="area_title_object"
            className="headstart"
          >
            <div id="area_title" style={{"word-wrap" : "break-word", "font-size" : "12"}}>
                <h2 className="highlightable">{node.area}</h2>
            </div>
          </foreignObject>
        </g>
      );
    }
  );
export default Node;