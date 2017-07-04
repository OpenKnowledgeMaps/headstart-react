import {forceSimulation, forceCollide, forceManyBody, forceCenter, forceX, forceY} from 'd3-force';

class LogicStore {

  startForceSim(store) {
    let saveCoords = this.saveInitialCoords.bind(this, store);

    forceSimulation()
      .nodes(store.bubblesStore.entities)
      .alphaMin(store.forceSimParameters.bubblesAlphaMin)
      .force("charge", forceManyBody().strength(store.forceSimParameters.manyBodyForceStrength))
      .force("center", forceCenter(store.svgWidth * 0.5, store.svgHeight * 0.5))
      .force("collision", forceCollide(store.forceSimParameters.collisionForceRadius))
      .on('end', () => {

        saveCoords();
        store.data.areas.forEach((area) => {

          const alphaMin = store.forceSimParameters.papersAlphaMin;
          let bubbleX = store.bubblesStore.entities.find((node) => node.area === area).x - store.bubbleCenterOffset;
          let bubbleY = store.bubblesStore.entities.find((node) => node.area === area).y - store.bubbleCenterOffset;

          forceSimulation()
            .alphaMin(alphaMin)
            .nodes(store.papersStore.entitiesInArea(area))
            .force("positioning", forceX(bubbleX).strength(store.forceSimParameters.centerXForceStrength))
            .force("collision", forceCollide(store.paperWidth - 3));

          forceSimulation()
            .alphaMin(alphaMin)
            .nodes(store.papersStore.entitiesInArea(area))
            .force("positioning", forceY(bubbleY).strength(store.forceSimParameters.centerYForceStrength))
            .force("collision", forceCollide(store.paperHeight - 12))
            .on('end', () => {
              store.forceSimIsDone = true;
              saveCoords();
            });
        });
      });

  }

  onAppStart(store) {
    this.startForceSim(store);
  }

  saveInitialCoords(store) {
    store.bubblesStore.entities.forEach((node) => {
      node.orig_x = node.x;
      node.orig_y = node.y;
      node.orig_r = node.r;
    });
    store.papersStore.entities.forEach((paper) => {
      paper.orig_x = paper.x;
      paper.orig_y = paper.y;
    });
  }

  updateZoomState(node, store) {
    store.zoomFactor = store.svgWidth * 0.5 / node.orig_r;
    store.translationVecX = store.svgWidth * 0.5 - store.zoomFactor * node.orig_x;
    store.translationVecY = store.svgHeight * 0.5 - store.zoomFactor * node.orig_y;
  }

  resetZoomState(store) {
    store.zoomFactor = 1.;
    store.translationVecX = 0.;
    store.translationVecY = 0.;
  }
}

let logicStore = window.logicStore = new LogicStore();

export default logicStore;