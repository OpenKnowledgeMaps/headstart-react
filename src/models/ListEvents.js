function onListClick(paper, store) {
  if (paper.clicked)
    window.open(paper.oa_link, "_blank");
  else {
    store.papersStore.clickedEntity = paper;
    store.papersStore.selectedArea = paper.area;
    store.bubblesStore.selectedArea = paper.area;
  }
}

function toggleList(store) {
  store.displayList = !store.displayList;
}

export {onListClick, toggleList};
