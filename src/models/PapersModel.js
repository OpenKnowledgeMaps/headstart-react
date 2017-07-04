import {extendObservable, autorun} from 'mobx';
import PaperModel from './PaperModel';
import GroupedSVGEntities from './GroupedSVGEntities';

class PapersModel extends GroupedSVGEntities {
  constructor(initialState) {
    let initialState_ = { entities: initialState.papers };
    super(initialState_, PaperModel);
    extendObservable(this, {

      get flaglessPapers() {
        return this.entities.filter((paper) => !(paper.selected && paper.hover && paper.active)) || [];
      },

      set zoomedPaper(paper) {
        if (paper === null) this.entities.forEach((paper) => paper.zoomed = false);
        else {
          this.allOtherEntitiesExcept(paper).forEach((paper) => paper.zoomed = false);
          paper.zoomed = true;
        }
      },

      set listVisiblePapers(papers) {
        this.entities.forEach((paper) => paper.listvisibel = false);
        papers.forEach((paper) => paper.listvisible = true);
      }

    });
  }

  saveAllCoordsToOriginalCoords() {
    this.entities.forEach((entity) => entity.saveCoordsToOriginalCoords());
  }

  disposer() {
    autorun(() => {
    });

  }
}

// let papersModel = window.papersModel = new PapersModel(data);

export default PapersModel;