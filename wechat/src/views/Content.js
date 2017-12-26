import React, { Component } from 'react';


class Content extends Component {
  render() {
    return (
      <div id="content">
        {this.props.children}
      </div>
    );
  }
}

export default Content;
