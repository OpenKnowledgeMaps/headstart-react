/**
 * Created by rbachleitner on 6/27/17.
 */
import React from 'react';
import ListEntry from './ListEntry';
import { observer } from 'mobx-react';

function hasSubstring(listEntry, store) {
  let containsSubstring = false;
  const searchStringLowerCase = store.searchString.toLowerCase();
  containsSubstring = listEntry.title.toLowerCase().includes(searchStringLowerCase) ||
                      listEntry.area.toLowerCase().includes(store.searchString);
  if (store.searchString === "") return true;
  return containsSubstring;
}

const List =
  observer(
    ({store}) => {
    const displayMode = (store.displayList ? "inline-block" : "none");
    return (
      <div style={{width: store.listWidth, height: store.svgHeight, float: "right", display: displayMode, border: "0px solid grey", overflow: "hidden"}}>
        <div style={{borderBottom: "2px grey solid", padding: "10px",backgroundColor: "lightblue", height: "10%"}}>
          <h3>Headstart React Mobx</h3>
          <div>Search: <input id="search" onChange={() => {store.searchString = document.getElementById('search').value;}}/></div>
        </div>
        <div style={{height: "88%", overflow: "scroll"}}>
          {store.papersStore.entities
            .filter((paper) => (store.papersStore.entities.some((paper) => paper.clicked) ? paper.clicked : paper.listvisible) === true)
            .filter((paper) => hasSubstring(paper, store))
            .map((paper, index) =>
            <ListEntry store={store}  paper={paper} key={index}/>
          )}
        </div>
      </div>
    )
    }
  );

export default List;