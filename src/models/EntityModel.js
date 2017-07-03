/**
 * Created by rbachleitner on 7/3/17.
 */
/**
 * Created by rbachleitner on 6/29/17.
 */

import {extendObservable, autorun} from 'mobx';

class EntityModel {
  constructor(entity) {
    if (!entity.hasOwnProperty('active')) entity.active = false;
    if (!entity.hasOwnProperty('hover')) entity.hover = false;
    if (!entity.hasOwnProperty('selected')) entity.selected = false;
    if (!entity.hasOwnProperty('clicked')) entity.clicked = false;
    if (!entity.hasOwnProperty('area')) entity.area = "Default Area";
    extendObservable(this, entity);
  }

  disposer() {
    autorun(() => console.log("entity autorun "));
  }
}

export default EntityModel;
