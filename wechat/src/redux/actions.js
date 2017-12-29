 /*
 * action 类型
 */

export const SAVE_INFO = 'SAVE_INFO';

/*
 * 其它的常量
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/*
 * action 创建函数
 */

export function save_info(data) {
  return { type: SAVE_INFO, data }
}
