import coerceKeyPath from '../utils/coerceKeyPath';
import { NOT_SET } from '../TrieUtils';
import { get } from './get';

/**
 * 返回指定 key 中的最后一个值的结果, 如果不存在则直接返回 notSetValue
 */
export function getIn(collection, searchKeyPath, notSetValue) {
  const keyPath = coerceKeyPath(searchKeyPath);
  let i = 0;
  while (i !== keyPath.length) {
    collection = get(collection, keyPath[i++], NOT_SET);
    if (collection === NOT_SET) {
      return notSetValue;
    }
  }
  return collection;
}
