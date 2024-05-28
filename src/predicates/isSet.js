export const IS_SET_SYMBOL = '@@__IMMUTABLE_SET__@@';

/**
 * 判断对象是 immutable Set
 */
export function isSet(maybeSet) {
  return Boolean(maybeSet && maybeSet[IS_SET_SYMBOL]);
}
