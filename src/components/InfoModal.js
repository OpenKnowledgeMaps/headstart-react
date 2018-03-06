import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import top100 from '../static/top100.png';
import textSimliarity from '../static/textsimilarity.png';
import headstartSearch from '../static/headstart-search.png';

/**
 * Renders the "What's this?" button, opens a modal when clicked.
 */
class InfoModal extends React.Component
{
  constructor()
  {
    super();
    this.state = {
      showModal: false
    }
  }

  close()
  {
    this.setState({showModal: false});
  }

  open()
  {
    this.setState({showModal: true});
  }

  /** TODO
   * Inline styles in the render function should be either
   * a) extracted and incorporated in the SASS stylesheets (src/stylesheets)
   * b) extracted to a Javascript Object that belongs specifically to this
   *    Component. e.g. let infoModalStyles = { div: { margin: "0 0 30px" } }
   *    which we could use like <div style={infoModalStyles.div}> ... </div>
   */
  render()
  {
    return (
      <div style={{display: "inline"}}>
        <Button
          bsStyle="danger"
          bsSize="xsmall"
          onClick={this.open.bind(this)}
        >
          What's this? <span id="whatsthis">&#xf05a;</span>
        </Button>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <h3 id="info-title" className="modal-title" style={{fontSize : "20px"}}>What's this?</h3>
          </Modal.Header>
          <Modal.Body>
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
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default InfoModal;