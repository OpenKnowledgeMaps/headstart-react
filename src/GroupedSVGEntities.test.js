/**
 * Created by rbachleitner on 7/3/17.
 */
import GroupedSVGEntities from './GroupedSVGEntities';
import EntityModel from './EntityModel';

const entities =  {entities:  [{
    readers: 243,
    x: 47.4593772864,
    y: 690.5572023794,
    orig_x: 0.,
    orig_y: 0.,
    zoomed_x: 0.,
    zoomed_y: 0.,
    width: 26,
    height: 40,
    orig_width: 26,
    orig_height: 40,
    zoomed_width: 0,
    zoomed_height: 0,
    fontsize: 5,
    orig_fontsize: 5,
    active: false,
    hover: false,
    selected: false,
    listvisible: true,
    clicked: false,
    meanx: 447.7752875458,
    meany: 600.7994002427,
    area: 'The Future of Learning',
    title: 'What is Web 2.0? Ideas, technologies and implications for education by'
  },
  {
    readers: 87,
    x: 706.8144160345,
    y: 70.9710816323,
    orig_x: 0.,
    orig_y: 0.,
    zoomed_x: 0.,
    zoomed_y: 0.,
    width: 26,
    height: 40,
    orig_width: 26,
    orig_height: 40,
    zoomed_width: 0,
    zoomed_height: 0,
    fontsize: 5,
    orig_fontsize: 5,
    meanx: 601.8798895495,
    meany: 388.2537580354,
    area: 'Technological Pedagogical Content Knowledge',
    title: 'Epistemological and methodological issues for the conceptualization, development, and assessment of ICT–TPCK: Advances in technological pedagogical content knowledge (TPCK)'
  }
  ]};

it('Takes a list of Entities and an EntityModel and assigns them to itself', () => {
  const papersModel = new GroupedSVGEntities(entities, EntityModel);
  expect(papersModel).toHaveProperty('entities');
  expect(papersModel.entities).toHaveLength(2);
});

it('Its entities have flags hover, selected, clicked, active, listvisible and an area property', () => {
  const papersModel = new GroupedSVGEntities(entities, EntityModel);
  papersModel.entities.forEach((entity) => {
    expect(entity).toHaveProperty('active');
    expect(entity).toHaveProperty('selected');
    expect(entity).toHaveProperty('clicked');
    expect(entity).toHaveProperty('hover');
    expect(entity).toHaveProperty('area');
  })
});

it('has a getter that returns entities with true selected flag, and a method that checks whether there are such entities', () => {
  const papersModel = new GroupedSVGEntities(entities, EntityModel);
  expect(!(papersModel.hasSelectedEntities));
  papersModel.entities[0].selected = true;
  expect(papersModel.selectedEntities).toHaveLength(1);
  expect(papersModel.hasSelectedEntities);
});

it('has a getter that returns entities with true active flag, and a method that checks whether there are such entities', () => {
  const papersModel = new GroupedSVGEntities(entities, EntityModel);
  expect(!(papersModel.hasActiveEntities));
  papersModel.entities[0].active = true;
  expect(papersModel.activeEntities).toHaveLength(1);
  expect(papersModel.hasActiveEntities);
});

it('has a getter that returns entities with true hover flag, and a method that checks whether there are such entities', () => {
  const papersModel = new GroupedSVGEntities(entities, EntityModel);
  expect(!(papersModel.hasHoverEntities));
  papersModel.entities[0].hover = true;
  expect(papersModel.hoverEntities).toHaveLength(1);
  expect(papersModel.hasHoverEntities);
});

it('has a setter that allows only a single area to be active at the same time', () => {
  const papersModel = new GroupedSVGEntities(entities, EntityModel);
  expect(!(papersModel.hasActiveEntities));
  papersModel.activeArea = 'The Future of Learning';
  expect(papersModel.hasActiveEntities);
  expect(papersModel.activeEntities).toHaveLength(1);
  papersModel.activeArea = 'Technological Pedagogical Content Knowledge',
  expect(papersModel.hasActiveEntities);
  expect(papersModel.activeEntities).toHaveLength(1);
  papersModel.activeArea = null;
  expect(!(papersModel.hasActiveEntities));
});

it('has a setter that allows only a single area to be selected at the same time', () => {
  const papersModel = new GroupedSVGEntities(entities, EntityModel);
  expect(!(papersModel.hasSelectedEntities));
  papersModel.selectedArea = 'The Future of Learning';
  expect(papersModel.hasSelectedEntities);
  expect(papersModel.selectedEntities).toHaveLength(1);
  papersModel.selectedArea = 'Technological Pedagogical Content Knowledge',
  expect(papersModel.hasSelectedEntities);
  expect(papersModel.selectedEntities).toHaveLength(1);
  papersModel.selectedArea = null;
  expect(!(papersModel.hasSelectedEntities));
});

it('has a setter that allows only a single entity to have the clicked flag at the same ' +
  'time and toggle the clicked flag between true and false', () => {
  const papersModel = new GroupedSVGEntities(entities, EntityModel);
  papersModel.entities.forEach((entity) => expect(!(entity.clicked)));
  papersModel.clickedEntity = papersModel.entities[0];
  expect(papersModel.entities.filter((entity) => entity.clicked)).toHaveLength(1);
  papersModel.clickedEntity = papersModel.entities[0];
  expect(papersModel.entities.filter((entity) => entity.clicked)).toHaveLength(0);

  // Null should reset clicked flags
  papersModel.clickedEntity = papersModel.entities[0];
  expect(papersModel.entities.filter((entity) => entity.clicked)).toHaveLength(1);
  papersModel.clickedEntity = null;
  expect(papersModel.entities.filter((entity) => entity.clicked)).toHaveLength(0);
});

it('Has a method allOtherEntitiesExcept that does what it says', () => {
  const papersModel = new GroupedSVGEntities(entities, EntityModel);
  expect(papersModel.allOtherEntitiesExcept(papersModel.entities[0])[0]).toEqual(papersModel.entities[1]);
});

it('Has a method entitiesInArea that returns all entities in an area', () => {
  const papersModel = new GroupedSVGEntities(entities, EntityModel);
  expect(papersModel.entitiesInArea('The Future of Learning')[0]).toEqual(papersModel.entities[0]);
});

it('Has a method entitiesOutside that does what it says', () => {
  const papersModel = new GroupedSVGEntities(entities, EntityModel);
  expect(papersModel.entitiesOutsideArea('The Future of Learning')[0]).toEqual(papersModel.entities[1]);
});