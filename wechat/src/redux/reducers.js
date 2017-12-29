import { combineReducers } from 'redux'
import { SAVE_INFO } from './actions'

// function visibilityFilter(state = SHOW_ALL, action) {
//   switch (action.type) {
//     case SET_VISIBILITY_FILTER:
//       return action.filter
//     default:
//       return state
//   }
// }

// function todos(state = [], action) {
//   switch (action.type) {
//     case ADD_TODO:
//       return [
//         ...state,
//         {
//           text: action.text,
//           completed: false
//         }
//       ]
//     case COMPLETE_TODO:
//       return [
//         ...state.slice(0, action.index),
//         Object.assign({}, state[action.index], {
//           completed: true
//         }),
//         ...state.slice(action.index + 1)
//       ]
//     default:
//       return state
//   }
// }
function save_info(state={},action){
    switch (action.type) {
        case SAVE_INFO:
        return Object.assign({},state,{
            username:action.data.username,
            password:action.data.password,
            nickname:action.data.nickname
        });
        default:
        return state
    }
}

const Reducer = combineReducers({
  save_info
})

export default Reducer