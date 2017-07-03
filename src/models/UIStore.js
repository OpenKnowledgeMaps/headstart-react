/**
 * Created by rbachleitner on 5/24/17.
 */

import { extendObservable, autorun } from "mobx";
import data from '../static/Data';
import PapersModel from './PapersModel';
import logicStore from './logicStore';

class UIStore {
  constructor() {
    let papersModel = new PapersModel(data);
    this.isZoomed = false;
    this.papersStore = papersModel;
    extendObservable(this, {
      data : { nodes: data.nodes, areas: data.areas },
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
        if ((this.papersStore.hasSelectedPapers ||
            this.data.nodes.some((node) => node.selected)) &&
            this.isZoomed === false) {
          console.log("Zoomin");
          this.isZoomed = true;
          let node = this.data.nodes.find((node) => node.selected);
          logicStore.updateZoomState(node);
        } else if (!this.papersStore.hasSelectedPapers && this.isZoomed === true) {
          console.log("Zoomout");
          this.isZoomed = false;
          logicStore.resetZoomState();
        }
      });
    }

  resetPaperFlags() {
    this.papersStore.papers.forEach((paper) =>
    {
      paper.selected = false;
      paper.listvisible = true;
      paper.clicked = false;
    });
  }

}
let uiStore = window.store = new UIStore();
uiStore.papersStore.disposer();
uiStore.disposer();

export default uiStore;
