import React from 'react';
import PDFModal from './PDFModal';
import PDFPreviewModal from './PDFPreviewModal';
import HighlightableText from '../HighlightableText';
import { observer } from 'mobx-react';
import { onListClick } from '../../eventhandlers/ListEvents';
import {Button} from 'react-bootstrap';

/* eslint-disable jsx-a11y/href-no-hash */

/**
 * ListEntry component
 * Sets content and styling of a list entry according to state and renders it;
 * @type {<T extends IReactComponent>(clazz: T) => void | IReactComponent | (function({store?: *, paper?: *}))}
 */
const ListEntry =
  observer(
    ({store, paper}) => {

      // TODO clear this mess up
      const abstract = paper.clicked ? paper.paper_abstract : paper.paper_abstract.slice(0, 300) + '...';
      const listEntryClassName = paper.clicked ? "list_entry_full" : "list_entry";
      const openAccessLogo = paper.oa ?
        <span id="open-access-logo_list">open access <span
          className="outlink_symbol">&#xf09c;</span></span> : '';
      const authors = (paper.authors);
      const htmlLink = <Button bsStyle="info" bsSize="xsmall" href={paper.oa_link} target="_blank"> HTML <span className="outlink_symbol">&#xf08e;</span></Button>;
      const pdfLink = paper.oa ? <PDFModal link={paper.oa_link_pdf}/> : '';
      const listTitleClass = paper.oa ? 'list_title oa' : 'list_title';
      const highlightStrings = store.searchString.split(' ');
      const preview = (paper.clicked && paper.oa)?
        <PDFPreviewModal link={paper.oa_link_pdf}/> : '';
      return (
          /* HTML starts here */
        <div id="list_holder">
          <div className={listEntryClassName}>

            <div className="list_metadata">

            <div className={listTitleClass} onClick={onListClick.bind(this, paper, store)}>
              {openAccessLogo}&nbsp;
              <a href="#" id="paper_list_title" className="highlightable">
                <HighlightableText highlightStrings={highlightStrings} value={paper.title}/></a>
            </div>

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
                  &nbsp;(<HighlightableText highlightStrings={highlightStrings} value={paper.year} />)
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
              <span className="num_readers">{paper.readers}</span> <span className="list_readers_entity">{store.config.sortOptions['readers']}</span>&nbsp;
            </div>

        </div>
          {preview}
      </div>
      /* HTML ends here */

        );
    }
  );

export default ListEntry;
