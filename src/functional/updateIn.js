import { isImmutable } from '../predicates/isImmutable';
import coerceKeyPath from '../utils/coerceKeyPath';
import isDataStructure from '../utils/isDataStructure';
import quoteString from '../utils/quoteString';
import { NOT_SET } from '../TrieUtils';
import { emptyMap } from '../Map';
import { get } from './get';
import { remove } from './remove';
import { set } from './set';

/**
 * 遍历 keyPath 中的每一项, 调用 updater 更新 collection 中对应值
 *
 * 更新的前置处理
 */
export function updateIn(collection, keyPath, notSetValue, updater) {
  if (!updater) {
    updater = notSetValue;
    notSetValue = undefined;
  }
  const updatedValue = updateInDeeply(
    isImmutable(collection),
    collection,
    coerceKeyPath(keyPath),
    0,
    notSetValue,
    updater
  );
  return updatedValue === NOT_SET ? notSetValue : updatedValue;
}

/**
 * 递归遍历 keyPath 中的每一项, 调用 updater 更新现有值
 */
function updateInDeeply(
  _isImmutable,
  existing,
  keyPath,
  i,
  notSetValue,
  updater
) {
  // 如果对象未被赋值
  const wasNotSet = existing === NOT_SET;
  // 如果已经遍历到最后
  if (i === keyPath.length) {
    // 如果未被赋值则原有值修改为 notSetValue
    const existingValue = wasNotSet ? notSetValue : existing;
    // 调用 updater 更新原有值
    const newValue = updater(existingValue);
    // 新结果如果和原结果一致则返回原值
    return newValue === existingValue ? existing : newValue;
  }
  // 不是空对象, 且不是 immutable 提供的数据结构, 则直接报错
  if (!wasNotSet && !isDataStructure(existing)) {
    throw new TypeError(
      'Cannot update within non-data-structure value in path [' +
        keyPath.slice(0, i).map(quoteString) +
        ']: ' +
        existing
    );
  }
  const key = keyPath[i];
  // 获取下一个现有值
  const nextExisting = wasNotSet ? NOT_SET : get(existing, key, NOT_SET);
  // 更新下一个现有值
  const nextUpdated = updateInDeeply(
    nextExisting === NOT_SET ? _isImmutable : isImmutable(nextExisting),
    nextExisting,
    keyPath,
    i + 1,
    notSetValue,
    updater
  );
  // 如果更新后和现有的结果相同则直接返回原值, 否则更新后结果为被赋值则移除原对象中对应的键, 否则更新原对象
  return nextUpdated === nextExisting
    ? existing
    : nextUpdated === NOT_SET
    ? remove(existing, key)
    : set(
        wasNotSet ? (_isImmutable ? emptyMap() : {}) : existing,
        key,
        nextUpdated
      );
}
