/**
 * Created by rbachleitner on 5/24/17.
 */

import React from 'react';

import Node from './Node';
import {observer} from 'mobx-react';

const Nodes =
  observer(
    ({ store, nodes }) =>
      {
        let entities = nodes.entities;
      return (
        <g>
          {nodes.entities.filter((node) => !(node.selected || node.active)).map((node, index) =>
            <Node           key={node.id}
                            id={node.id}
                            node={node}
                            nodes={entities}
                            store={store}
            />
          )};
          {nodes.activeEntities.map((node, index) =>
          <Node           key={node.id}
                          id={node.id}
                          node={node}
                          nodes={entities}
                          store={store}
          />
          )};
          {nodes.selectedEntities.map((node, index) =>
            <Node           key={node.id}
                            id={node.id}
                            node={node}
                            nodes={entities}
                            store={store}
            />
          )};
        </g>);
      }
);

export default Nodes;