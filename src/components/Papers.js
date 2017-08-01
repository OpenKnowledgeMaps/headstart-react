import React from 'react';

import Paper from './Paper';
import {observer} from 'mobx-react';

const Papers =
  observer(
    ({store, papers}) => {
      return (
        <g>
          {papers
            .map((paper) =>
              <Paper
                store={store}
                key={paper.id}
                paper={paper}
              />)}
        </g>);
    }
  );

export default Papers;
