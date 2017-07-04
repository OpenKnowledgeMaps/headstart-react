function onBubbleClick(store, node) {
  if (store.forceSimIsDone) {
    store.bubblesStore.selectedArea = node.area;
    store.papersStore.selectedArea = node.area;
    store.papersStore.clickedEntity = null;
  }
}

function onBubbleDoubleClick(store)
{
  if (store.forceSimIsDone) {
    store.bubblesStore.selectedArea = null;
    store.papersStore.selectedArea = null;
    store.papersStore.listVisiblePapers = store.papersStore.entities;
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