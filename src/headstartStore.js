/**
 * Created by rbachleitner on 5/24/17.
 */

import { extendObservable } from "mobx";
import data from './Data';

class HeadstartStore {

  constructor() {
    extendObservable(this, {
      data : data,
      currentMouseOverBubbleID : null,
      svgWidth: 900,
      svgHeight: 900
    });
  }
}

var store = window.store = new HeadstartStore();

export default store;