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
    extendObservable(this, {
      data : { areas: initialState.areas },
      svgWidth: 900,
      svgHeight: 900,
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
      get extendedSearchString() {
        return this.searchString + "extended";
      },
      set extendedSearchString(value) {
        this.searchString = value + "extended";
      }
    });

    }

    disposer()
    {
      autorun(() => {
        if ((this.papersStore.hasSelectedEntities ||
            this.bubblesStore.hasSelectedEntities)) {
          this.isZoomed = true;
          let node = this.bubblesStore.selectedEntities;
          if (node.length > 0) this.updateZoomState(node[0], this);
        } else if (!(this.papersStore.hasSelectedEntities && this.bubblesStore.hasSelectedEntities)
            && this.isZoomed === true) {
          this.isZoomed = false;
          this.resetZoomState(this);
        }
      });
    }

  updateZoomState(node) {
    this.zoomFactor = this.svgWidth * 0.5 / node.orig_r;
    this.translationVecX = this.svgWidth * 0.5 - this.zoomFactor * node.orig_x;
    this.translationVecY = this.svgHeight * 0.5 - this.zoomFactor * node.orig_y;
  }

  resetZoomState() {
    this.zoomFactor = 1.;
    this.translationVecX = 0.;
    this.translationVecY = 0.;
  }

}

export default UIStore;
