import React from 'react';
import { observer } from 'mobx-react';
import { onListClick } from '../models/ListEvents';

/* eslint-disable jsx-a11y/href-no-hash */

const ListEntry =
  observer(
    ({store, paper}) => {

      const abstract = paper.clicked ? paper.paper_abstract : paper.paper_abstract.slice(0, 75);
      const openAccessLogoStyle = paper.oa ? {display: 'inline'} : {display: 'none'};

      return (
        <div className="list_entry">

          <div className="list_metadata">

            <div className="list_title" onClick={onListClick.bind(this, paper, store)}>
              <span id="open-access-logo_list" style={openAccessLogoStyle}>open access <span className="outlink_symbol">&#xf09c;</span></span>
              <a href="#" id="paper_list_title" className="highlightable">{paper.title}</a>
            </div>

            <div className="list_links">
              <a href="#" target="_blank" rel="noopener noreferrer" className="outlink">HTML  <span className="outlink_symbol">&#xf08e;</span></a>
              <a className="link2 pdf-link">PDF  <span className="outlink_symbol">&#xf06e;</span></a>
            </div>

            <div className="list_details highlightable">
              <span className="list_authors">{paper.authors}</span>
              <span className="list_in"> in </span>
              <span className="list_published_in">{paper.published_in}</span>
              <span className="list_pubyear">{paper.year}</span>
            </div>

          </div>

          <div className="highlightable">
            <p id="list_abstract">{abstract}</p>
          </div>

          <div id="list_area">
            <span className="area_tag">Area:</span> <span className="area_name">{paper.area}</span>
          </div>

          <div className="list_readers">
            <span className="num_readers">{paper.readers}</span> <span className="list_readers_entity">readers</span>&nbsp;
          </div>

      </div>
        );
    }
  );

export default ListEntry;