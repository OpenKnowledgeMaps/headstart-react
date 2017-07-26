import React from 'react';
import { observer } from 'mobx-react';
import Modal from './InfoModal';

const SubTitle =
  observer(
    ({store}) => {

      let subtitle =
        <h4> Overview of <span id="search-term-unique">{store.topic}</span> based on {store.papersStore.entities.length} {store.config.serviceNameString} articles&nbsp;&nbsp;
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