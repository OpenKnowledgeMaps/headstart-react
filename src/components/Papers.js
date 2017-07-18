/**
 * Created by rbachleitner on 6/20/17.
 */

import React from 'react';

import Paper from './Paper';
import {observer} from 'mobx-react';

function hasSubstring(listEntry, store) {
  let containsSubstring = false;
  const searchStringLowerCase = store.searchString.toLowerCase();
  containsSubstring = listEntry.title.toLowerCase().includes(searchStringLowerCase) ||
    listEntry.area.toLowerCase().includes(store.searchString) ||
    listEntry.authors.toLowerCase().includes(store.searchString) ||
    listEntry.paper_abstract.toLowerCase().includes(store.searchString);

  if (store.searchString === "") return true;
  return containsSubstring;
}

const Papers =
  observer(
    ({store, papers}) =>
    {
      return (
        <g>
          {papers
            .filter((paper) => hasSubstring(paper, store))
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
