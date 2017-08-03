import React from 'react';
import PDFModal from './PDFModal';
import PDFPreviewModal from './PDFPreviewModal';
import HighlightableText from './HighlightableText';
import { observer } from 'mobx-react';
import { onListClick } from '../models/ListEvents';
import {Button} from 'react-bootstrap';

/* eslint-disable jsx-a11y/href-no-hash */

const ListEntry =
  observer(
    ({store, paper}) => {

      const abstract = paper.clicked ? paper.paper_abstract : paper.paper_abstract.slice(0, 300) + '...';
      const listEntryClassName = paper.clicked ? "list_entry_full" : "list_entry";
      const openAccessLogoStyle = paper.oa ? {display: 'inline'} : {display: 'none'};
      const authors = (paper.authors);
      const htmlLink = <Button bsStyle="info" bsSize="xsmall" href={paper.oa_link} target="_blank"> HTML <span className="outlink_symbol">&#xf08e;</span></Button>;
      const pdfLink = paper.oa ? <PDFModal link={paper.oa_link_pdf}/> : '';
      const highlightStrings = store.searchString.split(' ');
      let titleLink =
        <div className="list_title" onClick={onListClick.bind(this, paper, store)}>
          <span id="open-access-logo_list" style={openAccessLogoStyle}>open access <span
            className="outlink_symbol">&#xf09c;</span></span>
          <a href="#" id="paper_list_title" className="highlightable">
            <HighlightableText highlightStrings={highlightStrings} value={paper.title}/></a>
        </div>;

      const preview = paper.clicked ?
        <PDFPreviewModal link={paper.oa_link_pdf}/> : '';

      return (
        <div id="list_holder">
          <div className={listEntryClassName}>

            <div className="list_metadata">

              {titleLink}

              <div className="list_links">
                {htmlLink}
                {pdfLink}
              </div>

              <div className="list_details highlightable">
                <span className="list_authors">
                  <HighlightableText highlightStrings={highlightStrings} value={authors} />
                  </span>
                <span className="list_in"> in </span>
                <span className="list_published_in">{paper.published_in}</span>
                <span className="list_pubyear">
                  (<HighlightableText highlightStrings={highlightStrings} value={paper.year} />)
                </span>
              </div>

            </div>

            <div className="highlightable">
              <p id="list_abstract">
                  <HighlightableText highlightStrings={highlightStrings} value={abstract} />
                </p>
            </div>

            <div id="list_area">
              <span className="area_tag">Area:</span> <span className="area_name">
                <HighlightableText highlightStrings={highlightStrings} value={paper.area}/>
              </span>
            </div>

            <div className="list_readers">
              <span className="num_readers">{paper.readers}</span> <span className="list_readers_entity">readers</span>&nbsp;
            </div>

        </div>
          {preview}
      </div>
        );
    }
  );

export default ListEntry;