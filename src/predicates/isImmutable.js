import { isCollection } from './isCollection';
import { isRecord } from './isRecord';

/**
 * 判断对象是 immutable 对象
 */
export function isImmutable(maybeImmutable) {
  return isCollection(maybeImmutable) || isRecord(maybeImmutable);
}
