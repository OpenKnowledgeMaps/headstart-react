/**
 * Created by rbachleitner on 6/20/17.
 */

import React from 'react';

import Paper from './Paper';
import {observer} from 'mobx-react';

function sortPapers(a, b) {
  if (a.active || a.selected) {
    return 1;
  }
  if (b.active || b.selected) {
    return -1;
  }
  return 0;
}

function sortByHover(a,b) {
  if (a.hover) {
    return 1;
  }
  if (b.hover) {
    return -1;
  }
  return 0;
}
// TODO enhance conditional Rendering vor papers and nodes
const Papers =
  observer(
    ({papers}) =>
      (<g>
      {papers.sort(sortPapers).sort(sortByHover).map((paper, index) =>
        <Paper
          key={index}
          paper={paper}
        />)

      }</g>
      )
  );

export default Papers;
