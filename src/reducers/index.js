import { combineReducers } from 'redux'

import locationUtil from './location'
import events from './events'

const user = (state = {}, action) => {
  switch (action.type) {
    // case Actions.ACTION_TYPE:
    //   return Object.assign({}, state, {

    //   });
    default:
      return state;
  }

}

export const rootReducer = combineReducers({
  user,
  locationUtil,
  events,
})