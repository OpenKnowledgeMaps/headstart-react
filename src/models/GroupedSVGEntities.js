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

      // An entity is active if it is associated with an active Area
      // e.g. when hovering over a bubble the bubble's area is active
      activeEntities: [],

      // An entity is selected if it is associated with a selected Area
      // e.g. when a bubble or paper is clicked and zoomed in on, it's
      // area becomes selected
      selectedEntities: [],
      hoverEntities: [],
      _activeArea: null,
      _selectedArea: null,
      // hoverEntities are elements that are hovered
      get hasSelectedEntities() {
        return this.selectedEntities.length !== 0;
      },

      get hasActiveEntities() {
        return this.activeEntities.length !== 0;
      },

      get hasHoverEntities() {
        return this.hoverEntities.length !== 0;
      },

      get maxZIndex() {
        return Math.max(...this.entities.map((entity) => entity.zIndex));
      },

      set activeArea(area) {
        this.activeEntities.forEach((entity) => entity.active = false);
        if ( area !== null ) {
          this._activeArea = area;
          this.activeEntities = this.entitiesInArea(area);
          this.activeEntities.forEach((entity) => entity.active = true);
        } else {
          this.activeEntities = [];
        }
      },

      get activeArea() {
        return this._activeArea;
      },

      set selectedArea(area) {
        // TODO manage listvisibility
        this.selectedEntities.forEach((entity) => entity.selected = false);
        if ( area !== null ) {
          this._selectedArea = area;
          this.selectedEntities = this.entitiesInArea(area);
          this.selectedEntities.forEach((entity) => entity.selected = true);
        } else {
          this.selectedEntities = [];
        }
      },

      set hoveredEntity(entity) {
        this.hoverEntities.filter(entity => entity.hover).forEach((entity) => entity.hover = false);
        if (entity !== null) {
          entity.hover = true;
          this.hoverEntities.push([entity]);
        } else {
          this.hoverEntities = [];
        }
      },

      get hoveredEntity() {
        return this.hoverEntities;
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