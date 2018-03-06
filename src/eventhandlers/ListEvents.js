function onListClick(paper, store) {
  if (paper.clicked)
    window.open(paper.oa_link, "_blank");
  else {
    store.papersStore.clickedEntity = paper;
    store.papersStore.selectedArea = paper.area;
    store.bubblesStore.selectedArea = paper.area;
    if (!store.isZoomed) {
      store.updateZoomState(store.bubblesStore.selectedEntities[0]);
      store.isZoomed = true;
    }
  }
}

function toggleList(store) {
  store.displayList = !store.displayList;
}

export {onListClick, toggleList};
