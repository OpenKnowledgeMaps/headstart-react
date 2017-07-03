/**
 * Created by rbachleitner on 6/29/17.
 */

import EntityModel from './EntityModel';

class PaperModel extends EntityModel {
  constructor(paper) {
    if(!(paper.hasOwnProperty('orig_x'))) paper.orig_x = 0.;
    if(!(paper.hasOwnProperty('orig_y'))) paper.orig_y = 0.;
    if(!(paper.hasOwnProperty('zoomed_x'))) paper.zoomed_x = 0.;
    if(!(paper.hasOwnProperty('zoomed_y'))) paper.zoomed_y = 0.;
    if(!(paper.hasOwnProperty('width'))) paper.width = 26.;
    if(!(paper.hasOwnProperty('height'))) paper.height = 40.;
    if(!(paper.hasOwnProperty('orig_width'))) paper.orig_width = paper.width;
    if(!(paper.hasOwnProperty('orig_height'))) paper.orig_height = paper.height;
    if(!(paper.hasOwnProperty('zoomed_width'))) paper.zoomed_width = 0.;
    if(!(paper.hasOwnProperty('zoomed_height'))) paper.zoomed_height = 0.;
    if(!(paper.hasOwnProperty('fontsize'))) paper.fontsize = 5;
    if (!paper.hasOwnProperty('listvisible')) paper.listvisible = true;
    if(!(paper.hasOwnProperty('orig_fontsize'))) paper.orig_fontsize = paper.fontsize;
    super(paper);
  }
}

export default PaperModel;
