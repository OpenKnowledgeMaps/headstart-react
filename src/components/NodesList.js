import React from 'react';
import Node from './Node';
import {observer} from 'mobx-react';

const NodesList =
  observer(
    ({ store, nodes }) =>
    {
      return (
        <g>
          {nodes.map((node) =>
            <Node           key={node.id}
                            id={node.id}
                            node={node}
                            nodes={nodes}
                            store={store}
            />
          )};
        </g>);
    }
  );

export default NodesList;