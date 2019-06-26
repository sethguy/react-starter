const eventsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'setEventData':
      return {
        ...state,
        eventData: action.eventData
      }
    default:
      return state;
  }

}

export default eventsReducer;