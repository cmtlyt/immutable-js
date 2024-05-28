import { isSet } from './isSet';
import { isOrdered } from './isOrdered';

/**
 * 判断对象是 immutable 订阅 Set
 */
export function isOrderedSet(maybeOrderedSet) {
  return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
}
