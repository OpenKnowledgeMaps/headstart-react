/**
 * Created by rbachleitner on 7/3/17.
 */
/**
 * Created by rbachleitner on 6/29/17.
 */

import EntityModel from './EntityModel';

class NodeModel extends EntityModel {
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
}

export default NodeModel;