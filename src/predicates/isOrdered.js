export const IS_ORDERED_SYMBOL = '@@__IMMUTABLE_ORDERED__@@';

/**
 * 判断对象是有序的
 */
export function isOrdered(maybeOrdered) {
  return Boolean(maybeOrdered && maybeOrdered[IS_ORDERED_SYMBOL]);
}
