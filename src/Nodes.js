/**
 * Created by rbachleitner on 5/24/17.
 */

import React from 'react';

import Node from './Node';
import {observer} from 'mobx-react';

const Nodes =
  observer(
    ({ nodes }) =>
      {
      return (
        <g>
          {nodes.filter((node) => !(node.selected || node.active)).map((node, index) =>
            <Node           key={node.id}
                            id={node.id}
                            node={node}
                            nodes={nodes}
            />
          )};
          {nodes.filter((node) => (node.active)).map((node, index) =>
          <Node           key={node.id}
                          id={node.id}
                          node={node}
                          nodes={nodes}
          />
          )};
          {nodes.filter((node) => (node.selected)).map((node, index) =>
            <Node           key={node.id}
                            id={node.id}
                            node={node}
                            nodes={nodes}
            />
          )};
        </g>);
      }
);

export default Nodes;