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
        console.log("TCL: Menu -> menuChild")
        if (menuChild.type.name === 'MenuItem' && menuChild.props.children) {

          console.log("TCL: Menu -> do sub menu")


        }


        //return (<div className="child-menu-item border">  </div>)
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
    }
  }
  render() {
    return (
    <div
    
      onClick={(event)=>{

          if(this.props.children){

            this.setState({
              showSubContextMenu:true,
            })
          }

      }}
    className="context-menu-item border">
      {this.props.children &&
        this.state.showSubContextMenu &&
        <div
          style={{
            top: `100%`,
            left: `100%`,
          }}
          className="sub-context-menu border border-secondary">


        </div>}
    </div>
    );
  }
}