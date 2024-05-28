export const IS_KEYED_SYMBOL = '@@__IMMUTABLE_KEYED__@@';

/**
 * 判断对象是可被 key 索引的
 */
export function isKeyed(maybeKeyed) {
  return Boolean(maybeKeyed && maybeKeyed[IS_KEYED_SYMBOL]);
}
