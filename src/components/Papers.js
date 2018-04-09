import React from 'react';

import Paper from './mainHtmlCarriers/Paper';
import {observer} from 'mobx-react';

/**
 * Papers Component
 * Takes an array of PaperModels and renders Paper components.
 * @type {<T extends IReactComponent>(clazz: T) => void | IReactComponent | (function({store: *, papers: *}))}
 */
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
