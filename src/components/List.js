/**
 * Created by rbachleitner on 6/27/17.
 */
import React from 'react';
import ListEntry from './ListEntry';
import uiStore from '../models/UIStore';
import { observer } from 'mobx-react';

function hasSubstring(listEntry) {
  let containsSubstring = false;
  const searchStringLowerCase = uiStore.searchString.toLowerCase();
  containsSubstring = listEntry.title.toLowerCase().includes(searchStringLowerCase) ||
                      listEntry.area.toLowerCase().includes(uiStore.searchString);
  if (uiStore.searchString === "") return true;
  return containsSubstring;
}

const List =
  observer(
    (props) => (
      <div style={{width: "400px", height: "100%", float: "right", display: "block", border: "0px solid grey"}}>
        <div style={{borderBottom: "2px grey solid", display: "block", padding: "10px",backgroundColor: "lightblue", height: "10%"}}>
          <div>Headstart React Mobx</div>
          <div>Search: <input id="search" onChange={() => {uiStore.searchString = document.getElementById('search').value;}}/></div>
        </div>
        <div style={{height: "88%", overflow: "scroll"}}>
          {uiStore.papersStore.papers
            .filter((paper) => (uiStore.papersStore.papers.some((paper) => paper.clicked) ? paper.clicked : paper.listvisible) === true)
            .filter((paper) => hasSubstring(paper))
            .map((paper, index) =>
            <ListEntry paper={paper} key={index}/>
          )}
        </div>
      </div>
    )
  );

export default List;