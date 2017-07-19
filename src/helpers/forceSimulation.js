import {forceSimulation, forceCollide, forceManyBody, forceCenter, forceX, forceY} from 'd3-force';
import bubbleForce from './bubbleForce';

function moveToCoord(paper, x_, y_, r_) {
  let {x, y, width, height} = paper;
  const mid = {x : x + 0.5*width, y: y + 0.5*height};
  const norm = Math.sqrt(Math.pow(x_ - mid.x,2) + Math.pow(y_ - mid.y,2));
  const transVec = {x : (mid.x - x_) / norm, y :  (mid.y - y_)/ norm};
  paper.x = x_ + r_*transVec.x;
  paper.y = y_ + r_*transVec.y;
}

function findCentroid(papers) {
  let x = 0;
  let y = 0;
  papers.forEach((paper) => {
    x += paper.x;
    y += paper.y;
  });
  x /= papers.length;
  y /= papers.length;
  return {x : x, y : y};
}

function moveCentroid(papers, bubbleX, bubbleY) {
  const centroid = findCentroid(papers);
  const centroidVec = {x: bubbleX - centroid.x, y: bubbleY - centroid.y};
  console.log("move by " + centroidVec.x);
  papers.forEach((paper) => {
    paper.x += 1.1*centroidVec.x;
    paper.y += 1.1*centroidVec.y;
  });
}

function movePapersIntoBubble(papers, bubbleX, bubbleY, bubbleRadius) {
  let maxPaperDistance = -1;
  let diag = 0;
  papers.forEach((paper) => {
    diag = Math.sqrt(Math.pow(paper.width, 2) + Math.pow(paper.height, 2))*0.7;
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
    let distance = Math.sqrt((bubbleX - paper.x)*(bubbleX - paper.x) + (bubbleY - paper.y)*(bubbleY - paper.y));
    moveToCoord(paper, bubbleX, bubbleY, ratio*distance);
  });

  const centroid = findCentroid(papers);
  const centroidVec = {x: bubbleX - centroid.x, y: bubbleY - centroid.y};

  papers.forEach((paper) => {
    paper.x += 1.1*centroidVec.x;
    paper.y += 1.1*centroidVec.y;
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
    store.initCoords(store.svgWidth);
    forceSimulation()
      .nodes(store.bubblesStore.entities)
      .alphaMin(store.forceSimParameters.bubblesAlphaMin)
      .force("charge", forceManyBody().strength(store.forceSimParameters.manyBodyForceStrength))
      .force("center", forceCenter(store.svgWidth * 0.5, store.svgHeight * 0.5))
      .force("collision", forceCollide(store.forceSimParameters.collisionForceRadius))
      .on('end', () => {

        store.data.areas.forEach((area) => {
          const alphaMin = store.forceSimParameters.papersAlphaMin;
          const bubble = store.bubblesStore.entities.find((node) => node.area === area);
          let bubbleX = bubble.x - store.bubbleCenterOffset;
          let bubbleY = bubble.y - store.bubbleCenterOffset;
          let bubbleRadius = bubble.r;
          const paperCollisionRadius = Math.sqrt(Math.pow(store.paperWidth,2) + Math.pow(store.paperHeight,2))*0.8;
          let papersInArea = store.papersStore.entitiesInArea(area);

          // movePapersIntoBubble(papersInArea, bubbleX, bubbleY, bubbleRadius*3.);

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
