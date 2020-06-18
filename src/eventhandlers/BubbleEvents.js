/**
 * Checks whether a clicked Bubble should be zoomed in on.
 * If yes, update state.
 * @param store - The UI store
 * @param node - The clicked Bubble
 */
function onBubbleClick(store, node) {
  if (store.animationLock) {
    return;
  }
  if (store.forceSimIsDone && !node.selected) {
    let prevNode = store.bubblesStore.selectedEntities[0];
    store.bubblesStore.selectedArea = node.area;
    store.papersStore.selectedArea = node.area;
    store.papersStore.clickedEntity = null;
    store.updateZoomState(node, prevNode);
    if (!store.isZoomed) {
      store.isZoomed = true;
    }
  }
  if (node.selected) {
    store.papersStore.clickedEntity = null;
  }
}

/**
 * Checks whether a double clicked Bubble should
 * trigger zooming out; If yes, sets bubble/paper flags &
 * resets zoom state
 * @param store - The UI Store
 * @param node - The double clicked bubble
 */
function onBubbleDoubleClick(store, node) {
  if (store.animationLock) {
    return;
  }
  if (store.forceSimIsDone && store.isZoomed) {
      store.bubblesStore.selectedArea = null;
      store.papersStore.selectedArea = null;
      store.papersStore.listVisiblePapers = store.papersStore.entities;
      store.resetZoomState(() => {
        store.isZoomed = false;
      }, node);
  }
}

/**
 * Modifies state according to which bubble/paper the user hovers over;
 * @param store - The UI store
 * @param node - The hovered over bubble
 */
function onBubbleMouseEnter(store, node) {
  if (!store.forceSimIsDone || store.animationLock) {
    return;
  }
  
  store.bubblesStore.hoveredEntity = node;
  store.papersStore.hoveredEntity = null;
  if (!store.bubblesStore.hasSelectedEntities) {
    store.bubblesStore.activeArea = node.area;
    store.papersStore.activeArea = node.area;
  }
}

/**
 * Resets the hoveredEntity flag
 * @param store - The UI Store
 */
function onBubbleMouseLeave(store) {
  if (!store.forceSimIsDone || store.animationLock) {
    return;
  }

  store.bubblesStore.hoveredEntity = null;
}

export {onBubbleClick, onBubbleMouseEnter, onBubbleMouseLeave, onBubbleDoubleClick};