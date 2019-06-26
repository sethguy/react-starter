import reducer from '../../reducers/events'
import {setEventData} from '../../actions/events'

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer({}, {})).toEqual({})
  })
})

describe('setEventData', () => {
  it('should should handle setEventData', () => {
    const eventData = { id: 'fasjlkhkl6', name: 'party time !' }
    expect(reducer({}, setEventData(eventData))).toEqual({"eventData": {"id": "fasjlkhkl6", "name": "party time !"}})
  })
})