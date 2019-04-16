import React, { Component } from 'react';
export class Menu extends Component {
  node;
  componentDidMount() {
    document.body.addEventListener('mousedown', this.onAnyClick);
  }
  componentWillUnmount() {
    document.body.removeEventListener('mousedown', this.onAnyClick)
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
    return (
      <div
        className="context-menu-position-wrap border"
        style={{
          top: `${this.props.y}px`,
          left: `${this.props.x}px`,
        }}
      >
        <div ref={node => this.node = node}
          className="context-menu border">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubContextMenu: false,
      popStyle: {
        left: '105%'
      }
    }
  }
  onCloseSubMenu = () => {
    this.setState({
      showSubContextMenu: false,
    })
  }

  openSubContextMenu = (event) => {

    const { screenX, screenY, clientX, clientY, pageX, pageY, movementX, movementY } = event

    const midwidth = window.innerWidth / 2
    const midheight = window.innerHeight / 2
    let popStyle = {
      left: '100%'
    }
    if (clientX > midwidth) {
      popStyle = {
        ...popStyle,
        left: '-105%'
      }
    }
    if (clientY > midheight) {
      popStyle = {
        ...popStyle,
        top: '-105%'
      }
    }
    this.setState({
      showSubContextMenu: true,
      popStyle,
    })

  }
  render() {
    return (
      <div
        onClick={(event) => {
          event.stopPropagation();
          if (this.props.children) {
            this.openSubContextMenu(event)
          }
        }}
        className="context-menu-item border">
        <span>{this.props.title}</span>
        {this.props.children &&
          this.state.showSubContextMenu &&
          <SubMenu {...{ popStyle: this.state.popStyle, closeContextMenu: this.onCloseSubMenu, subMenuItems: this.props.children }} ></SubMenu >}
      </div>
    );
  }
}

export class SubMenu extends Component {
  node;
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {
    document.body.addEventListener('mousedown', this.onAnyClick);
  }
  componentWillUnmount() {
    document.body.removeEventListener('mousedown', this.onAnyClick)
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
    return (
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        style={{
          position: 'absolute',
          ...this.props.popStyle,
        }}
        className="sub-context-menu-abs">
        <div
          onClick={(event) => event.stopPropagation()}
          ref={node => this.node = node}
          className="sub-context-menu border border-secondary">
          {this.props.subMenuItems}
        </div>
      </div>
    );
  }
}