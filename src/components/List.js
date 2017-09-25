import React from 'react';
import ListEntry from './ListEntry';
import Filter from './Filter';
import SortButtons from './SortButtons';
import {toggleList} from '../models/ListEvents';
import { observer } from 'mobx-react';
import { hasSubstring } from './Helpers';

const List = observer(class List extends React.Component {

  constructor({store}) {
    super();
    this.store = store;
  }

  componentDidMount() {
  }

  render() {
    this.papersListStyle = {height: this.store.paperListHeight + 'px', display: "block"};
    const showHideLabel = this.props.store.displayList ? "Hide list" : "Show list";
    const showHideIcon = this.props.store.displayList ? "▼" : "▼";
    const sortButtons =  this.props.store.displayList ? <SortButtons store={this.props.store}/> : '';
    this.papersListStyle.display = this.props.store.displayList ? "block" : "none";

    let filteredPapers = this.store.papersStore.entities
      .filter((paper) => (this.store.papersStore.entities.some((paper) => paper.clicked) ? paper.clicked : paper.listvisible) === true)
      .filter((paper) => hasSubstring(paper, this.store.searchString));

    if (this.store.sortOption !== null)
    {
      switch (this.store.sortOption) {
        case 'readers' : filteredPapers = filteredPapers.sort((a, b) => (a[this.store.sortOption] > b[this.store.sortOption] ? -1 : 1)); break;
        case 'authors' : filteredPapers = filteredPapers.sort((a, b) => (a[this.store.sortOption] < b[this.store.sortOption] ? -1 : 1)); break;
        case 'title' : filteredPapers = filteredPapers.sort((a, b) => (a[this.store.sortOption] < b[this.store.sortOption] ? -1 : 1)); break;
        case 'year' : filteredPapers = filteredPapers.sort((a, b) => (a[this.store.sortOption] > b[this.store.sortOption] ? -1 : 1)); break;
        default: console.log("Couldnt filter papers"); break;
      }
    }

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
              <Filter store={this.props.store}/>
              {sortButtons}
            </div>


          </div>
          <div id="papers_list" className="col-xs-12" style={this.papersListStyle}>
            {filteredPapers
              .map((paper, index) =>
                <ListEntry store={this.store}  paper={paper} key={index}/>
              )}
          </div>
        </div>
      </div>
    );
  }
});

export default List;