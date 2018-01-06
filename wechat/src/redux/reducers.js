import { combineReducers } from 'redux'
import { SAVE_INFO, ADD_FRIEND, ADD_CHATS } from './actions'



function save_info(state = {}, action) {
    switch (action.type) {
        case SAVE_INFO:
            return { ...state, ...action.data };
            break;
        case ADD_FRIEND:
            return { ...state, friends: [...state.friends, action.data] }
            break;
        case ADD_CHATS:
            let room_key = action.data.room_id,
                room_index = state.rooms.findIndex(T=>T[room_key]);
                
            if( room_index>-1 ){
                state.rooms.unshift(state.rooms.splice(room_index,1)[0]);
                
                state.rooms[0][room_key].push(action.data);
            }else {
                state.rooms.unshift({[room_key]:[action.data]})
            }
            
            return state;

            break;
        default:
            return state
    }
}



const Reducer = combineReducers({
    save_info
})

export default Reducer