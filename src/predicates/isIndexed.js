export const IS_INDEXED_SYMBOL = '@@__IMMUTABLE_INDEXED__@@';

/**
 * 判断对象是可被下标索引的
 */
export function isIndexed(maybeIndexed) {
  return Boolean(maybeIndexed && maybeIndexed[IS_INDEXED_SYMBOL]);
}
