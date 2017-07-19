import {forceSimulation, forceCollide, forceManyBody, forceCenter, forceX, forceY} from 'd3-force';
import bubbleForce from './bubbleForce';

function movePapersIntoBubble(papers, bubbleX, bubbleY, bubbleRadius) {
  let maxPaperDistance = -1;
  let diag = 0;
  papers.forEach((paper) => {
    diag = Math.sqrt(Math.pow(paper.width, 2) + Math.pow(paper.height, 2))*0.5;
    const midpoint = {x: (paper.x+paper.width*0.5), y: (paper.y+paper.height*0.5)};
    const distX = (midpoint.x - bubbleX);
    const distY = (midpoint.y - bubbleY);
    const distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
    maxPaperDistance = Math.max(
      distance,
      maxPaperDistance);
  });
  const ratio = (bubbleRadius - diag)/(maxPaperDistance);
  papers.forEach((paper) => {
    const midpoint = {x: (paper.x+paper.width*0.5), y: (paper.y+paper.height*0.5)};
    const distX = (midpoint.x - bubbleX);
    const distY = (midpoint.y - bubbleY);
    const distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
    paper.x = bubbleX + ratio*distX - paper.width*0.5;
    paper.y = bubbleY + ratio*distY - paper.height*0.5;
  });
}

function areInBubble(papers, bubbleX, bubbleY, bubbleRadius) {
  let inBubble = true;
  papers.forEach((paper) => {
    const diag = Math.sqrt(Math.pow(paper.width, 2) + Math.pow(paper.height, 2))*0.5;
    const midpoint = {x: (paper.x+paper.width*0.5), y: (paper.y+paper.height*0.5)};
    const distX = (midpoint.x - bubbleX);
    const distY = (midpoint.y - bubbleY);
    const distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
    if ((0.99*bubbleRadius - distance) < diag) {
      inBubble = false;
    }
  });
  return inBubble;
}

function  startForceSim(store) {
    let counter = 0;
    let bubbleCollisionForce = forceCollide(store.forceSimParameters.collisionForceRadius);
    bubbleCollisionForce.radius((node) => node.r*1.05);
    store.initCoords(store.svgWidth);
    forceSimulation()
      .nodes(store.bubblesStore.entities)
      .alphaMin(store.forceSimParameters.bubblesAlphaMin)
      .force("charge", forceManyBody().strength(store.forceSimParameters.manyBodyForceStrength))
      .force("center", forceCenter(store.svgWidth * 0.5, store.svgHeight * 0.5))
      .force("collision", bubbleCollisionForce)
      .on('end', () => {

        store.data.areas.forEach((area) => {
          const alphaMin = store.forceSimParameters.papersAlphaMin;
          const bubble = store.bubblesStore.entities.find((node) => node.area === area);
          let bubbleX = bubble.x - store.bubbleCenterOffset;
          let bubbleY = bubble.y - store.bubbleCenterOffset;
          let bubbleRadius = bubble.r;
          const paperCollisionRadius = Math.sqrt(Math.pow(store.paperWidth,2) + Math.pow(store.paperHeight,2))*0.6;
          let papersInArea = store.papersStore.entitiesInArea(area);

          movePapersIntoBubble(papersInArea, bubbleX, bubbleY, bubbleRadius);

          let papersForceSim = forceSimulation()
            // .alphaMin(alphaMin)
            .nodes(papersInArea)
            // .alpha(1)
            .alphaDecay(0.5)
            .force("collision", forceCollide(paperCollisionRadius))
            // .force("center", forceCenter(bubbleX, bubbleY))
            .force("bubble", bubbleForce(bubbleX, bubbleY, bubbleRadius))
            .on('end', () => {
              // if(!areInBubble(papersInArea, bubbleX, bubbleY, bubbleRadius)) {
              //   movePapersIntoBubble(papersInArea, bubbleX, bubbleY, bubbleRadius);
              // }
              counter += 1;
              if(counter === store.data.areas.length) {
                store.bubblesStore.saveAllCoordsToOriginalCoords();
                store.papersStore.saveAllCoordsToOriginalCoords();
                const headstartContainer = window.document.querySelector(".vis-col");
                store.updateChartSize(headstartContainer.clientWidth, store.forceSimIsDone);
                store.forceSimIsDone = true;
              }
            });

        });
      });
}

export {startForceSim};





/// ALTERNATIVE PAPERLAYOUT
//

//
//
