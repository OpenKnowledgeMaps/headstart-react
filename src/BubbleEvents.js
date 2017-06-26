/**
 * Created by rbachleitner on 6/26/17.
 */
import uiStore from './UIStore';
import logicStore from './logicStore';

function onBubbleClick(node)
{
  if (uiStore.forceSimIsDone) {
    if (node.selected === false) {
      logicStore.zoomInOn(node);
      node.selected = true;
      uiStore.data.papers
        .filter((paper) => paper.area === node.area)
        .map((paper) => paper.selected = true)
    }
  }
}

function onBubbleDoubleClick(node)
{
  logicStore.resetCoords();
  node.selected = false;
  uiStore.data.papers
    .filter((paper) => paper.area === node.area)
    .map( (paper) => paper.selected = false )
}

function onBubbleMouseEnter(node) {
  if (uiStore.forceSimIsDone) {
    uiStore.data.nodes.map((node) => node.active = false);
    uiStore.data.nodes.map((node) => node.hover = false);
    uiStore.data.papers.map((paper) => paper.active = false);
    node.hover = true;
    node.active = true;
    uiStore.data.papers.filter((paper) => paper.area === node.area)
      .map((paper) => paper.active = true);
    uiStore.data.papers.map((paper) => paper.hover = false);
  }
}

function onBubbleMouseLeave(node) {
  if (uiStore.forceSimIsDone) {
    node.hover = false;
  }
}

export {onBubbleClick, onBubbleMouseEnter, onBubbleMouseLeave, onBubbleDoubleClick};