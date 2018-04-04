import EntityModel from './EntityModel';

/**
 * The BubbleModel class represents the state of a single bubble in the visualization;
 * Subclass of EntityModel
 */
class BubbleModel extends EntityModel {
  /**
   * Initializes a BubbleModel;
   * @param node
   */
  constructor(node) {
    if(!(node.hasOwnProperty('orig_x'))) node.orig_x = 0.;
    if(!(node.hasOwnProperty('orig_y'))) node.orig_y = 0.;
    if(!(node.hasOwnProperty('orig_r'))) node.orig_r = node.r;
    if(!(node.hasOwnProperty('zoomed_x'))) node.zoomed_x = 0.;
    if(!(node.hasOwnProperty('zoomed_y'))) node.zoomed_y = 0.;
    if(!(node.hasOwnProperty('zoomed_r'))) node.zoomed_r = 0.;
    if(!(node.hasOwnProperty('active'))) node.active = false;
    if(!(node.hasOwnProperty('selected'))) node.selected = false;
    if(!(node.hasOwnProperty('hover'))) node.hover = false;
    if(!(node.hasOwnProperty('vx'))) node.vx = false;
    if(!(node.hasOwnProperty('vy'))) node.vy = false;
    if(!(node.hasOwnProperty('group'))) node.group = 1;
    if(!(node.hasOwnProperty('bubble'))) node.type = "bubble";
    if(!(node.hasOwnProperty('translationX'))) node.translationX = 0.;
    if(!(node.hasOwnProperty('translationX'))) node.translationY = 0;
    super(node);
  }

  /**
   * x, y & r are used as the actual coords of a bubble and subject to change;
   * orig_x, orig_y and orig_r are treated as the original 'position' in the layout
   * as determined by the force simulation and remain unchanged after the initial
   * calculation;
   */
  saveCoordsToOriginalCoords() {
    this.orig_x = this.x;
    this.orig_y = this.y;
    this.orig_r = this.r;
  }
}

export default BubbleModel;