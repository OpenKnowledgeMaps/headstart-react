import React from 'react';
import { observer } from 'mobx-react';
import top100 from '../static/top100.png';
import textSimliarity from '../static/textsimilarity.png';
import headstartSearch from '../static/headstart-search.png';

function dismissInfoModal(store) {
  store.showInfoModal = false;
}

const InfoModal =
  observer(
    ({store}) => {
      const infoModalClassName = store.showInfoModal ? "modal fade in" : "modal fade";
      const infoModalStyle = store.showInfoModal ? {display: "block", paddingRight: 15 + "px"} : {display: "none"};
      return (

        <div id="info_modal" className={infoModalClassName} role="dialog" tabIndex='-1' style={infoModalStyle}>

          <div className="modal-dialog">

            <div className="modal-content">

              <div className="modal-header">
                <button type="button" className="btn btn-default pull-right" onClick={dismissInfoModal.bind(this, store)}>&times;</button>
                <h3 id="info-title" className="modal-title" style={{fontSize : "20px"}}>What's this?</h3>
              </div>

              <div id="info-body" className="modal-body">
                <div className="description-headstart" style={{maxWidth: "1000px"}}>
                  <div style={{margin: "0 0 30px"}}>
                    <p className="icon">
                      <img alt="" src={top100} /></p>             <p className="icon-description">An Open
                    Knowledge Maps visualization presents you with a topical overview for a search term. It is based on
                    the <a href="faqs.php" target="_blank" rel="noopener noreferrer" className="underline">most relevant</a> papers in the chosen
                    library. </p></div>
                  <div style={{margin: "0 0 30px"}}><p className="icon"><img alt="" src={textSimliarity} /></p>
                    <p className="icon-description">
                      We use text similarity to create the knowledge maps. The algorithm
                      groups
                      those papers together that have many words in common.
                    </p>
                  </div>
                  <div style={{display: "block"}}><p className="icon"><img alt=""src={headstartSearch} /></p>
                    <p className="icon-description">
                      The visualization is intended to give you a head start on your
                      literature
                      search. You can also use Open Knowledge Maps to stay up-to-date - just limit your search to the
                      most
                      recent papers in the search options.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      );
    });

export default InfoModal;