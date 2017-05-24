/**
 * Created by rbachleitner on 5/24/17.
 */

import React from 'react';

import Node from './Node';

const Nodes = ({ nodes }) => (
  <g>{nodes.map((node, index) =>
    <Node           key={index}
                    id={index}
                    node={node}/>
  )}
  </g>
);

export default Nodes;