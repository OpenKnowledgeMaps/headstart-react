/**
 * Created by rbachleitner on 7/4/17.
 */
import data from '../static/Data.js';
import UIStore from '../models/UIStore';
import {onBubbleClick, onBubbleMouseEnter, onBubbleMouseLeave, onBubbleDoubleClick} from '../models/BubbleEvents';

// initialize uistore with test data
beforeEach(() => {
  let store = new UIStore(data);
});
