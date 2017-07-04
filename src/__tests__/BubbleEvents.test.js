/**
 * Created by rbachleitner on 7/4/17.
 */
import data from '../static/Data.js';
import UIStore from '../models/UIStore';
import logicStore from '../models/logicStore';
import {onBubbleClick, onBubbleMouseEnter, onBubbleMouseLeave, onBubbleDoubleClick} from '../models/BubbleEvents';

let store = null;
let node = null;

// initialize uistore with test data
beforeEach(() => {
  store = new UIStore(data);
  store.disposer();
  store.papersStore.disposer();
  logicStore.onAppStart(store);
  node = store.bubblesStore.entities[0];
});

describe('onBubbleClick', () => {

  test(' selects an area if forceSim is done', () => {
    store.forceSimIsDone = true;
    expect(store.papersStore.hasSelectedEntities).toBeFalsy();
    expect(store.bubblesStore.hasSelectedEntities).toBeFalsy();
    onBubbleClick(store, node);
    expect(store.papersStore.hasSelectedEntities).toEqual(true);
    expect(store.bubblesStore.hasSelectedEntities).toEqual(true);
  });

  test(' resets clicked Flags so there are no more of them', () => {
    store.forceSimIsDone = true;
    store.papersStore.entities[0].clicked = true;
    expect(store.papersStore.entities.some((entity) => entity.clicked === true)).toBeTruthy();
    onBubbleClick(store, node);
    expect(store.papersStore.entities.some((entity) => entity.clicked === true)).toBeFalsy();
  });

});

describe('onBubbleDoubleClick', () => {

});
