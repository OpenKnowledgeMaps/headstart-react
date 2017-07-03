import uiStore from './UIStore';

function onSVGClick() {
  if (uiStore.forceSimIsDone) {
    const hoveringBubble = uiStore.nodesStore.hasHoverEntities;
    const hoveringPaper = uiStore.papersStore.hasHoverPapers;
    const nodeSelected = uiStore.nodesStore.hasSelectedEntities;
    if (!hoveringBubble && !hoveringPaper && nodeSelected) {
      uiStore.nodesStore.selectedArea = null;
      uiStore.papersStore.selectedArea = null;
      uiStore.papersStore.clickedPaper = null;
      uiStore.papersStore.listVisiblePapers = uiStore.papersStore.papers;
    }
  }
}

function onSVGMouseOver() {
  if (uiStore.forceSimIsDone) {
    if (!uiStore.papersStore.hasHoverPapers &&
        !uiStore.nodesStore.hasHoverEntities ) {
      uiStore.papersStore.activeArea = null;
      uiStore.nodesStore.activeArea = null;
    }
  }
}

export {onSVGClick, onSVGMouseOver};