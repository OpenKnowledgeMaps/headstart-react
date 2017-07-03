import {forceSimulation, forceCollide, forceManyBody, forceCenter, forceX, forceY} from 'd3-force';
import uiStore from './UIStore';

class LogicStore {

  startForceSim() {
    let saveCoords = this.saveInitialCoords.bind(this);

    forceSimulation()
      .nodes(uiStore.data.nodes)
      .alphaMin(uiStore.forceSimParameters.bubblesAlphaMin)
      .force("charge", forceManyBody().strength(uiStore.forceSimParameters.manyBodyForceStrength))
      .force("center", forceCenter(uiStore.svgWidth * 0.5, uiStore.svgHeight * 0.5))
      .force("collision", forceCollide(uiStore.forceSimParameters.collisionForceRadius))
      .on('end', () => {

        saveCoords();
        uiStore.data.areas.forEach((area) => {

          const alphaMin = uiStore.forceSimParameters.papersAlphaMin;
          let bubbleX = uiStore.data.nodes.find((node) => node.area === area).x - uiStore.bubbleCenterOffset;
          let bubbleY = uiStore.data.nodes.find((node) => node.area === area).y - uiStore.bubbleCenterOffset;

          forceSimulation()
            .alphaMin(alphaMin)
            .nodes(uiStore.papersStore.papers.filter((paper) => paper.area === area))
            .force("positioning", forceX(bubbleX).strength(uiStore.forceSimParameters.centerXForceStrength))
            .force("collision", forceCollide(uiStore.paperWidth - 3));

          forceSimulation()
            .alphaMin(alphaMin)
            .nodes(uiStore.papersStore.papers.filter((paper) => paper.area === area))
            .force("positioning", forceY(bubbleY).strength(uiStore.forceSimParameters.centerYForceStrength))
            .force("collision", forceCollide(uiStore.paperHeight - 12))
            .on('end', () => {
              uiStore.forceSimIsDone = true;
              saveCoords();
            });
        });
      });

  }

  onAppStart() {
    this.startForceSim();
  }

  saveInitialCoords() {
    uiStore.data.nodes.forEach((node) => {
      node.orig_x = node.x;
      node.orig_y = node.y;
      node.orig_r = node.r;
    });
    uiStore.papersStore.papers.forEach((paper) => {
      paper.orig_x = paper.x;
      paper.orig_y = paper.y;
    });
  }

  updateZoomState(node) {
    uiStore.zoomFactor = uiStore.svgWidth * 0.5 / node.orig_r;
    uiStore.translationVecX = uiStore.svgWidth * 0.5 - uiStore.zoomFactor * node.orig_x;
    uiStore.translationVecY = uiStore.svgHeight * 0.5 - uiStore.zoomFactor * node.orig_y;
  }

  resetZoomState() {
    uiStore.zoomFactor = 1.;
    uiStore.translationVecX = 0.;
    uiStore.translationVecY = 0.;
  }
}

let logicStore = window.logicStore = new LogicStore();

export default logicStore;