import React, {Component} from 'react';
import {loadEvents} from './actions'
import {connect} from 'react-redux';

class Home extends Component {
    componentDidMount() {
        this
            .props
            .loadEvents({})
    }
    render() {
        return (
            <div>
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
