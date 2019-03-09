export const loadEvents = (params) => async(dispatch, getState) => {
    dispatch({type: "loadEvent", params})
    const results = await getEvents(params)
    dispatch({type: "onEventData", ...results})
}

const getEvents = async(params) => {
    return Promise.resolve({eventData: {id:'fasjlkhkl6',name:'party time !'}})
}
