import { isImmutable } from '../predicates/isImmutable';
import isPlainObj from './isPlainObj';

/**
 * Returns true if the value is a potentially-persistent data structure, either
 * provided by Immutable.js or a plain Array or Object.
 * 
 * 判断值是否为潜在持久化的数据结构，即由 Immutable.js 提供的或由 Array 或 Object 组成的
 */
export default function isDataStructure(value) {
  return (
    typeof value === 'object' &&
    (isImmutable(value) || Array.isArray(value) || isPlainObj(value))
  );
}
