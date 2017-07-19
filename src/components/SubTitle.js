import React from 'react';
import { observer } from 'mobx-react';

function showInfoModal(store) {
  store.showInfoModal = true;
}

const SubTitle =
  observer(
    ({store}) => {
      return (
        <div id="subdiscipline_title">
          <h4> Overview of 'topic' based on {store.papersStore.entities.length} 'service' articles.
            <a href="#info_modal" id="infolink" onClick={showInfoModal.bind(this, store)}>
              What's this? <span id="whatsthis">&#xf05a;</span>'
            </a>
          </h4>
        </div>
      );
    }
  );

export default SubTitle;