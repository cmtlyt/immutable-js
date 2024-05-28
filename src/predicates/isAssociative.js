import { isKeyed } from './isKeyed';
import { isIndexed } from './isIndexed';

/**
 * 判断对象是可被 key 或 index 索引的
 * ? 判断是否可以合并
 */
export function isAssociative(maybeAssociative) {
  return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
}
