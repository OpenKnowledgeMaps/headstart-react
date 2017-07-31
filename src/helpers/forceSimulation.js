import {forceSimulation, forceCollide, forceManyBody, forceCenter} from 'd3-force';
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
    paper.x = bubbleX + ratio*distX - paper.width*0.5;
    paper.y = bubbleY + ratio*distY - paper.height*0.5;
  });
}

function  startForceSim(store, callback) {
    const {
      collisionForceRadius,
      bubblesAlphaMin,
      manyBodyForceStrength
    } = store.config.forceSimParameters;
    const {
      svgWidth,
      svgHeight
    } = store;
    let {
      areas,
      bubblesStore,
      papersStore
    } = store;

    let counter = 0;

    const bubbleCollisionForce = forceCollide(collisionForceRadius)
      .radius((node) => node.r*1.05);
    const bubbleManyBodyForce = forceManyBody()
      .strength(manyBodyForceStrength);
    const bubbleCenterForce = forceCenter(svgWidth * 0.5, svgHeight * 0.5);

    forceSimulation()
      .nodes(bubblesStore.entities)
      .alphaMin(bubblesAlphaMin)
      .force("charge", bubbleManyBodyForce)
      .force("center", bubbleCenterForce)
      .force("collision", bubbleCollisionForce)
      .on('end', () => {

        areas.forEach((area) => {
          const bubble = bubblesStore.entities.find((node) => node.area === area);
          let bubbleX = bubble.x;
          let bubbleY = bubble.y;
          let bubbleRadius = bubble.r;
          const paperCollisionRadius =
            Math.sqrt(
              Math.pow(papersStore.entities[0].width,2) +
              Math.pow(papersStore.entities[0].height,2))
            *0.6;

          let papersInArea = papersStore.entitiesInArea(area);

          movePapersIntoBubble(papersInArea, bubbleX, bubbleY, bubbleRadius);

          forceSimulation()
            .nodes(papersInArea)
            .alphaDecay(0.5)
            .force("collision", forceCollide(paperCollisionRadius))
            .force("bubble", bubbleForce(bubbleX, bubbleY, bubbleRadius))
            .on('tick', () => {store.progress += (100/150.);})
            .on('end', () => {
              counter += 1;
              movePapersIntoBubble(papersInArea, bubbleX, bubbleY, bubbleRadius);
              if(counter === areas.length) {
                callback(store);
              }
            });

        });
      });
}

export {startForceSim};