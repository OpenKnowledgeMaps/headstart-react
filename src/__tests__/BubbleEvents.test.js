import data from '../static/Data.js';
import UIStore from '../models/UIStore';
import { startForceSim } from '../helpers/forceSimulation';
import {onBubbleClick, onBubbleMouseEnter, onBubbleMouseLeave, onBubbleDoubleClick} from '../eventhandlers/BubbleEvents';

let store = null;
let node = null;

// initialize uistore with test data
beforeEach(() => {
  store = new UIStore(data);
  store.disposer();
  store.papersStore.disposer();
  startForceSim(store);
  node = store.bubblesStore.entities[0];
  store.forceSimIsDone = true;
});

describe('onBubbleClick', () => {

  test(' selects an area if forceSim is done', () => {
    expect(store.papersStore.hasSelectedEntities).toBeFalsy();
    expect(store.bubblesStore.hasSelectedEntities).toBeFalsy();
    onBubbleClick(store, node);
    expect(store.papersStore.hasSelectedEntities).toEqual(true);
    expect(store.bubblesStore.hasSelectedEntities).toEqual(true);
  });

  test(' resets clicked Flags so there are no more of them', () => {
    store.papersStore.entities[0].clicked = true;
    expect(store.papersStore.entities.some((entity) => entity.clicked === true)).toBeTruthy();
    onBubbleClick(store, node);
    expect(store.papersStore.entities.some((entity) => entity.clicked === true)).toBeFalsy();
  });

});

describe('onBubbleDoubleClick', () => {

  test(' resets selected flags', () => {
    store.papersStore.selectedArea = store.papersStore.entities[0].area;
    store.bubblesStore.selectedArea = store.papersStore.entities[0].area;
    expect(store.bubblesStore.hasSelectedEntities).toBeTruthy();
    expect(store.papersStore.hasSelectedEntities).toBeTruthy();
    onBubbleDoubleClick(store, node);
    expect(store.bubblesStore.hasSelectedEntities).toBeFalsy();
    expect(store.papersStore.hasSelectedEntities).toBeFalsy();
  });

  test(' makes all paper entities listvisible again', () => {
    store.papersStore.entities.forEach((entity) => entity.listvisible = false);
    expect(store.papersStore.entities.some((entity) => entity.listvisible)).toBeFalsy();
    onBubbleDoubleClick(store, node);
    expect(store.papersStore.entities.reduce((sum, entity) => sum && entity.listvisible), true).toBeTruthy();
  })

});

describe('onBubbleMouseEnter', ()  => {

  test(' sets hover flag for the bubble the mouse is hovering over', () => {
    expect(store.bubblesStore.hasHoverEntities).toBeFalsy();
    expect(store.papersStore.hasHoverEntities).toBeFalsy();
    onBubbleMouseEnter(store, node);
    expect(store.papersStore.hasHoverEntities).toBeFalsy();
    expect(store.bubblesStore.hoverEntities.length).toBe(1);
  });

  test(' makes bubble area active if there are no selected bubbles', () => {
    expect(store.bubblesStore.hasSelectedEntities).toBeFalsy();
    onBubbleMouseEnter(store, node);
    expect(store.papersStore.entities
      .filter((paper) => paper.active)
      .reduce((sum, entity) => sum && (entity.area === node.area)), true).toBeTruthy();
    expect(store.bubblesStore.entities
      .filter((paper) => paper.active)
      .reduce((sum, entity) => sum && (entity.area === node.area)), true).toBeTruthy();
  });

  test(' doesnt make area active if there area selected papers and bubbles', () => {
    store.bubblesStore.selectedArea = node.area;
    store.papersStore.selectedArea = node.area;
    expect(store.bubblesStore.hasSelectedEntities).toBeTruthy();
    expect(store.papersStore.hasSelectedEntities).toBeTruthy();
    onBubbleMouseEnter(store, node);
    expect(store.papersStore.entities
      .filter((paper) => paper.active).length).toBe(0);
    expect(store.bubblesStore.entities
      .filter((bubble) => bubble.active).length).toBe(0);
  })
});

describe('onBubbleMouseLeave', () => {
  test(' resets all hover on bubbles flags', () => {
    store.bubblesStore.entities.forEach((entity) => entity.hover = true);
    expect(store.bubblesStore.hasHoverEntities).toBeTruthy();
    onBubbleMouseLeave(store);
    expect(store.bubblesStore.hasHoverEntities).toBeFalsy();
  });
});