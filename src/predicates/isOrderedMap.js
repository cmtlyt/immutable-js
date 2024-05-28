import { isMap } from './isMap';
import { isOrdered } from './isOrdered';

/**
 * 判断对象是 immutable 订阅 Map
 */
export function isOrderedMap(maybeOrderedMap) {
  return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
}
