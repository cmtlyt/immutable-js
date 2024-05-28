export const IS_ORDERED_SYMBOL = '@@__IMMUTABLE_ORDERED__@@';

/**
 * 判断对象是 immutable 订单
 * ? 订阅
 */
export function isOrdered(maybeOrdered) {
  return Boolean(maybeOrdered && maybeOrdered[IS_ORDERED_SYMBOL]);
}
