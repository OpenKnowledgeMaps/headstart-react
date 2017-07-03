/**
 * Created by rbachleitner on 6/26/17.
 */

function onPaperMouseEnter(store, paper) {
  if (store.forceSimIsDone && store.isZoomed) {
    store.papersStore.zoomedPaper = paper;
  }
  store.papersStore.hoveredPaper = paper;
}

function onPaperMouseLeave(store, paper) {
  if (store.forceSimIsDone && store.isZoomed) {
    store.papersStore.zoomedPaper = null;
  }
  store.papersStore.hoveredPaper = null;
}

function onPaperClick(store, paper) {
  if (store.forceSimIsDone) {
    if (store.isZoomed) {
      store.papersStore.clickedPaper = paper;
    } else {
      store.nodesStore.selectedArea = paper.area;
      store.papersStore.selectedArea = paper.area;
    }
  }
}

export {onPaperMouseLeave, onPaperMouseEnter, onPaperClick};