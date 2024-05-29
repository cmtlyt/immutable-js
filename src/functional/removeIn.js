import { updateIn } from './updateIn';
import { NOT_SET } from '../TrieUtils';

/**
 * @alias updateIn
 * 使用 NOT_SET 的 updater 让 updateIn 来帮忙移除对应 key, 低层还是调用 remove
 */
export function removeIn(collection, keyPath) {
  return updateIn(collection, keyPath, () => NOT_SET);
}
