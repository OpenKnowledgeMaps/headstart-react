import React from 'react';
import PDFModal from './PDFModal';
import { observer } from 'mobx-react';
import { onListClick } from '../models/ListEvents';
import {Button} from 'react-bootstrap';

/* eslint-disable jsx-a11y/href-no-hash */

const ListEntry =
  observer(
    ({store, paper}) => {

      const abstract = paper.clicked ? paper.paper_abstract : paper.paper_abstract.slice(0, 300) + '...';
      const openAccessLogoStyle = paper.oa ? {display: 'inline'} : {display: 'none'};
      const authors = (paper.authors);
      const htmlLink = <Button bsStyle="info" bsSize="xsmall" href={paper.oa_link} target="_blank"> HTML <span id="htmlbutton">&#xf05a;</span></Button>;
      const pdfLink = paper.oa ? <PDFModal link={paper.oa_link_pdf}/> : '';
      let titleLink =
        <div className="list_title" onClick={onListClick.bind(this, paper, store)}>
          <span id="open-access-logo_list" style={openAccessLogoStyle}>open access <span
            className="outlink_symbol">&#xf09c;</span></span>
          <a href="#" id="paper_list_title" className="highlightable"> {paper.title}</a>
        </div>;

      return (
        <div className="list_entry">

          <div className="list_metadata">

            {titleLink}

            <div className="list_links">
              {htmlLink}
              {pdfLink}
            </div>

            <div className="list_details highlightable">
              <span className="list_authors">{authors}</span>
              <span className="list_in"> in </span>
              <span className="list_published_in">{paper.published_in}</span>
              <span className="list_pubyear"> ({paper.year})</span>
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