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
      const node = store.bubblesStore.entities
        .filter((entity) => entity.area === paper.area)[0];
      store.updateZoomState(node, null, () => {
        store.isZoomed = true;
        store.bubblesStore.selectedArea = node.area;
        store.papersStore.selectedArea = node.area;
        store.papersStore.clickedEntity = null;
        store.bubblesStore.entitiesInArea(node.area).forEach((entity) => entity.zIndex = 4);
        store.papersStore.entitiesInArea(node.area).forEach((entity) => entity.zIndex = 5);
      });}
  }
}

export {onPaperMouseLeave, onPaperMouseEnter, onPaperClick};