/**
 * Created by rbachleitner on 5/24/17.
 */

import React from 'react';

import Node from './Node';
import {observer} from 'mobx-react';

function sortByActive(a, b) {
  if (a.active) {
    return 1;
  }
  if (b.active) {
    return -1;
  }
  return 0;
}

function sortBySelected(a, b) {
  if (a.selected) {
    return 1;
  }
  if (b.selected) {
    return -1;
  }
  return 0;
}

const Nodes =
  observer(
    ({ nodes }) => (
      <g>{nodes.sort(sortByActive).sort(sortBySelected).map((node, index) =>
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