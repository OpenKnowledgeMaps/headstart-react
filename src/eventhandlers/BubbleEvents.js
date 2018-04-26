import { action } from 'mobx';
import { resetZIndices } from "./SVGEvents";

function clearSelection() {
  if(document.selection && document.selection.empty) {
    document.selection.empty();
  } else if(window.getSelection) {
    var sel = window.getSelection();
    sel.removeAllRanges();
  }
}

const updateZIndices = action((store, area) => {
  store.bubblesStore.entitiesOutsideArea(area).forEach((entity) => entity.zIndex = 2);
  store.papersStore.entitiesOutsideArea(area).forEach((entity) => entity.zIndex = 3);
  store.bubblesStore.entitiesInArea(area).forEach((entity) => entity.zIndex = 4);
  store.papersStore.entitiesInArea(area).forEach((entity) => entity.zIndex = 5);
});

/**
 * Checks whether a clicked Bubble should be zoomed in on.
 * If yes, update state.
 * @param store - The UI store
 * @param node - The clicked Bubble
 */
function onBubbleClick(store, node) {
  console.log("DEBUG onBubbleClick");
  store.papersStore.clickedEntity = null;
  if (store.forceSimIsDone && !node.selected && !store.papersStore.hasHoverEntities) {
    store.papersStore.selectedArea = node.area;
    store.bubblesStore.selectedArea = node.area;
    store.animationLock = true;
    store.updateZoomState(node, () => {
      store.isZoomed = true;
      store.papersStore.clickedEntity = null;
      store.papersStore.listVisiblePapers = store.papersStore.entitiesInArea(node.area);
      updateZIndices(store, node.area);
    });
  }
}

const resetBubblesAndPapers = action((store) => {
  let {bubblesStore, papersStore, forceSimIsDone} = store;
  store.isZoomed = false;
  papersStore.selectedArea = null;
  bubblesStore.selectedArea = null;
  bubblesStore.activeArea = null;
  papersStore.activeArea = null;
  papersStore.clickedEntity = null;
  papersStore.listVisiblePapers = store.papersStore.entities;
});

/**
 * Checks whether a double clicked Bubble should
 * trigger zooming out; If yes, sets bubble/paper flags &
 * resets zoom state
 * @param store - The UI Store
 * @param node - The double clicked bubble
 */
const onBubbleDoubleClick = (store, node) => (event)  =>
{
  if (store.isZoomed && !store.papersStore.hasHoverEntities) {
    store.papersStore.entities.forEach((entity) => entity.zIndex = 1);
    store.bubblesStore.entities.forEach((entity) => entity.zIndex = 2);
    resetBubblesAndPapers(store);
    clearSelection();
    setTimeout(() => {
      store.resetZoomState(() => {
      })
    },50);
  }
};

/**
 * Modifies state according to which bubble/paper the user hovers over;
 * @param store - The UI store
 * @param node - The hovered over bubble
 */
const onBubbleMouseEnter = action((store, node) => {
  if (!store.animationLock) {
    store.bubblesStore.hoveredEntity = node;
    store.papersStore.hoveredEntity = null;
      if (!store.bubblesStore.hasSelectedEntities) {
        store.bubblesStore.activeArea = node.area;
        store.papersStore.activeArea = node.area;
        resetZIndices(store);
        store.bubblesStore.entitiesInArea(node.area).forEach((entity) => entity.zIndex = 2);
        store.papersStore.entitiesInArea(node.area).forEach((entity) => entity.zIndex = 3);
      }
    }
});

/**
 * Resets the hoveredEntity flag
 * @param store - The UI Store
 */
function onBubbleMouseLeave(store) {
  if (store.forceSimIsDone && !store.animationLock) {
    store.bubblesStore.hoveredEntity = null;
  }
}

export {onBubbleClick, onBubbleMouseEnter, onBubbleMouseLeave, onBubbleDoubleClick, resetBubblesAndPapers, updateZIndices};