import React, { Component } from 'react';
import { loadEvents } from './actions'
import { connect } from 'react-redux';
import './home.css'
import { Menu, MenuItem } from './Menu';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        const { x, y } = this.state.contextMenuPosition;
        return (
            <div className="h-100" onContextMenu={this.onContextMenuClick} >
                {this.state.showContextMenu && <Menu {...{ x, y, closeContextMenu: this.onCloseContextMenu }} >
                    <MenuItem title="cell Types" >
                        <MenuItem title="cell Type 1" >
                            <MenuItem title="option 1" ></MenuItem>
                            <MenuItem title="option 2" ></MenuItem>
                        </MenuItem>
                        <MenuItem title="cell Type 2" ></MenuItem>
                    </MenuItem>
                    <MenuItem title="input Types" >
                        <MenuItem title=" input option 1" ></MenuItem>
                        <MenuItem title=" input option 2" ></MenuItem>
                    </MenuItem>
                    <MenuItem title="input2 Types" >
                        <MenuItem title=" input2 option 1" >
                            <MenuItem title=" input3 option 1" ></MenuItem>
                            <MenuItem title=" input3 option 23" ></MenuItem>
                            <MenuItem title=" input3 option 13" ></MenuItem>
                            <MenuItem title=" input3 option 24" ></MenuItem>

                            <MenuItem title=" input3 option 155" ></MenuItem>
                            <MenuItem title=" input3 option 266" ></MenuItem>
                        
                        </MenuItem>
                        <MenuItem title=" input2 option 2" ></MenuItem>
                    </MenuItem>
                </Menu>}
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
