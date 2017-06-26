/**
 * Created by rbachleitner on 6/26/17.
 */
import uiStore from './UIStore';

function onPaperMouseEnter(paper) {
  if (uiStore.forceSimIsDone) {
    const paperZoomFactor = uiStore.paperZoomFactor
    if (!paper.zoomed && paper.selected) {
      paper.width = paper.width * paperZoomFactor;
      paper.height = paper.height * paperZoomFactor;
      paper.fontsize = paper.fontsize * paperZoomFactor;
      paper.zoomed = true;
    }
    if (!paper.hover) {
      paper.hover = true;
    }
  }
}

function onPaperMouseLeave(paper) {
  if (uiStore.forceSimIsDone) {
    const paperZoomFactor = uiStore.paperZoomFactor;
    if (paper.zoomed && paper.selected) {
      paper.width = paper.width / paperZoomFactor;
      paper.height = paper.height / paperZoomFactor;
      paper.fontsize = paper.fontsize / paperZoomFactor;
      paper.zoomed = false;
    }
    if (paper.hover) {
      paper.hover = false;
    }
  }
}

export {onPaperMouseLeave, onPaperMouseEnter};