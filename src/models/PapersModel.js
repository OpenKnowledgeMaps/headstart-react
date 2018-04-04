import {extendObservable} from 'mobx';
import PaperModel from './PaperModel';
import GroupedSVGEntities from './GroupedSVGEntities';
import {extent} from 'd3-array';
import {scalePow} from 'd3-scale';

/**
 * PapersModel manages the state of the array of papers in the visualization;
 */
class PapersModel extends GroupedSVGEntities {
  constructor(initialState) {
    super(initialState, PaperModel);

    // MobX getters and setters / observables
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
        this.entities.forEach((paper) => paper.listvisible = false);
        papers.forEach((paper) => paper.listvisible = true);
      },

      get readersExtent() {
        return extent(this.entities.map((entity) => entity.readers))
      },

      // TODO extract this to configuration
      minPaperDiameter : 40,
      maxPaperDiameter : 60,
      paperHeightToWidthRatio: 1.33333
    });
    this.setScaledPaperDimensions();
  }

  /**
   * Initializes paper width and paper height proportional to the number of readers a paper has
   */
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

  /**
   * Save coordinates of all papers to the orig_ prefixed members
   */
  saveAllCoordsToOriginalCoords() {
    this.entities.forEach((entity) => entity.saveCoordsToOriginalCoords());
  }

  /**
   * Adjust all paper coordinates and dimensions to a new window size
   * @param previousSVGWidth - the previous SVG size
   * @param svgWidth - the new SVG size
   */
  // TODO not sure if necessary since it only wraps recalculateCoords for now
  onWindowResize(previousSVGWidth, svgWidth) {
    this.recalculateCoords(svgWidth / previousSVGWidth);
  }

  /**
   * Multiply all coordinates and dimensions by factor
   * @param factor - A scaling factor
   */
  recalculateCoords(factor) {
    this.entities.forEach((entity) => {
      entity.orig_x = entity.orig_x * factor;
      entity.orig_y = entity.orig_y * factor;
      entity.orig_width = entity.orig_width * factor;
      entity.orig_height = entity.orig_height * factor;
      entity.orig_fontsize = entity.orig_fontsize * factor;
    });
  }
}

export default PapersModel;