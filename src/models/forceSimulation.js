import {forceSimulation, forceCollide, forceManyBody, forceCenter, forceX, forceY} from 'd3-force';

function  startForceSim(store) {

    forceSimulation()
      .nodes(store.bubblesStore.entities)
      .alphaMin(store.forceSimParameters.bubblesAlphaMin)
      .force("charge", forceManyBody().strength(store.forceSimParameters.manyBodyForceStrength))
      .force("center", forceCenter(store.svgWidth * 0.5, store.svgHeight * 0.5))
      .force("collision", forceCollide(store.forceSimParameters.collisionForceRadius))
      .on('end', () => {

        store.bubblesStore.saveAllCoordsToOriginalCoords();
        store.papersStore.saveAllCoordsToOriginalCoords();
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
              store.bubblesStore.saveAllCoordsToOriginalCoords();
              store.papersStore.saveAllCoordsToOriginalCoords();
            });
        });
      });

}

export {startForceSim};