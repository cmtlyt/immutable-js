export const IS_LIST_SYMBOL = '@@__IMMUTABLE_LIST__@@';

/**
 * 判断对象是 immutable 列表
 */
export function isList(maybeList) {
  return Boolean(maybeList && maybeList[IS_LIST_SYMBOL]);
}
