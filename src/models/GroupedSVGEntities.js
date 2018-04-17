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

      // An entity is selected if it is associated with a selected Area
      // e.g. when a bubble or paper is clicked and zoomed in on, it's
      // area becomes selected
      get selectedEntities() {
        return this.entities.filter((entity) => entity.selected) || [];
      },

      // An entity is active if it is associated with an active Area
      // e.g. when hovering over a bubble the bubble's area is active
      get activeEntities() {
        return this.entities.filter((entity) => entity.active) || [];
      },

      // hoverEntities are elements that are hovered
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
        this.entitiesInArea(area).forEach((entity) => {
          entity.active = true;
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
        this.entities.filter((entity) => entity.selected).forEach((entity) => {
          entity.selected = false;
        });
        this.entities.filter((entity) => entity.listvisible).forEach((entity) => {
          entity.listvisible = false;
        })
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
        const tmpEntityClicked = entity && entity.clicked;
        if (entity === null)
          this.entities.filter((entity) => entity.clicked).forEach((entity) => entity.clicked = false);
        if (entity && !entity.clicked) {
          this.entities.filter((entity) => entity.clicked).forEach((entity) => entity.clicked = false);
          entity.clicked = true;
        }
        else if (entity && entity.clicked) {
          entity.clicked = false;
          this.entitiesInArea(entity.area).forEach((entity) => entity.listvisible = true);
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