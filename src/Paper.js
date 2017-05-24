import React, {Component} from 'react';

class Paper extends Component {
  render() {
    return (
      <rect
        x={this.props.x}
        y={this.props.y}
        width="18"
        height="30"
        rx="3"
        ry="3"
        style={{
          "fill": "#fff",
          "fillOpacity": "0.8",
          "stroke":"#000",
          "strokeWidth":"1px"
        }}/>
    )
  }
}

export default Paper;