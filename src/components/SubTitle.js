import React from 'react';
import { observer } from 'mobx-react';
import Modal from './InfoModal';

const SubTitle =
  observer(
    ({store}) => {
      return (
        <div id="subdiscipline_title">
          <h4> Overview of 'topic' based on {store.papersStore.entities.length} 'service' articles&nbsp;&nbsp;
            <Modal />

          </h4>
        </div>
      );
    }
  );

export default SubTitle;