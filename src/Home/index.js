import React, {Component} from 'react';
import {loadEvents} from './actions'
import {connect} from 'react-redux';
import './home.css'

const defaultCollumnState = [
    {
        topColor: '#8e6e95',
        cards: [
            {
                text: "hey"
            }, {
                text: "yoy"
            }

        ],
        name: 'name1'
    }, {
        topColor: '#39a59c',
        cards: [
            {
                text: "blue"
            }, {
                text: "yellow"
            }

        ],
        name: 'name2'
    }, {
        topColor: '#344759',
        cards: [
            {
                text: "sstay"
            }, {
                text: "hot"
            }

        ],
        name: 'name3'
    }, {
        topColor: '#e8741e',
        cards: [
            {
                text: "feeet"
            }, {
                text: "buzz"
            }

        ],
        name: 'name4'
    }
]
class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            collumns: []
        }
    }
    componentDidMount() {
        this.getStoredState()

    }
    saveBoardToLocal = (collumns) => {

        const collumnData = JSON.stringify(collumns)

        localStorage.setItem('demo.collumnData', collumnData)

    }

    getStoredState = () => {

        const collumnData = localStorage.getItem('demo.collumnData');
        let collumns = null;
        try {

            collumns = JSON.parse(collumnData);

        } catch (error) {}

        this.setState({
            collumns: collumns || defaultCollumnState
        })

    }

    moveCardBack = (colIndex, cardIndex, card) => {

        this.removeCard(colIndex, cardIndex, () => {

            this.addCard(card.text, colIndex - 1)

        });

    }

    moveCardForward = (colIndex, cardIndex, card) => {

        this.removeCard(colIndex, cardIndex, () => {

            this.addCard(card.text, colIndex + 1)

        });

    }

    removeCard = (colIndex, cardIndex, callback) => {

        const {collumns} = this.state;

        const updated = collumns.map((col, i) => {

            if (i === colIndex) {

                const updatedCards = col
                    .cards
                    .filter((card, i) => i !== cardIndex)

                return {
                    ...col,
                    cards: updatedCards
                }
            }

            return col;
        })
        this.saveBoardToLocal([...updated])
        this.setState({
            collumns: [...updated]
        }, () => callback())

    }

    addCard = (message, colIndex) => {

        const {collumns} = this.state;

        const updated = collumns.map((col, i) => {

            if (i === colIndex) {

                return {
                    ...col,
                    cards: [
                        ...col.cards, {
                            text: message
                        }
                    ]
                }
            }

            return col;
        })
        this.saveBoardToLocal([...updated])

        this.setState({
            collumns: [...updated]
        })
    }

    render() {
        return (
            <div
                style={{
                paddingLeft: 12.5,
                paddingRight: 12.5
            }}
                className="d-flex h-100">

                {this
                    .state
                    .collumns
                    .map((col, colIndex) => {

                        return (

                            <div className="flex-1 col-class h-100">
                                <p
                                    style={{
                                    color: 'white',
                                    backgroundColor: col.topColor,
                                    textAlign: 'center'
                                }}>
                                    {col.name}
                                </p>

                                <div className='card-container'>

                                    {col
                                        .cards
                                        .map((card, cardIndex) => {

                                            return (

                                                <div className='card-demo'>

                                                    <div className='card-button d-flex justify-content-between'>

                                                        {colIndex > 0 && <button
                                                            onClick={() => {
                                                            this.moveCardBack(colIndex, cardIndex, card)
                                                        }}>{'<'}</button>}

                                                        <p>
                                                            {card.text}
                                                        </p>

                                                        {colIndex < this.state.collumns.length - 1 && <button
                                                            onClick={() => {
                                                            this.moveCardForward(colIndex, cardIndex, card)
                                                        }}>{'>'}</button>}

                                                    </div>

                                                </div>

                                            )
                                        })
}

                                </div>

                                <button
                                    onClick={() => {
                                    const result = window.prompt('type card message', 'card message');
                                    this.addCard(result, colIndex)
                                }}>

                                    add card</button>
                            </div>
                        )

                    })
}

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
