import {forceSimulation, forceCollide, forceManyBody, forceCenter} from 'd3-force';
import uiStore from './UIStore';

class LogicStore {
  onBubbleClick(node) {
    console.log("Bubble " + node.id + " with area " + node.area + " clicked");
    uiStore.zoomedInNode = node.id;
    if (node.selected === false) {
      this.zoomInOn(node);
      node.selected = true;
    }
    else
    {
      this.resetCoords();
      node.selected = false;
    }
  }

  onSVGClick(nodes) {
    const hoveringBubble = nodes.some((node) => node.hover    === true);
    const nodeSelected =   nodes.some((node) => node.selected === true);
    if (!hoveringBubble && nodeSelected) {
       this.resetCoords();
    }
  }

  onBubbleMouseOver(node) {
    node.hover = true;
  }

  onBubbleMouseOut(node) {
    node.hover = false;
  }

  startForceSim() {
    let saveCoords = this.saveInitialCoords.bind(this);
    forceSimulation()
      .nodes(uiStore.data.nodes)
      .alphaMin(0.3)
      .force("charge", forceManyBody().strength(1000))
      .force("center", forceCenter(450, 450))
      .force("collision", forceCollide(70))
      .on('end', () => {
        console.log('Force Simulation Done');
        saveCoords();
      });
  }

  onAppStart() {
    this.startForceSim();
  }

  saveInitialCoords() {
    uiStore.data.nodes.map((node) => {
      node.orig_x = node.x;
      node.orig_y = node.y;
      node.orig_r = node.r;
      return 0;
    });
  }

  resetCoords() {
    uiStore.data.nodes.map((node, index) => {
      node.x = node.orig_x;
      node.y = node.orig_y;
      node.r = node.orig_r;
      return 0;
    });
  }

  zoomInOn(node) {
    const zoomFactor = node.zoomFactor = 450./node.orig_r;
    const translationVecX = node.translationVecX = 450. - zoomFactor*node.orig_x;
    const translationVecY = node.translationVecY = 450. - zoomFactor*node.orig_y;
    uiStore.data.nodes.map((node, index) => {
      node.x = zoomFactor*node.orig_x + translationVecX;
      node.y = zoomFactor*node.orig_y + translationVecY;
      node.r = zoomFactor*node.orig_r;
      node.selected = false;
      return 0;
    });
  }
}

let logicStore = window.logicStore = new LogicStore();

export default logicStore;