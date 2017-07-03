/**
 *
 * Created by rbachleitner on 7/3/17.
 */

import EntityModel from '../models/EntityModel';

it('Takes an initial state and assign it to itself', () => {
  const initialEntityState = {
    x: 447., y: 600., r: 110, orig_x: 0., orig_y: 0., orig_r: 0, zoomed_x: 0,
    zoomed_y: 0, zoomed_z: 0, translationX: 0., translationY: 0., vx: 0., vy: 0., group: 1,
    type: "bubble", area: "The Future of Learning", hover: false, active: false, id: 0, selected: false
  };

  const entity = new EntityModel(initialEntityState);
  expect(entity).toHaveProperty('x');
  expect(entity).toHaveProperty('y');
  expect(entity).toHaveProperty('r');
  expect(entity.x).toEqual(447.);
});
