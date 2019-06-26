import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions/events';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)

describe('setEventData', () => {
  it('should setEventData', () => {
    const eventData = { id: 'fasjlkhkl6', name: 'party time !' }
    const expectedAction = {
      type: 'setEventData',
      eventData,
    }
    expect(actions.setEventData(eventData)).toEqual(expectedAction)
  })
})

  describe('loadEvents', () => {

    it('should loadEvents', () => {
  
      const store = mockStore({})

      return store.dispatch(actions.loadEvents({})).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual([{"params": {}, "type": "loadEvent"}, {"eventData": {"id": "fasjlkhkl6", "name": "party time !"}, "type": "setEventData"}])
      })
    })
  })
