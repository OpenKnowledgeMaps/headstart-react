import { extendObservable, autorun } from "mobx";
import PapersModel from './PapersModel';
import BubblesModel from './BubblesModel';

class UIStore {
  constructor(initialState) {
    let papersStore = new PapersModel(initialState);
    let bubblesStore = new BubblesModel(initialState);
    this.isZoomed = false;
    this.papersStore = papersStore;
    this.bubblesStore = bubblesStore;

    this.previousSVGWidth = window.innerHeight;
    this.previousListWidth = (window.innerWidth - this.previousSVGWidth)*0.95;
    if ((this.previousListWidth/window.innerWidth) < 0.26) {
      this.previousSVGWidth = window.innerWidth*0.7;
      this.previousListWidth = window.innerWidth*0.27;
    }

    extendObservable(this, {
      data : { areas: initialState.areas },
      svgWidth: this.previousSVGWidth,
      svgHeight: this.previousSVGWidth,
      listWidth: this.previousListWidth,
      forceSimParameters: {
        manyBodyForceStrength: 1000,
        collisionForceRadius: 100,
        bubblesAlphaMin: 0.8,
        papersAlphaMin: 0.8,
        centerXForceStrength: 0.5,
        centerYForceStrength: 0.5,
      },
      paperZoomFactor: 2.,
      bubbleCenterOffset: 20,
      paperWidth: 26,
      paperHeight: 40,
      forceSimIsDone: false,
      zoomFactor: 1.,
      translationVecX: 0.,
      translationVecY: 0.,
      searchString: "",
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });

  }

    disposer()
    {
      autorun(() => {
        if ((this.papersStore.hasSelectedEntities ||
            this.bubblesStore.hasSelectedEntities)) {

          this.isZoomed = true;
          let node = this.bubblesStore.selectedEntities;
          if (node.length > 0) {
            this.updateZoomState(node[0], this);
            this.updateCoords();
          }

        } else if (!(this.papersStore.hasSelectedEntities && this.bubblesStore.hasSelectedEntities)
            && this.isZoomed === true) {

          this.isZoomed = false;
          this.resetZoomState(this);
          this.updateCoords();

        }
      });
    }

  updateZoomState(node) {
    this.zoomFactor = this.svgWidth * 0.5 / node.orig_r;
    this.translationVecX = this.svgWidth * 0.5 - this.zoomFactor * node.orig_x;
    this.translationVecY = this.svgHeight * 0.5 - this.zoomFactor * node.orig_y;
  }

  updateCoords() {
    const zoomFactor = this.zoomFactor;
    const translationVecX = this.translationVecX;
    const translationVecY = this.translationVecY;
    this.papersStore.entities.forEach((paper) => {
      paper.x = (zoomFactor*paper.orig_x + translationVecX);
      paper.y = (zoomFactor*paper.orig_y + translationVecY);
      paper.width =  zoomFactor*paper.orig_width;
      paper.height =  zoomFactor*paper.orig_height;
      paper.fontsize = zoomFactor*paper.orig_fontsize;
    });
    this.bubblesStore.entities.forEach((node) => {
      node.x = (this.zoomFactor*node.orig_x + this.translationVecX);
      node.y = (this.zoomFactor*node.orig_y + this.translationVecY);
      node.r = (this.zoomFactor*node.orig_r);
    });
  }

  resetZoomState() {
    this.zoomFactor = 1.;
    this.translationVecX = 0.;
    this.translationVecY = 0.;
  }

}

export default UIStore;
