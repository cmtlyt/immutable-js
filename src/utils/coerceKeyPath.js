import { isOrdered } from '../predicates/isOrdered';
import isArrayLike from './isArrayLike';

/**
 * 将键索引转换为数组 (对象转数组, 仅限 immutable 类型或伪数组)
 */
export default function coerceKeyPath(keyPath) {
  if (isArrayLike(keyPath) && typeof keyPath !== 'string') {
    return keyPath;
  }
  if (isOrdered(keyPath)) {
    return keyPath.toArray();
  }
  throw new TypeError(
    'Invalid keyPath: expected Ordered Collection or Array: ' + keyPath
  );
}
