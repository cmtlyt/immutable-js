import { getIn } from './getIn';
import { NOT_SET } from '../TrieUtils';

/**
 * 判断对象是否存在某个 key
 */
export function hasIn(collection, keyPath) {
  return getIn(collection, keyPath, NOT_SET) !== NOT_SET;
}
