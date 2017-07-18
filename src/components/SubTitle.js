import React from 'react';
import { observer } from 'mobx-react';

const SubTitle =
  observer(
    ({store}) => {
      return (
        <div id="subdiscipline_title">
          <h4> Overview of 'topic' based on {store.papersStore.entities.length} 'service' articles.</h4>
        </div>
      );
    }
  );

export default SubTitle;