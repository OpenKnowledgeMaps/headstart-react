import React from 'react';
import {Modal} from 'react-bootstrap';

const PDFPreviewModal = class PDFPreviewModal extends React.Component
{
  constructor()
  {
    super();
    this.state = {
      showModal: false,
      showTransboxText: 'none'
    }
  }

  showClickText() {
    this.setState({showTransboxText : 'block'})
  }

  hideClickText() {
    this.setState({showTransboxText : 'none'})
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
        <div
          id="preview_image"
          style={{width: "230px", height: "298px", background: 'url("//openknowledgemaps.org/search_api/dist/img/preview_pdf.png") 0% 0% / 230px,  0% 0% / 298px'}}
          onClick={this.open.bind(this)}
          onMouseEnter={this.showClickText.bind(this)}
          onMouseLeave={this.hideClickText.bind(this)}
          >
          <div id="transbox" style={{width: "230px", height: "298px", display: this.state.showTransboxText}}>
            Click here to open preview
          </div>
        </div>


        <Modal show={this.state.showModal} onHide={this.close.bind(this)} bsSize="large" aria-labelledby="contained-modal-title-lg" id="iframe_modal">
          <Modal.Header style={{ paddingBottom: '0px', borderBottom: '0px' }}>
            <button className="btn btn-default pull-right" onClick={this.close.bind(this)}>&times;</button>
          </Modal.Header>
          <Modal.Body style={{width: "100%"}} bsClass="modal-body text-center">
            {/*<span id="spinner-iframe" className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>*/}
            <iframe id="pdf_iframe" className="block" src={viewer} frameBorder="0" style={{width: "100%", height: window.innerHeight - 200}} title="PDF"></iframe>
            {/*<div id="status"></div>*/}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
};

export default PDFPreviewModal;