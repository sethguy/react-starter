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
    return (<div ref={node => this.node = node} style={{
      top: `${this.props.y}px`,
      left: `${this.props.x}px`,
    }} className="context-menu border">
      {this.props.children && this.props.children.map(menuChild => {
        if (menuChild.type.name === 'MenuItem' && menuChild.props.children) {
          console.log("TCL: Menu -> do sub menu")
        }
        return menuChild;
      })}
    </div>);
  }
}

export class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubContextMenu: false,
      popStyle: {
        top: '100%',
        left: '100%'
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
      top: '100%',
      left: '100%'
    }
    if (clientX > midwidth) {
      popStyle = {
        ...popStyle,
        left: '-100%'
      }
    }
    if (clientY > midheight) {
      popStyle = {
        ...popStyle,
        top: '-100%'
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
        <p>{this.props.title}</p>
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

        ref={node => this.node = node}
        style={{
       ...this.props.popStyle,
        }}
        className="sub-context-menu border border-secondary">
        {this.props.subMenuItems}
      </div>
    );
  }
}