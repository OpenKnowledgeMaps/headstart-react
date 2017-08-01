import React from 'react';

import NodesList from './NodesList';
import {observer} from 'mobx-react';

const Nodes =
  observer(
    ({ store, nodes }) =>
      {
      const flagLessNodes = nodes.entities.filter((node) => !(node.selected || node.active));
      const activeNodes = nodes.activeEntities;
      const selectedNodes = nodes.selectedEntities;
      return (
        <g>
          <NodesList store={store} nodes={flagLessNodes}/>
          <NodesList store={store} nodes={activeNodes}/>
          <NodesList store={store} nodes={selectedNodes}/>
        </g>);
      }
);

export default Nodes;