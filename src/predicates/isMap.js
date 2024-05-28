export const IS_MAP_SYMBOL = '@@__IMMUTABLE_MAP__@@';

/**
 * 判断对象是 immutable Map
 */
export function isMap(maybeMap) {
  return Boolean(maybeMap && maybeMap[IS_MAP_SYMBOL]);
}
