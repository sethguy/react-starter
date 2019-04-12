import React, { Component } from 'react';
export class Menu extends Component {
  node;
  componentDidMount() {
    document.body.addEventListener('mousedown', this.onAnyClick);
  }
  onAnyClick = (event) => {
    if (this.node && this.node.contains(event.target)) {
      return;
    }
    this.closeContextMenu();
  };

  closeContextMenu = () => {
    this.props.closeContextMenu()
  };
  render() {
    return (<div ref={node => this.node = node} style={{
      top: `${this.props.y}px`,
      left: `${this.props.x}px`,
    }} className="context-menu border"> faske </div>);
  }
}
