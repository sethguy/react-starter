
export const setEventData = (eventData) =>{
    return {
        type: 'setEventData',
        eventData,
    }
}

export const loadEvents = (params) => async (dispatch, getState) => {
    dispatch({ type: "loadEvent", params })
    const {eventData} = await getEvents(params)
    dispatch(setEventData(eventData))
}

const getEvents = async (params) => {
    return Promise.resolve({ eventData: { id: 'fasjlkhkl6', name: 'party time !' } })
}
