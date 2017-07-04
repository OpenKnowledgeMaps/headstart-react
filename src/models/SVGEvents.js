import uiStore from './UIStore';

function onSVGClick() {
  if (uiStore.forceSimIsDone) {
    const hoveringBubble = uiStore.bubblesStore.hasHoverEntities;
    const hoveringPaper = uiStore.papersStore.hasHoverEntities;
    const nodeSelected = uiStore.bubblesStore.hasSelectedEntities;
    if (!hoveringBubble && !hoveringPaper && nodeSelected) {
      uiStore.bubblesStore.selectedArea = null;
      uiStore.papersStore.selectedArea = null;
      uiStore.papersStore.clickedEntity = null;
      uiStore.papersStore.listVisiblePapers = uiStore.papersStore.entities;
    }
  }
}

function onSVGMouseOver() {
  if (uiStore.forceSimIsDone) {
    if (!uiStore.papersStore.hasHoverEntities &&
        !uiStore.bubblesStore.hasHoverEntities ) {
      uiStore.papersStore.activeArea = null;
      uiStore.bubblesStore.activeArea = null;
    }
  }
}

export {onSVGClick, onSVGMouseOver};