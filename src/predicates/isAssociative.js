import { isKeyed } from './isKeyed';
import { isIndexed } from './isIndexed';

/**
 * 判断对象是否能被 key 或 index 索引
 */
export function isAssociative(maybeAssociative) {
  return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
}
