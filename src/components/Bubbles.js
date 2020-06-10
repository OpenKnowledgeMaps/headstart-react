import React from 'react';

import NodesList from './BubblesList';
import {observer} from 'mobx-react';

/**
 * Bubbles component
 * Puts Bubbles into 3 categories to render them to the svg in the correct order.
 * @type {<T extends IReactComponent>(clazz: T) => void | IReactComponent | (function({store: *, nodes: *}))}
 */
const Bubbles =
  observer(
    ({ store, nodes }) =>
      {
      const flagLessNodes = nodes.entities.filter((node) => !(node.selected || node.active));
      const activeNodes = nodes.activeEntities;
      const selectedNodes = nodes.selectedEntities;
      return (
        <g>
          <NodesList store={store} nodes={nodes.entities}/>
        </g>);
      }
);

export default Bubbles;