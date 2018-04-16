import EntityModel from './EntityModel';

class PaperModel extends EntityModel {
  constructor(paper) {
    if(!(paper.hasOwnProperty('orig_x'))) paper.orig_x = 0.;
    if(!(paper.hasOwnProperty('orig_y'))) paper.orig_y = 0.;
    if(!(paper.hasOwnProperty('zoomed_x'))) paper.zoomed_x = 0.;
    if(!(paper.hasOwnProperty('zoomed_y'))) paper.zoomed_y = 0.;
    if(!(paper.hasOwnProperty('zoomed'))) paper.zoomed = false;
    if(!(paper.hasOwnProperty('width'))) paper.width = 30;
    if(!(paper.hasOwnProperty('height'))) paper.height = 40;
    if(!(paper.hasOwnProperty('orig_width'))) paper.orig_width = paper.width;
    if(!(paper.hasOwnProperty('orig_height'))) paper.orig_height = paper.height;
    if(!(paper.hasOwnProperty('zoomed_width'))) paper.zoomed_width = 0.;
    if(!(paper.hasOwnProperty('zoomed_height'))) paper.zoomed_height = 0.;
    if(!(paper.hasOwnProperty('fontsize'))) paper.fontsize = 2;
    if(!paper.hasOwnProperty('listvisible')) paper.listvisible = true;
    if(!(paper.hasOwnProperty('orig_fontsize'))) paper.orig_fontsize = paper.fontsize;
    if(!(paper.hasOwnProperty('type'))) paper.type = 'paper';
    if(!(paper.hasOwnProperty('zIndex'))) paper.zIndex = 0;
    super(paper);
  }

  saveCoordsToOriginalCoords() {
    this.orig_x = this.x;
    this.orig_y = this.y;
  }

  getZoomedCoords(zoomFactor = 1., translationVecX = 0., translationVecY = 0.) {
    const x =  zoomFactor  *  this.orig_x + translationVecX;
    const y =  zoomFactor  *  this.orig_y + translationVecY;
    const w =  zoomFactor  *  this.orig_width;
    const h =  zoomFactor  *  this.orig_height;
    return {x, y, w, h};
  }
}

export default PaperModel;
