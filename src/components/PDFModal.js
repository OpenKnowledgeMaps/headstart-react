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
    let viewer = process.env.PUBLIC_URL + "/pdfjs-hypothesis/web/viewer.html";
    viewer = viewer + "?file=" + process.env.PUBLIC_URL + '/mockpdf.pdf';

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


        <Modal show={this.state.showModal} onHide={this.close.bind(this)} bsSize="large" aria-labelledby="contained-modal-title-lg" id="iframe_modal">
          <Modal.Header style={{ paddingBottom: '0px', borderBottom: '0px' }}>
            <button className="btn btn-default pull-right" onClick={this.close.bind(this)}>&times;</button>
          </Modal.Header>
          <Modal.Body style={{width: "100%"}}>
            {/*<span id="spinner-iframe" className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>*/}
            <iframe id="pdf_iframe" className="block" src={viewer} frameBorder="0" style={{width: "100%", height: window.innerHeight - 200}} title="PDF"></iframe>
            {/*<div id="status"></div>*/}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
};

export default PDFModal;