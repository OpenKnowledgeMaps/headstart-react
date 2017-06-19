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
      svgHeight: 900
    });

    this.isZoomed = false;
    this.zoomedInNode = null;
  }
}

let uiStore = window.store = new UIStore();

export default uiStore;