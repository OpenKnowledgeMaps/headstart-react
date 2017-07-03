/**
 * Created by rbachleitner on 6/20/17.
 */

import React from 'react';

import Paper from './Paper';
import {observer} from 'mobx-react';

const Papers =
  observer(
    ({store, papers}) =>
    {
      return (
        <g>
          {papers.map((paper, index) =>
            <Paper
              store={store}
              key={index}
              paper={paper}
            />)}
        </g>);
    }
  );

export default Papers;
