import React from 'react';
import { observer } from 'mobx-react';
import Modal from './InfoModal';

/**
 * SubTitle component
 * Renders a subtitle for the Chart.
 * When no bubble is selected, renders an informative string containing the search string and
 * other metadata;
 * When a bubble is selected, renders the title of the bubble
 * @type {<T extends IReactComponent>(clazz: T) => void | IReactComponent | (function({store: *}))}
 */
// TODO should be configurable/localizable
const SubTitle =
  observer(
    ({store}) => {

      let subtitle =
        <h4> Overview of&nbsp;
          <span id="search-term-unique">{store.topic}</span>f&nbsp;
          based on&nbsp;
          {store.papersStore.entities.length} {store.config.serviceNameString} articles&nbsp;&nbsp;
          <Modal />
        </h4>;
      if (store.bubblesStore.hasSelectedEntities)
        subtitle = <h4><span id="area-bold">Area:</span> {store.bubblesStore.activeArea}</h4>

      return (
        <div id="subdiscipline_title">
          {subtitle}
        </div>
      );
    }
  );

export default SubTitle;