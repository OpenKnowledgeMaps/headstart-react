/**
 * Created by rbachleitner on 6/26/17.
 */
import uiStore from './UIStore';

function onPaperMouseEnter(paper) {
  if (uiStore.forceSimIsDone && paper.selected) {
    paper.zoomed = true;
  }
  paper.hover = true;
}

function onPaperMouseLeave(paper) {
  if (uiStore.forceSimIsDone && paper.selected) {
    paper.zoomed = false;
  }
  paper.hover = false;
}

function onPaperClick(paper) {
  let node = uiStore.data.nodes.find((node) => node.area === paper.area);
  if (uiStore.forceSimIsDone) {
    if (node.selected === true) {
      uiStore.papersStore.clickedPaper = paper;
    }
    if (node.selected === false && paper.selected === false) {
      node.selected = true;
      uiStore.papersStore.selectedArea = (paper.area);
    }
  }
}

export {onPaperMouseLeave, onPaperMouseEnter, onPaperClick};