import { combineReducers } from 'redux'
import { SAVE_INFO ,ADD_FRIEND} from './actions'

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
        return {...state,...action.data};
        break;
        case ADD_FRIEND:
        return {...state,friends:[...state.friends,{
            nickname:action.data.nickname,
            id:action.data.id
        }]}
        default:
        return state
    }
}

// function friends(state=[],action){
//     switch(action.type){

//         case ADD_FRIEND:
//         return [...state,{
//             nickname:action.nickname,
//             id:action.id
//         }]
//         break;
//         default:
//         return state;
//     }
// }


const Reducer = combineReducers({
  save_info
})

export default Reducer