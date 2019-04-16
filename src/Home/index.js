import React, { Component } from 'react';
import { loadEvents } from './actions'
import { connect } from 'react-redux';
import './home.css'
import { Menu, MenuItem } from './Menu';
import { randos } from './randos'


const getRandoConbo = () => {

    const r1 = Math.floor(Math.random() * randos.length - 1)
    const r2 = Math.floor(Math.random() * randos.length - 1)

    const wordOne = randos[r1]
    const wordtwo = randos[r2]

    const word = `${wordOne}-${wordtwo}`
    return word;
}
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contextMenuPosition: { x: 0, y: 0 }
        }

    }
    componentDidMount() {
        this.buildDemoList();
    }
    getMenuItems = () => {
        const blocks = new Array(5).fill("").map(space => {
            return {
                title: getRandoConbo(),
                subs: []
            }
        })
        return blocks;
    }
    listWithMenus = () => {
        return this.getMenuItems().map(menuitem => {
            return {
                ...menuitem,
                subs: this.getMenuItems()
            }
        })
    }

    buildDemoList = () => {

        const toplist = this.getMenuItems().map(menuitem => {

            return {
                ...menuitem,
                subs: this.getMenuItems().map(menuitem => {
                    return {
                        ...menuitem,
                        subs: this.getMenuItems().map(menuitem => {
                            return {
                                ...menuitem,
                                subs: this.getMenuItems().map(menuitem => {
                                    return {
                                        ...menuitem,
                                        subs: this.getMenuItems()
                                    }
                                })
                            }
                        })
                    }
                })
            }
        });
        this.setState({
            menulist: toplist
        })
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
            <div className="h-100" style={{ backgroundColor: 'black' }} onContextMenu={this.onContextMenuClick} >
                {this.state.showContextMenu && <Menu {...{ x, y, closeContextMenu: this.onCloseContextMenu }} >

                    {this.state.menulist && this.state.menulist.map(list => {
                        return (
                            <MenuItem title={list.title} >
                                {list.subs && list.subs.map(sublist => {
                                    return (
                                        <MenuItem title={sublist.title} >
                                            {sublist.subs && sublist.subs.map(subsublist => {
                                                return (
                                                    <MenuItem title={subsublist.title} >
                                                        {subsublist.subs && subsublist.subs.map(subsubsublist => {
                                                            return (
                                                                <MenuItem title={subsubsublist.title} >
                                                                </MenuItem>
                                                            )
                                                        })}
                                                    </MenuItem>
                                                )
                                            })}
                                        </MenuItem>
                                    )
                                })}
                            </MenuItem>
                        )
                    })}

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
