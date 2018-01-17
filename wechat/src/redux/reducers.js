import { combineReducers } from 'redux'
import { SAVE_INFO, ADD_FRIEND, ADD_CHATS, HAS_READ, UPDATE_LOGO,SAVENICKNAME } from './actions'



function save_info(state = {}, action) {
    switch (action.type) {
        case SAVE_INFO:
            return { ...state, ...action.data };
            break;
        case ADD_FRIEND:
            return { ...state, friends: [...state.friends, action.data] }
            break;
        case HAS_READ:
            let new_arr = JSON.parse(JSON.stringify(state.rooms));
            new_arr.map(obj => {
                if (obj[action.user]) {
                    obj[action.user].map(o => o.has_read = true);
                    return;
                }
            })
            return Object.assign({}, state, { rooms: new_arr })
            break;
        case ADD_CHATS:
            return Object.assign({}, state, { rooms: add_chats(state.rooms, action) })
            break;
        case UPDATE_LOGO:
            return Object.assign({}, state, { logo: action.url })
            break;
        case SAVENICKNAME:
            return Object.assign({}, state, { nickname: action.data.nickname })
            break;
        default:
            return state
    }
}


function add_chats(state = [], action) {
    let room_key = action.data.room_id,
        room_index = state.findIndex(T => T[room_key]);

    let new_arr = JSON.parse(JSON.stringify(state));
    if (room_index > -1) {
        new_arr[room_index][room_key].push(action.data);
        return new_arr;
    } else {
        return [{ [room_key]: [action.data] }, ...new_arr];
    }
}



const Reducer = combineReducers({
    save_info
})

export default Reducer