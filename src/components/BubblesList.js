import React from 'react';
import Bubble from './mainHtmlCarriers/Bubble';
import {observer} from 'mobx-react';


// Renders an array of Bubbles as Bubble Components
const BubblesList =
  observer(
    ({ store, nodes }) =>
    {
      return (
        <g>
          {nodes.map((node) =>
            <Bubble         key={node.id}
                            id={node.id}
                            node={node}
                            nodes={nodes}
                            store={store}
            />
          )};
        </g>);
    }
  );

export default BubblesList;
