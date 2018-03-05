/**
 * When hovering over a paper:
 * Checks whether the vis is in a zoomed in state;
 * If yes, sets zoomedPaper flag to this paper;
 * @param store
 * @param paper
 */
function onPaperMouseEnter(store, paper) {
  if (store.forceSimIsDone && store.isZoomed) {
    store.papersStore.zoomedPaper = paper;
  }
  store.papersStore.hoveredEntity = paper;
}

/**
 * Resets zoomedPaper flag for papersStore
 * @param store
 */
function onPaperMouseLeave(store) {
  if (store.forceSimIsDone && store.isZoomed) {
    store.papersStore.zoomedPaper = null;
  }
  store.papersStore.hoveredEntity = null;
}

/**
 * In zoomed in state: selects paper;
 * In zoomed out state: zooms in on bubble;
 * @param store
 * @param paper
 */
function onPaperClick(store, paper) {
  if (store.forceSimIsDone) {
    if (store.isZoomed) {
      store.papersStore.clickedEntity = paper;
    } else {
      store.bubblesStore.selectedArea = paper.area;
      store.papersStore.selectedArea = paper.area;
      store.updateZoomState(store.bubblesStore.selectedEntities[0])
      store.isZoomed = true;
    }
  }
}

export {onPaperMouseLeave, onPaperMouseEnter, onPaperClick};