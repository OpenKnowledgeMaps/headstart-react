import GroupedSVGEntities from './GroupedSVGEntities';
import BubbleModel from './BubbleModel';

/**
 * BubblesModel manages the state of the array of bubbles in the visualization;
 */
class BubblesModel extends GroupedSVGEntities {
  constructor(initialState) {
    super(initialState, BubbleModel)
  }

  /**
   * Save coordinates of all bubbles to the orig_ prefixed members
   */
  saveAllCoordsToOriginalCoords() {
    this.entities.forEach((entity) => entity.saveCoordsToOriginalCoords());
  }

  /**
   * Adjust all bubble coordinates and dimensions to a new window size
   * @param previousSVGWidth - the previous SVG size
   * @param svgWidth - the new SVG size
   */
  onWindowResize(previousSVGWidth, svgWidth) {
    this.recalculateCoords(svgWidth/previousSVGWidth);
  }

  /**
   * Multiply all coordinates and dimensions by factor
   * @param factor - A scaling factor
   */
  // TODO Same method as in PapersModel for different set of properties
  // can be simplified
  recalculateCoords(factor) {
    this.entities.forEach((entity) => {
      entity.orig_x = entity.orig_x * factor;
      entity.orig_y = entity.orig_y * factor;
      entity.orig_r = entity.orig_r * factor;
    });
  }

}

export default BubblesModel;