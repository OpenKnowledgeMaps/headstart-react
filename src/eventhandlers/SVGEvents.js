/**
 * If vis is in zoomed-in state, zooms out and resets all flags;
 * @param store - The UI Store;
 */
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
      }
    }
  }
}

/**
 * Resets active Flags on papersStore and bubblsStore
 * @param bubblesStore - The bubblesStore
 * @param papersStore - The papersStore
 * @param forceSimIsDone - The UI Store's forceSimIsDone flag
 */
function onSVGMouseOver({bubblesStore, papersStore, forceSimIsDone, animationLock}) {
  if (forceSimIsDone && !animationLock) {
    if (!papersStore.hasHoverEntities &&
        !bubblesStore.hasHoverEntities ) {
      papersStore.activeArea = null;
      bubblesStore.activeArea = null;
    }
  }
}

export {onSVGClick, onSVGMouseOver};