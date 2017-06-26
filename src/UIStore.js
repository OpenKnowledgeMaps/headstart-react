/**
 * Created by rbachleitner on 5/24/17.
 */

import { extendObservable } from "mobx";
import data from './Data';

class UIStore {

  constructor() {
    extendObservable(this, {
      data : data,
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
      forceSimIsDone: false
    });

    this.isZoomed = false;
    this.zoomedInNode = null;
  }
}

let uiStore = window.store = new UIStore();

export default uiStore;