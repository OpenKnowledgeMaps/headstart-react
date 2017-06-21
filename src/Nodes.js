/**
 * Created by rbachleitner on 5/24/17.
 */

import React from 'react';

import Node from './Node';
import {observer} from 'mobx-react';

function sortNodes(a, b) {
  if (a.hover || a.selected) {
    return 1;
  }
  if (b.hover || b.selected) {
    return -1;
  }
  return 0;
}

const Nodes =
  observer(
    ({ nodes }) => (
      <g>{nodes.sort(sortNodes).map((node, index) =>
        <Node           key={node.id}
                        id={node.id}
                        node={node}
                        nodes={nodes}
        />
      )}
      </g>
    )
);

export default Nodes;