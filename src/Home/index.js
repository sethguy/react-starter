import React, { Component } from 'react';
import { loadEvents } from './actions'
import { connect } from 'react-redux';

import './home.css'
import { Menu } from './Menu';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showContextMenu: false,
            contextMenuPosition: { x: 0, y: 0 }
        }
    }
    openContextMenu = (event) => {
        this.setState({
            showContextMenu: true,
            contextMenuPosition: { x: event.x || 0, y: event.y || 0 }
        })
    }
    onCloseContextMenu = () => {
        this.setState({
            showContextMenu: false,
            contextMenuPosition: { x: 0, y: 0 }
        });

    };
    onContextMenuClick = (event) => {
        event.preventDefault()
        // nice trick //const positions = Object.keys(event).filter(key => key.indexOf('Y') > -1 || key.indexOf('X') > -1)
        const { screenX, screenY, clientX, clientY, pageX, pageY, movementX, movementY } = event
        this.openContextMenu({
            x: clientX,
            y: clientY,
        })
    }
    render() {

        const {x,y} = this.state.contextMenuPosition;
        return (
            <div className="h-100" onContextMenu={this.onContextMenuClick} >
                {this.state.showContextMenu && <Menu {...{ x, y, closeContextMenu: this.onCloseContextMenu}} ></Menu> }
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
