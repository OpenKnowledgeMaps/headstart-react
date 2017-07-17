import React from 'react';
import { observer } from 'mobx-react';
import { onListClick } from '../models/ListEvents';

import openAccessLogo from '../static/open-access-logo.png';

const ListEntry =
  observer(
    ({store, paper}) => {

      const abstract = paper.clicked ? paper.paper_abstract : paper.paper_abstract.slice(0, 75);

      return (
        <div class="list_entry" style={{borderBottom: "2px grey solid", display: "block", padding: "10px"}}>

          <div class="list_metadata">

            <div class="list_title" style={{"textDecoration" : "underline"}} onClick={onListClick.bind(this, paper, store)}>
              <span id="open-access-logo_list">open access <span class="outlink_symbol">&#xf09c;</span></span>
              <a href="#" id="paper_list_title" class="highlightable">{paper.title}</a>
            </div>

            <div class="list_links">
              <a href="#" target="_blank" class="outlink">HTML  <span class="outlink_symbol">&#xf08e;</span></a>
              <a class="link2 pdf-link">PDF  <span class="outlink_symbol">&#xf06e;</span></a>
            </div>

            <div class="list_details highlightable">
              <span class="list_authors">{paper.authors}</span>
              <span class="list_in"> in </span>
              <span class="list_published_in">{paper.published_in}</span>
              <span class="list_pubyear">{paper.year}</span>
            </div>

          </div>

          <div class="highlightable">
            <p id="list_abstract">{abstract}</p>
          </div>

          <div id="list_area">
            <span class="area_tag">Area:</span> <span class="area_name">{paper.area}</span>
          </div>

          <div class="list_readers">
            <span class="num_readers">{paper.readers}</span> <span class="list_readers_entity">readers</span>&nbsp;
          </div>

      </div>
        );
    }
  );

export default ListEntry;