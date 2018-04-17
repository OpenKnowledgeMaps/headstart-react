import { action } from 'mobx';

/**
 * If vis is in zoomed-in state, zooms out and resets all flags;
 * @param store - The UI Store;
 */
function onSVGClick(store) {
  let {bubblesStore, papersStore, forceSimIsDone} = store;
  if (store.isZoomed && !bubblesStore.hasHoverEntities && !papersStore.hasHoverEntities) {
    let node = store.bubblesStore.selectedEntities[0];
    store.resetZoomState(() => {
      store.isZoomed = false;
      resetZIndices(store);
      bubblesStore.selectedArea = null;
      papersStore.selectedArea = null;
      papersStore.clickedEntity = null;
      papersStore.listVisiblePapers = store.papersStore.entities;
    }, node);
  }
}

const resetZIndices = action(({bubblesStore, papersStore}) => {
  bubblesStore.entities.filter((bubble) => bubble.zIndex !== 1).forEach((bubble) => bubble.zIndex = 1);
  papersStore.entities.filter((paper) => paper.zIndex !== 0).forEach((paper) => paper.zIndex = 0);
});

/**
 * Resets active Flags on papersStore and bubblsStore
 * @param bubblesStore - The bubblesStore
 * @param papersStore - The papersStore
 * @param forceSimIsDone - The UI Store's forceSimIsDone flag
 */
function onSVGMouseOver(store) {
  const { bubblesStore, papersStore, forceSimIsDone } = store;
    if (!papersStore.hasHoverEntities &&
        !bubblesStore.hasHoverEntities &&
        !store.isZoomed &&
        forceSimIsDone ) {
      resetZIndices(store);
      papersStore.activeArea = null;
      bubblesStore.activeArea = null;
    }
}

export {onSVGClick, onSVGMouseOver, resetZIndices};