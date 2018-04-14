/**
 * If vis is in zoomed-in state, zooms out and resets all flags;
 * @param store - The UI Store;
 */
function onSVGClick(store) {
  // console.log("DEBUG onSVGClick");
  // let {bubblesStore, papersStore, forceSimIsDone} = store;
  // if (store.isZoomed && !bubblesStore.hasHoverEntities) {
  //   debugger;
  //   let node = store.bubblesStore.selectedEntities[0];
  //   store.resetZoomState(() => {
  //     store.isZoomed = false;
  //     bubblesStore.selectedArea = null;
  //     papersStore.selectedArea = null;
  //     papersStore.clickedEntity = null;
  //     papersStore.listVisiblePapers = store.papersStore.entities;
  //   }, node);
  // }
  // if (forceSimIsDone) {
  //   const hoveringBubble = bubblesStore.hasHoverEntities;
  //   const hoveringPaper = papersStore.hasHoverEntities;
  //   const nodeSelected = bubblesStore.hasSelectedEntities;
  //   if (!hoveringBubble && !hoveringPaper && nodeSelected) {
  //     if (store.isZoomed) {
  //     }
  //   }
  // }
}

/**
 * Resets active Flags on papersStore and bubblsStore
 * @param bubblesStore - The bubblesStore
 * @param papersStore - The papersStore
 * @param forceSimIsDone - The UI Store's forceSimIsDone flag
 */
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