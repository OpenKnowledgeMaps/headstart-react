/**
 * Created by rbachleitner on 7/3/17.
 */

import {extendObservable, autorun} from 'mobx';

class GroupedSVGEntities {
  constructor(initialState, EntityModel) {
    let entities = [];
    initialState.entities.forEach((entity) => {
      entities.push(new EntityModel(entity));
    });
    extendObservable(this, {
      entities: entities,

      get selectedEntities() {
        return this.entities.filter((entity) => entity.selected) || [];
      },

      get activeEntities() {
        return this.entities.filter((entity) => entity.active) || [];
      },

      get hoverEntities() {
        return this.entities.filter((entity) => entity.hover) || [];
      },

      get hasSelectedEntities() {
        return this.entities.some((entity) => entity.selected);
      },

      get hasActiveEntities() {
        return this.entities.some((entity) => entity.active);
      },

      get hasHoverEntities() {
        return this.entities.some((entity) => entity.hover);
      },

      set activeArea(area) {
        this.entitiesOutsideArea(area).forEach((entity) => {
          entity.active = false;
        });
        this.entitiesInArea(area).forEach((entitiy) => {
          entitiy.active = true;
        });
      },

      set selectedArea(area) {
        this.entitiesOutsideArea(area).forEach((entity) => {
          entity.selected = false;
          entity.listvisible = false;
        });
        this.entitiesInArea(area).forEach((entity) => {
          entity.selected = true;
          entity.listvisible = true;
        });
      },

      set clickedEntity(entity) {
        if (entity === null) this.entities.forEach((entity) => entity.clicked = false);
        else {
          this.allOtherEntitiesExcept(entity).forEach((entity) => entity.clicked = false);
          entity.clicked = !entity.clicked;
          if (!entity.clicked) this.entitiesInArea(entity.area).forEach((entity) => entity.listvisible = true);
        }
      }

    });
  }

  allOtherEntitiesExcept(entity) {
    return this.entities.filter((otherEntity) => otherEntity !== entity);
  }

  entitiesInArea(area) {
    return this.entities.filter((entity) => entity.area === area);
  }

  entitiesOutsideArea(area) {
    return this.entities.filter((entity) => entity.area !== area);
  }

  disposer() {
    autorun(() => {
    });

  }
}

// let papersModel = window.papersModel = new PapersModel(data);

export default GroupedSVGEntities;