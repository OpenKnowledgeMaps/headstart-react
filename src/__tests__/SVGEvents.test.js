import data from '../static/Data.js';
import UIStore from '../models/UIStore';
import logicStore from '../models/logicStore';
import {onSVGClick, onSVGMouseOver} from '../models/SVGEvents';

let store = null;
let node = null;

// initialize uistore with test data
beforeEach(() => {
  store = new UIStore(data);
  store.disposer();
  store.papersStore.disposer();
  logicStore.onAppStart(store);
  node = store.bubblesStore.entities[0];
  store.forceSimIsDone = true;
});

describe('onSVGClick', () => {
  test(' resets all selected flags', () => {
    store.bubblesStore.selectedArea = node.area;
    store.papersStore.selectedArea = node.area;
    expect(store.bubblesStore.hasSelectedEntities).toBeTruthy();
    expect(store.papersStore.hasSelectedEntities).toBeTruthy();
    onSVGClick(store);
    expect(store.bubblesStore.hasSelectedEntities).toBeFalsy();
    expect(store.papersStore.hasSelectedEntities).toBeFalsy();
  });

  test(' makes all papers listvisible again', () => {
    store.bubblesStore.selectedArea = node.area;
    store.papersStore.selectedArea = node.area;
    store.papersStore.entities.forEach((entity) => entity.listvisible = false);

    expect(store.bubblesStore.hasHoverEntities).toBeFalsy();
    expect(store.papersStore.hasHoverEntities).toBeFalsy();
    expect(store.bubblesStore.hasSelectedEntities).toBeTruthy();
    expect(store.papersStore.hasSelectedEntities).toBeTruthy();
    expect(store.papersStore.entities.some((paper) => paper.listvisible)).toBeFalsy();
    onSVGClick(store);
    expect(store.papersStore.entities.reduce((sum, paper) => sum && paper.listvisible), true).toBeTruthy();
  });

  test(' resets all clicked flags on papers', () => {
    store.bubblesStore.selectedArea = node.area;
    store.papersStore.selectedArea = node.area;
    store.papersStore.entities[0].clicked = true;
    expect(store.papersStore.entities.some((entity) => entity.clicked)).toBeTruthy();
    onSVGClick(store);
    expect(store.papersStore.entities.some((entity) => entity.clicked)).toBeFalsy();
  })
});

describe('onSVGMouseOver', () => {
  test(' resets all active flags', () => {
    store.papersStore.activeArea = node.area;
    store.bubblesStore.activeArea = node.area;
    expect(store.papersStore.hasActiveEntities).toBeTruthy();
    expect(store.bubblesStore.hasActiveEntities).toBeTruthy();
    expect(store.papersStore.hasHoverEntities).toBeFalsy();
    expect(store.bubblesStore.hasHoverEntities).toBeFalsy();
    onSVGMouseOver(store);
    expect(store.papersStore.hasActiveEntities).toBeFalsy();
    expect(store.bubblesStore.hasActiveEntities).toBeFalsy();
  });
});