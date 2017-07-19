import React from 'react';
import {observer} from 'mobx-react';
import {onBubbleMouseEnter, onBubbleMouseLeave, onBubbleClick, onBubbleDoubleClick} from '../eventhandlers/BubbleEvents';

const Node =
  observer(
    ({node, store}) => {
      let circleClassName = null;
      let circleStyle = {fillOpacity: "0.8"};
      if (store.bubblesStore.hasSelectedEntities) {
        circleClassName = (node.selected) ? "zoom_selected" : "zoom_unselected";
        circleStyle.fillOpacity = "0.1";
      } else {
        circleClassName = node.active ? "zoom_selected" : "area";
      }
      let {x: x_, y: y_, r: r_} = node;

      let areaTitleStyle = {wordWrap : "break-word", fontSize : "12px", textAlign: "center", width: 2*r_ + "px"};
      if ((node.active || node.selected) || (store.bubblesStore.hasSelectedEntities && !node.selected)) {
        areaTitleStyle.display = "none";
      }


      return (
        <g onMouseEnter={onBubbleMouseEnter.bind(this, store, node)}
           onMouseLeave={onBubbleMouseLeave.bind(this, store)}
           onClick={onBubbleClick.bind(this, store, node)}
           onDoubleClick={onBubbleDoubleClick.bind(this, store, node)}
           className="bubble_frame"
        >
          <circle
            className={circleClassName}
            r={r_}
            cx={x_}
            cy={y_}
            style={circleStyle}
          />
          <foreignObject
            x={x_ - r_}
            y={y_ - 24}
            width={2*r_}
            height={0.33*r_}
            id="area_title_object"
            className="headstart"
          >
            <div id="area_title" style={areaTitleStyle}>
                <h2 className="highlightable">{node.area}</h2>
            </div>
          </foreignObject>
        </g>
      );
    }
  );
export default Node;