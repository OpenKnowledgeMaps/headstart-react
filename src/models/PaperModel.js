import EntityModel from './EntityModel';

/**
 * The PaperModel class represents the state of a single paper in the visualization;
 * Subclass of EntityModel
 */
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
    if (!paper.hasOwnProperty('listvisible')) paper.listvisible = true;
    if(!(paper.hasOwnProperty('orig_fontsize'))) paper.orig_fontsize = paper.fontsize;
    super(paper);
  }

  /**
   * x, y are used as the actual coords of a paper and subject to change;
   * orig_x, orig_y are treated as the original 'position' in the layout
   * as determined by the force simulation and remain unchanged after the initial
   * calculation;
   */
  saveCoordsToOriginalCoords() {
    this.orig_x = this.x;
    this.orig_y = this.y;
  }
}

export default PaperModel;
