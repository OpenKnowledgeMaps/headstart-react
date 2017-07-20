import {extendObservable, autorun} from 'mobx';
import PaperModel from './PaperModel';
import GroupedSVGEntities from './GroupedSVGEntities';
import {extent} from 'd3-array';
import {scalePow} from 'd3-scale';

class PapersModel extends GroupedSVGEntities {
  constructor(initialState) {
    super(initialState, PaperModel);
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
      },

      get readersExtent() {
        return extent(this.entities.map((entity) => entity.readers))
      },

      minPaperDiameter : 40,
      maxPaperDiameter : 60,
      paperHeightToWidthRatio: 1.33333
    });
    this.setScaledPaperDimensions();
  }

  setScaledPaperDimensions() {
    const paperScale = scalePow().exponent(0.5).domain(this.readersExtent).range([this.minPaperDiameter, this.maxPaperDiameter]);
    this.entities.forEach((paper) => {
      const diameter = paperScale(paper.readers);
      const width = Math.sqrt(Math.pow(diameter, 2)/(1 + Math.pow(this.paperHeightToWidthRatio, 2)));
      const height = width*this.paperHeightToWidthRatio;
      paper.width = paper.orig_width = width;
      paper.height = paper.orig_height = height;
    });
  }

  saveAllCoordsToOriginalCoords() {
    this.entities.forEach((entity) => entity.saveCoordsToOriginalCoords());
  }

  onWindowResize(previousSVGWidth, svgWidth) {
    this.recalculateCoords(svgWidth / previousSVGWidth);
  }

  recalculateCoords(factor) {
    this.entities.forEach((entity) => {
      entity.orig_x = entity.orig_x * factor;
      entity.orig_y = entity.orig_y * factor;
      entity.orig_width = entity.orig_width * factor;
      entity.orig_height = entity.orig_height * factor;
      entity.orig_fontsize = entity.orig_fontsize * factor;
    });
  }

  disposer() {
    autorun(() => {
    });

  }
}

// let papersModel = window.papersModel = new PapersModel(data);

export default PapersModel;