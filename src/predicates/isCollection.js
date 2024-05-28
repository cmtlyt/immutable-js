// Note: value is unchanged to not break immutable-devtools.
export const IS_COLLECTION_SYMBOL = '@@__IMMUTABLE_ITERABLE__@@';

/**
 * 判断对象是可被迭代的
 */
export function isCollection(maybeCollection) {
  return Boolean(maybeCollection && maybeCollection[IS_COLLECTION_SYMBOL]);
}
