import { combineReducers } from 'redux'
import SearchBarReducer from './SearchBarReducer'

const reducers = combineReducers({
  searchbar: SearchBarReducer,
})

export default reducers