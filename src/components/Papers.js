import React from 'react';

import Paper from './Paper';
import {observer} from 'mobx-react';
import {hasSubstring} from './Helpers';

const Papers =
  observer(
    ({store, papers}) => {
      return (
        <g>
          {papers
            .filter((paper) => hasSubstring(paper, store.searchString))
            .map((paper, index) =>
              <Paper
                store={store}
                key={index}
                paper={paper}
              />)}
        </g>);
    }
  );

export default Papers;
