import React from 'react';
import {Button, Modal} from 'react-bootstrap';

const PDFModal = class PDFModal extends React.Component
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

  render()
  {
    return (
      <div style={{display: "block"}}>
        <Button
          bsStyle="danger"
          bsSize="xsmall"
          onClick={this.open.bind(this)}
          className="link2 pdf-link"
          componentClass="a"
        >
          PDF <span id="whatsthis">&#xf05a;</span>
        </Button>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)} bsSize="large" aria-labelledby="contained-modal-title-lg">
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body style={{width: "100%"}}>
            {/*<span id="spinner-iframe" className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>*/}
            <iframe id="pdf_iframe" className="block" src={this.props.link} frameBorder="0" style={{width: "100%", height: window.innerHeight - 200}} title="PDF"></iframe>
            {/*<div id="status"></div>*/}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default PDFModal;