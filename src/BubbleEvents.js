/**
 * Created by rbachleitner on 6/26/17.
 */
import uiStore from './UIStore';

function onBubbleClick(node)
{
  if (uiStore.forceSimIsDone) {
    if (node.selected === false) {
      uiStore.data.nodes.forEach((node) => node.selected = false);
      node.selected = true;
      uiStore.papersStore.selectedArea = node.area;
    }
    else
    {
      uiStore.papersStore.clickedPaper = null;
    }
  }
}

function onBubbleDoubleClick(node)
{
  if (uiStore.forceSimIsDone && node.selected === true) {
    node.selected = false;
    uiStore.papersStore.papers
      .forEach( (paper) => {
        paper.selected = false;
        paper.listvisible = true;
      });
  }
}

function onBubbleMouseEnter(node) {
  if (uiStore.forceSimIsDone) {
    uiStore.data.nodes.forEach((node) => node.active = false);
    uiStore.data.nodes.forEach((node) => node.hover = false);
    node.hover = true;
    node.active = true;
    uiStore.papersStore.activeArea = node.area;
    uiStore.papersStore.papers.forEach((paper) => paper.hover = false);
  }
}

function onBubbleMouseLeave(node) {
  if (uiStore.forceSimIsDone) {
    node.hover = false;
  }
}

export {onBubbleClick, onBubbleMouseEnter, onBubbleMouseLeave, onBubbleDoubleClick};