import { updateIn } from './updateIn';

/**
 * 更新一个值
 */
export function update(collection, key, notSetValue, updater) {
  return updateIn(collection, [key], notSetValue, updater);
}
