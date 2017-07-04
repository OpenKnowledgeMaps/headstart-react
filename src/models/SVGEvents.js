function onSVGClick({bubblesStore, papersStore, forceSimIsDone}) {
  if (forceSimIsDone) {
    const hoveringBubble = bubblesStore.hasHoverEntities;
    const hoveringPaper = papersStore.hasHoverEntities;
    const nodeSelected = bubblesStore.hasSelectedEntities;
    if (!hoveringBubble && !hoveringPaper && nodeSelected) {
      bubblesStore.selectedArea = null;
      papersStore.selectedArea = null;
      papersStore.clickedEntity = null;
      papersStore.listVisiblePapers = papersStore.entities;
    }
  }
}

function onSVGMouseOver({bubblesStore, papersStore, forceSimIsDone}) {
  if (forceSimIsDone) {
    if (!papersStore.hasHoverEntities &&
        !bubblesStore.hasHoverEntities ) {
      papersStore.activeArea = null;
      bubblesStore.activeArea = null;
    }
  }
}

export {onSVGClick, onSVGMouseOver};