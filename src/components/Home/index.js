import React, {Component} from 'react';
import {loadEvents} from '../../actions/events'
import {connect} from 'react-redux';

class Home extends Component {
    componentDidMount() {
        this
            .props
            .loadEvents({})
    }
    render() {
        return (
            <div className="h-100" onContextMenu={(event)=>{
			console.log("TCL: Home -> render -> event", event)
                
            }} >
                <div>
                    <p>
                        HOme
                    </p>
                </div>
                <p>
                    {this.props.eventData.name}
                </p>
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

export default connect(mapStateToProps, {loadEvents})(Home)
