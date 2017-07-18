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
    return (

      <div className="list-col">
        <div id="explorer_header">
          <div id="show_hide_button" className="row">
            <div className="col-xs-2" >▼</div>
            <div className="col-xs-8" id="show_hide_button_label">
              <span id="show_hide_label">Hide list</span>
            </div>
            <div className="col-xs-2 text-right">▼</div>
          </div>


          <div id="explorer_options" className="row">

            <div className="" id="filter_container">
              <div className="input-group input-group-sm">
                <input id="filter_input" type="text" className="form-control" onChange={() => {store.searchString = document.getElementById('search').value;}} />
                  <span id="searchclear" className="glyphicon glyphicon-remove-circle"></span>
              </div>
            </div>

            <div className="" id="sort_container">
              <span id="sortby">sort by:</span>
              <div id="sort-buttons" className="btn-group btn-group-sm pull-right" data-toggle="buttons" role="group">
              </div>
            </div>

          </div>


          <div id="papers_list" className="col-xs-12">
            {store.papersStore.entities
              .filter((paper) => (store.papersStore.entities.some((paper) => paper.clicked) ? paper.clicked : paper.listvisible) === true)
              .filter((paper) => hasSubstring(paper, store))
              .map((paper, index) =>
              <ListEntry store={store}  paper={paper} key={index}/>
            )}
          </div>
      </div>
      </div>
    )
    }
  );

export default List;
// style={{width: store.listWidth, height: store.svgHeight + store.subtitleHeight, float: "right", display: "inline-block", overflow: "hidden"}}