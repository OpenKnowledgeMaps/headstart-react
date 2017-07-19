import React from 'react';
import ListEntry from './ListEntry';
import {toggleList} from '../models/ListEvents';
import { observer } from 'mobx-react';

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

const List = observer(class List extends React.Component {

  constructor({store}) {
    super();
    this.store = store;
  }

  componentDidMount() {
    this.store.paperListHeight = document.querySelector(".vis-col").clientHeight - document.querySelector("#explorer_header").clientHeight + "px";
    this.store.paperExplorerHeight = document.querySelector("#explorer_header").clientHeight;
    this.papersListStyle = {height: this.store.paperListHeight, display: "block"};
  }

  render() {
    this.papersListStyle = {height: this.store.paperListHeight, display: "block"};
    const showHideLabel = this.props.store.displayList ? "Hide list" : "Show list";
    const showHideIcon = this.props.store.displayList ? "▼" : "▼";
    this.papersListStyle.display = this.props.store.displayList ? "block" : "none";
    return (
      <div className="list-col">
        <div id="list_exporer">
        <div className="col-xs-12" id="explorer_header">
          <div id="show_hide_button" className="row" onClick={toggleList.bind(this, this.props.store)}>
            <div className="col-xs-2" >{showHideIcon}</div>
            <div className="col-xs-8" id="show_hide_button_label">
              <span id="show_hide_label">{showHideLabel}</span>
            </div>
            <div className="col-xs-2 text-right">{showHideIcon}</div>
          </div>


          <div id="explorer_options" className="row">

            <div className="" id="filter_container">
              <div className="input-group input-group-sm">
                <input id="filter_input" type="text" className="form-control" onChange={() => {this.store.searchString = window.document.getElementById('filter_input').value;}} />
                <span id="searchclear" className="glyphicon glyphicon-remove-circle"></span>
              </div>
            </div>

            <div className="" id="sort_container">
              <span id="sortby">sort by:</span>
              <div id="sort-buttons" className="btn-group btn-group-sm pull-right" data-toggle="buttons" role="group">
              </div>
            </div>

          </div>


        </div>
          <div id="papers_list" className="col-xs-12" style={this.papersListStyle}>
            {this.store.papersStore.entities
              .filter((paper) => (this.store.papersStore.entities.some((paper) => paper.clicked) ? paper.clicked : paper.listvisible) === true)
              .filter((paper) => hasSubstring(paper, this.store))
              .sort((a, b) => (a.readers > b.readers ? -1 : 1))
              .map((paper, index) =>
                <ListEntry store={this.store}  paper={paper} key={index}/>
              )}
          </div>
      </div>
      </div>
    )
  }
});

export default List;