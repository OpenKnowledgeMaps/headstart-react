import GroupedSVGEntities from './GroupedSVGEntities';
import BubbleModel from './BubbleModel';

class BubblesModel extends GroupedSVGEntities {
  constructor(initialState) {
    super(initialState, BubbleModel)
  }

  saveAllCoordsToOriginalCoords() {
    this.entities.forEach((entity) => entity.saveCoordsToOriginalCoords());
  }

}

export default BubblesModel;