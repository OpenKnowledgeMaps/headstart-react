/**
 * Created by rbachleitner on 6/20/17.
 */

import React from 'react';

import Paper from './Paper';
import {observer} from 'mobx-react';

function sortPapers(a, b) {
  if (a.active) {
    return 1;
  }
  if (b.active) {
    return -1;
  }
  return 0;
}
// TODO enhance conditional Rendering vor papers and nodes
const Papers =
  observer(
    ({papers}) =>
      (<g>
      {papers.sort(sortPapers).map((paper, index) =>
        <Paper
          key={index}
          paper={paper}
        />)

      }</g>
      )
  );

export default Papers;/**
 * Created by rbachleitner on 6/20/17.
 */
