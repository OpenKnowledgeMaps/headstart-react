import {forceSimulation, forceCollide, forceManyBody, forceCenter, forceX, forceY} from 'd3-force';
import uiStore from './UIStore';

class LogicStore {
  startForceSim() {
    let saveCoords = this.saveInitialCoords.bind(this);
    forceSimulation()
      .nodes(uiStore.data.nodes)
      .alphaMin(uiStore.forceSimParameters.bubblesAlphaMin)
      .force("charge", forceManyBody().strength(uiStore.forceSimParameters.manyBodyForceStrength))
      .force("center", forceCenter(uiStore.svgWidth*0.5, uiStore.svgHeight*0.5))
      .force("collision", forceCollide(uiStore.forceSimParameters.collisionForceRadius))
      .on('end', () => {
        saveCoords();
        uiStore.data.areas.map((area) => {
          const alphaMin = uiStore.forceSimParameters.papersAlphaMin;
          let bubbleX = uiStore.data.nodes.find((node) => node.area === area).x - uiStore.bubbleCenterOffset;
          let bubbleY = uiStore.data.nodes.find((node) => node.area === area).y - uiStore.bubbleCenterOffset;
          forceSimulation()
            .alphaMin(alphaMin)
            .nodes(uiStore.data.papers.filter((paper) => paper.area === area))
            .force("positioning", forceX(bubbleX).strength(uiStore.forceSimParameters.centerXForceStrength))
            .force("collision", forceCollide(uiStore.paperWidth - 5))
            .on('tick', () => {
              // saveCoords();
            });
          forceSimulation()
            .alphaMin(alphaMin)
            .nodes(uiStore.data.papers.filter((paper) => paper.area === area))
            .force("positioning", forceY(bubbleY).strength(uiStore.forceSimParameters.centerXForceStrength))
            // .force("center", forceCenter(bubbleX, bubbleY))
            .force("collision", forceCollide(uiStore.paperHeight - 15))
            .on('tick', () => {
              // saveCoords();
            }).on('end', () => { uiStore.forceSimIsDone = true; saveCoords(); });
          return 0;
        })
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
    uiStore.data.papers.map((paper) => {
      paper.orig_x = paper.x;
      paper.orig_y = paper.y;
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
    uiStore.data.papers.map((paper, index) => {
      paper.x = paper.orig_x;
      paper.y = paper.orig_y;
      paper.width = paper.orig_width;
      paper.height = paper.orig_height;
      paper.fontsize = paper.orig_fontsize;
      return 0;
    });
  }

  zoomInOn(node) {
    const zoomFactor = node.zoomFactor = uiStore.svgWidth*0.5/node.orig_r;
    const translationVecX = node.translationVecX = uiStore.svgWidth*0.5 - zoomFactor*node.orig_x;
    const translationVecY = node.translationVecY = uiStore.svgWidth*0.5 - zoomFactor*node.orig_y;
    uiStore.data.nodes.map((node, index) => {
      node.x = zoomFactor*node.orig_x + translationVecX;
      node.y = zoomFactor*node.orig_y + translationVecY;
      node.r = zoomFactor*node.orig_r;
      node.selected = false;
      return 0;
    });
    uiStore.data.papers.map((paper, index) => {
      paper.x = zoomFactor*paper.orig_x + translationVecX;
      paper.y = zoomFactor*paper.orig_y + translationVecY;
      paper.width = zoomFactor*paper.orig_width;
      paper.height = zoomFactor*paper.orig_height;
      paper.fontsize = zoomFactor*paper.orig_fontsize;
      paper.selected = false;
      return 0;
    });
  }
}

let logicStore = window.logicStore = new LogicStore();

export default logicStore;