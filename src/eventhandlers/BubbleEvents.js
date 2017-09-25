function onBubbleClick(store, node) {
  if (store.forceSimIsDone && !node.selected) {
    let prevNode = store.bubblesStore.selectedEntities[0];
    store.bubblesStore.selectedArea = node.area;
    store.papersStore.selectedArea = node.area;
    store.papersStore.clickedEntity = null;
    // store.updateZoomState(node, prevNode);
    if (!store.isZoomed) {
      store.isZoomed = true;
    }
  }
  if (node.selected) {
    store.papersStore.clickedEntity = null;
  }
}

function onBubbleDoubleClick(store, node)
{
  // event.preventDefault();
  if (store.forceSimIsDone && store.isZoomed) {
      store.bubblesStore.selectedArea = null;
      store.papersStore.selectedArea = null;
      store.papersStore.listVisiblePapers = store.papersStore.entities;
      store.resetZoomState(() => {
        store.isZoomed = false;
      }, node);
  }
}

function onBubbleMouseEnter(store, node) {
  if (store.forceSimIsDone) {
    store.bubblesStore.hoveredEntity = node;
    store.papersStore.hoveredEntity = null;
    if (!store.bubblesStore.hasSelectedEntities) {
      store.bubblesStore.activeArea = node.area;
      store.papersStore.activeArea = node.area;
    }
  }
}

function onBubbleMouseLeave(store) {
  if (store.forceSimIsDone) {
    store.bubblesStore.hoveredEntity = null;
  }
}

export {onBubbleClick, onBubbleMouseEnter, onBubbleMouseLeave, onBubbleDoubleClick};