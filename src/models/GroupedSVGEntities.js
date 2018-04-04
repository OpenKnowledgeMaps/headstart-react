import {extendObservable} from 'mobx';

/**
 * Class GroupedSVGEntities is a container, representing a group of things in our SVG e.g. Bubbles or Papers
 * and manages the flags selected, active, hover, listvisible and clicked for them;
 */
class GroupedSVGEntities {
  /**
   * Initializes the container with a list;
   * @param initialState - A list of objects (e.g. from the DomainStore)
   * @param EntityModel - The model we want to use (e.g. PaperModel/BubbleModel)
   */
  constructor(initialState, EntityModel) {
    let entities = [];
    initialState.forEach((entity) => {
      entities.push(new EntityModel(entity));
    });

    //MobX getters and setters
    extendObservable(this, {
      entities: entities,

      // An entity is selected if the user actively chose it
      // e.g. clicked on it. All entities associated with the selected
      // entity, e.g. papers in a bubble, also become selected
      get selectedEntities() {
        return this.entities.filter((entity) => entity.selected) || [];
      },

      // An entity is active if it is associated with an entity the mouse cursor
      // is currently hovering over. The hovered-over entity also is active.
      // The difference to the hover flag is that active entities only have to be
      // associated with a hovered-over entity, but they don't have to be hovered over
      // themselves
      get activeEntities() {
        return this.entities.filter((entity) => entity.active) || [];
      },

      // An entity is hover if the mouse cursor is currently hovering over it
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

      get activeArea() {
        const activeEntity = this.entities.find((entity) => entity.selected);
        if (activeEntity !== undefined && activeEntity.hasOwnProperty('area'))
          return activeEntity.area;
        else
          return '';
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

      set hoveredEntity(entity) {
        this.allOtherEntitiesExcept(entity).forEach((entity) => entity.hover = false);
        if (entity !== null) entity.hover = true;
      },

      get hoveredEntity() {
        return this.entities.filter((entity) => entity.hover);
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
    if (area !== null) return this.entities.filter((entity) => entity.area === area);
    return [];
  }

  entitiesOutsideArea(area) {
    if (area !== null) return this.entities.filter((entity) => entity.area !== area);
    return this.entities;
  }
}

export default GroupedSVGEntities;