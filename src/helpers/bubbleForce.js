/**
 * This force function makes bubbles act as gravitational centers
 * for papers during a force simulation;
 * Papers are attracted to a bubble as long as they are not completely within their
 * bubble's radius;
 * @param x - The bubbles x coordinate
 * @param y - The bubbles y coordinate
 * @param r - The bubbles r coordinate
 * @returns {force}
 */
export default function bubbleForce(x, y, r) {
    var nodes;

  function vectorLength(x_,y_) {
    return Math.sqrt(Math.pow(x_, 2) + Math.pow(y_, 2));
  }

  function isInBubble(x_, y_, dist_) {
    return (vectorLength(x_ - x, y_ - y) < dist_);
  }

  function force(alpha) {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i];
      var midpoint = {x: node.x + node.width/2., y: node.y + node.height/2.};
      var distX = midpoint.x - x;
      var distY = midpoint.y - y;
      var diag = vectorLength(node.width, node.height)/2.;
      var diagR = r - 2*diag;
      var dist  = vectorLength(distX, distY);
      var allInBubble =
        isInBubble(midpoint.x, midpoint.y, diagR);

      var strength = (diagR - dist)/diagR;
      node.vx += strength*(distX/dist);
      node.vy += strength*(distY/dist);
      if (!allInBubble) {
        node.x = x + diagR*distX/dist - node.width/2.;
        node.y = y + diagR*distY/dist - node.height/2.;
      }
    }
  }

  function initialize() {
    if (!nodes) return;
  }

  force.initialize = function(_) {
    nodes = _;
    initialize();
  };

  return force;
}