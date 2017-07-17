import GroupedSVGEntities from './GroupedSVGEntities';
import BubbleModel from './BubbleModel';

class BubblesModel extends GroupedSVGEntities {
  constructor(initialState) {
    super(initialState, BubbleModel)
  }

  saveAllCoordsToOriginalCoords() {
    this.entities.forEach((entity) => entity.saveCoordsToOriginalCoords());
  }

  onWindowResize(previousSVGWidth, svgWidth) {
    this.recalculateCoords(svgWidth/previousSVGWidth);
  }

  recalculateCoords(factor) {
    this.entities.forEach((entity) => {
      entity.orig_x = entity.orig_x * factor;
      entity.orig_y = entity.orig_y * factor;
      entity.orig_r = entity.orig_r * factor;
    });
  }

}

export default BubblesModel;