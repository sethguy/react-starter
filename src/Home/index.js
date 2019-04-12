import React, { Component } from 'react';
import { loadEvents } from './actions'
import { connect } from 'react-redux';

import './home.css'

class Home extends Component {
    node;
    constructor(props) {
        super(props);
        this.state = {
            showContextMenu: false,
            contextMenuPosition: { x: 0, y: 0 }
        }
    }
    componentDidMount() {
        this
            .props
            .loadEvents({})

        document.body.addEventListener('mousedown', this.onAnyClick)
    }
    onAnyClick = (event) =>{


        if (this.node && this.node.contains(event.target)){
            return
        }
        this.closeContextMenu()
    }
    closeContextMenu = () => {

        if (this.state.showContextMenu) {
            this.setState({
                showContextMenu: false,
                contextMenuPosition: { x: 0, y: 0 }
            })
        }
    }
    openContextMenu = (event) => {

        this.setState({
            showContextMenu: true,
            contextMenuPosition: { x: event.x || 0, y: event.y || 0 }
        })
    }
    onContextMenuClick = (event) => {
        event.preventDefault()
        console.log("TCL: Home -> render -> event", event)
        // nice trick //const positions = Object.keys(event).filter(key => key.indexOf('Y') > -1 || key.indexOf('X') > -1)
        const { screenX, screenY, clientX, clientY, pageX, pageY, movementX, movementY } = event
        console.log("TCL: Home -> render -> { screenX, screenY, clientX, clientY, pageX, pageY, movementX, movementY} ", { screenX, screenY, clientX, clientY, pageX, pageY, movementX, movementY })
        
        this.openContextMenu({
            x:clientX,
            y:clientY,
        })
   
    }
    render() {
        return (
            <div className="h-100" onContextMenu={this.onContextMenuClick} >
                {this.state.showContextMenu && <div 
                    ref = {node=>this.node=node}
                    
                    style={{
                        top: `${this.state.contextMenuPosition.y}px`,
                        left: `${this.state.contextMenuPosition.x}px`,
                    }}
                
                className="context-menu border"> faske </div>}
            </div>
        );
    }
}

const defaultEvent = {};

const mapStateToProps = ({
    events
}, ownProps) => ({
    eventData: events.eventData || defaultEvent
})

export default connect(mapStateToProps, { loadEvents })(Home)
