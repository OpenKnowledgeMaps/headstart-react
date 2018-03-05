import React from 'react';
import ListEntry from './ListEntry';
import Filter from './Filter';
import SortButtons from './SortButtons';
import {toggleList} from '../models/ListEvents';
import { observer } from 'mobx-react';
import { hasSubstring } from './Helpers';

/**
 * List component
 * Renders right column of visualization containing the list.
 * The array of PaperModels is filtered according to the search string or the selected paper
 * and sorted according to the selected sort option.
 * @type {<T extends IReactComponent>(clazz: T) => void | IReactComponent | List}
 */
const List = observer(class List extends React.Component {
  render() {
    let papersListStyle = {
      height: this.props.store.paperListHeight + 'px',
      display: this.props.store.displayList ? "block" : "none"
    };
    const showHideLabel = this.props.store.displayList ? "Hide list" : "Show list";
    const showHideIcon = this.props.store.displayList ? "▼" : "▼";
    const sortButtons =  this.props.store.displayList ? <SortButtons store={this.props.store}/> : '';

    // Filter papers according to search string and according to whether a Paper is selected in the vis or not
    let filteredPapers = this.props.store.papersStore.entities
      .filter((paper) =>
        (this.props.store.papersStore.entities
          .some((paper) => paper.clicked) ? paper.clicked : paper.listvisible) === true)
      .filter((paper) => hasSubstring(paper, this.props.store.searchString));

    // TODO make sort options configurable instead of hardcoded
    if (this.props.store.sortOption !== null)
    {
      switch (this.props.store.sortOption) {
        case 'readers' : filteredPapers = filteredPapers.sort((a, b) => (a[this.props.store.sortOption] > b[this.props.store.sortOption] ? -1 : 1)); break;
        case 'authors' : filteredPapers = filteredPapers.sort((a, b) => (a[this.props.store.sortOption] < b[this.props.store.sortOption] ? -1 : 1)); break;
        case 'title' : filteredPapers = filteredPapers.sort((a, b) => (a[this.props.store.sortOption] < b[this.props.store.sortOption] ? -1 : 1)); break;
        case 'year' : filteredPapers = filteredPapers.sort((a, b) => (a[this.props.store.sortOption] > b[this.props.store.sortOption] ? -1 : 1)); break;
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
          <div id="papers_list" className="col-xs-12" style={papersListStyle}>
            {filteredPapers
              .map((paper, index) =>
                <ListEntry store={this.props.store}  paper={paper} key={index}/>
              )}
          </div>
        </div>
      </div>
    );
  }
});

export default List;