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
      return (<circle
        onMouseOver={logicStore.onBubbleMouseOver.bind(this, props.id)}
        onMouseOut={logicStore.onBubbleMouseOut.bind(this, props.id)}
        r={props.node.r}
        cx={props.node.x}
        cy={props.node.y}
        style={_style}
      />);
    }
  )
export default Node;