/*
* action 类型
*/

export const SAVE_INFO = 'SAVE_INFO';
export const ADD_FRIEND = 'ADD_FRIEND';
export const ADD_CHATS = 'ADD_CHATS'
export const HAS_READ = 'HAS_READ'
export const UPDATE_LOGO = 'UPDATE_LOGO'
export const SAVENICKNAME = 'SAVENICKNAME'
/*
 * 其它的常量
 */



/*
 * action 创建函数
 */

export function save_info(data) {
  return { type: SAVE_INFO, data }
}
export function add_friend(data) {
  return { type: SAVE_INFO, data }
}
