import {forceSimulation, forceCollide, forceManyBody, forceCenter, forceX, forceY} from 'd3-force';
import uiStore from './UIStore';

class LogicStore {
  onBubbleClick(node) {
    if (node.selected === false) {
      this.zoomInOn(node);
      node.selected = true;
      uiStore.data.papers
        .filter((paper) => paper.area === node.area)
        .map( (paper) => paper.active = true )
    }
    else
    {
      this.resetCoords();
      node.selected = false;
      uiStore.data.papers
        .filter((paper) => paper.area === node.area)
        .map( (paper) => paper.active = false )
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
    uiStore.data.papers
      .filter((paper) => paper.area === node.area)
      .map( (paper) => paper.active = true )
  }

  onBubbleMouseOut(node) {
    node.hover = false;
    uiStore.data.papers
      .filter((paper) => paper.area === node.area)
      .map( (paper) => paper.active = false )
  }

  startForceSim() {
    let saveCoords = this.saveInitialCoords.bind(this);
    forceSimulation()
      .nodes(uiStore.data.nodes)
      .alphaMin(0.3)
      .force("charge", forceManyBody().strength(1000))
      .force("center", forceCenter(450, 450))
      .force("collision", forceCollide(100))
      .on('end', () => {
        console.log('Force Simulation Done');
        saveCoords();
        uiStore.data.areas.map((area) => {
          const alphaMin = 0.6;
          let bubbleX = uiStore.data.nodes.find((node) => node.area === area).x - 20;
          let bubbleY = uiStore.data.nodes.find((node) => node.area === area).y - 20;
          forceSimulation()
            .alphaMin(alphaMin)
            .nodes(uiStore.data.papers.filter((paper) => paper.area === area))
            .force("positioning", forceX(bubbleX).strength(0.5))
            .force("collision", forceCollide(15))
            .on('tick', () => {
              saveCoords();
            });
          forceSimulation()
            .alphaMin(alphaMin)
            .nodes(uiStore.data.papers.filter((paper) => paper.area === area))
            .force("positioning", forceY(bubbleY).strength(0.5))
            // .force("center", forceCenter(bubbleX, bubbleY))
            .force("collision", forceCollide(25))
            .on('tick', () => {
              saveCoords();
            });
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