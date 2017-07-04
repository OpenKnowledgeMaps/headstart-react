function onPaperMouseEnter(store, paper) {
  if (store.forceSimIsDone && store.isZoomed) {
    store.papersStore.zoomedPaper = paper;
  }
  store.papersStore.hoveredEntity = paper;
}

function onPaperMouseLeave(store) {
  if (store.forceSimIsDone && store.isZoomed) {
    store.papersStore.zoomedPaper = null;
  }
  store.papersStore.hoveredEntity = null;
}

function onPaperClick(store, paper) {
  if (store.forceSimIsDone) {
    if (store.isZoomed) {
      store.papersStore.clickedEntity = paper;
    } else {
      store.bubblesStore.selectedArea = paper.area;
      store.papersStore.selectedArea = paper.area;
    }
  }
}

export {onPaperMouseLeave, onPaperMouseEnter, onPaperClick};