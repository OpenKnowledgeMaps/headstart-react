function onSVGClick(store) {
  let {bubblesStore, papersStore, forceSimIsDone} = store;
  if (forceSimIsDone) {
    const hoveringBubble = bubblesStore.hasHoverEntities;
    const hoveringPaper = papersStore.hasHoverEntities;
    const nodeSelected = bubblesStore.hasSelectedEntities;
    if (!hoveringBubble && !hoveringPaper && nodeSelected) {
      if (store.isZoomed) {
        let node = store.bubblesStore.selectedEntities[0];
        bubblesStore.selectedArea = null;
        papersStore.selectedArea = null;
        papersStore.clickedEntity = null;
        papersStore.listVisiblePapers = store.papersStore.entities;
        store.resetZoomState(() => {
          store.isZoomed = false;
        }, node);
        store.isZoomed = false;
      }
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