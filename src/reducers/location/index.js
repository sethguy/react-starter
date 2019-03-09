import { getQueryParams, getPathVariables } from '../utils'

const locationReducer = (state = {}, action) => {

  var location = window.location

  return {
    ...state,
    ...location,
    params: getQueryParams(),
    paths: getPathVariables(),
    timeStamp: new Date()
  }

}

export default locationReducer;