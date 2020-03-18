const INITIAL_STATE = {
  searchtext: ''
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'CHANGE_SEARCH_BAR': {
      return {
        searchtext: action.payload
      }
    }
    default: {
      return state
    }
  }
}