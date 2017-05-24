import {extendObservable} from "mobx";
import {forceSimulation, forceCollide, forceManyBody, forceCenter} from 'd3-force';
import store from './headstartStore';

class LogicStore {

  constructor() {
    extendObservable(this, {
      currentMouseOverBubbleID: null,
    });
  }

  onBubbleClick(index) {
    console.log("Bubble " + index + " clicked");
  }

  onBubbleMouseOver(index) {
    console.log("Hovering over Bubble " + index + "!");
    store.data.nodes[index].hover = true;
  }

  onBubbleMouseOut(index) {
    store.data.nodes[index].hover = false;
  }

  onAppStart() {
    forceSimulation()
      .nodes(store.data.nodes)
      .alphaMin(0.3)
      .force("charge", forceManyBody().strength(1000))
      .force("center", forceCenter(450, 450))
      .force("collision", forceCollide(70));
  }
}

var logicStore = window.logicStore = new LogicStore();

export default logicStore;