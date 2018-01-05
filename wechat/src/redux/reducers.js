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
        console.log(action.data.room_id,'rrom id')
            var room_key = action.data.room_id;
            var room = state.rooms[room_key];

            if(room){
                room.push(action.data)
            }else {
                room = [action.data];
            };
            state.rooms[room_key] = room;

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