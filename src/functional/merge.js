import { isImmutable } from '../predicates/isImmutable';
import { isIndexed } from '../predicates/isIndexed';
import { isKeyed } from '../predicates/isKeyed';
import { IndexedCollection, KeyedCollection } from '../Collection';
import { Seq } from '../Seq';
import hasOwnProperty from '../utils/hasOwnProperty';
import isDataStructure from '../utils/isDataStructure';
import shallowCopy from '../utils/shallowCopy';

/**
 * @alias mergeWithSources
 * 直接使用传入值覆盖 collection
 * 简化 sources 传参
 */
export function merge(collection, ...sources) {
  return mergeWithSources(collection, sources);
}

/**
 * @alias mergeWithSources
 * 简化 sources 传参
 */
export function mergeWith(merger, collection, ...sources) {
  return mergeWithSources(collection, sources, merger);
}

/**
 * @alias mergeDeepWithSources
 * 直接使用传入值覆盖 collection
 */
export function mergeDeep(collection, ...sources) {
  return mergeDeepWithSources(collection, sources);
}

/**
 * @alias mergeDeepWithSources
 * 可以自定义 merger 规则
 */
export function mergeDeepWith(merger, collection, ...sources) {
  return mergeDeepWithSources(collection, sources, merger);
}

/**
 * @alias mergeWithSources
 * 并使用 deepMergerWith 封装merger
 */
export function mergeDeepWithSources(collection, sources, merger) {
  return mergeWithSources(collection, sources, deepMergerWith(merger));
}

/**
 * 如果 collection 是 immutable 内置对象则直接使用内置对象的 merge 方法或 concat 方法
 * 否则根据 collection 的类型从 sources items 创建一个新的集合, 然后遍历合并到 collection 中
 * 当然也是浅拷贝后赋值
 */
export function mergeWithSources(collection, sources, merger) {
  if (!isDataStructure(collection)) {
    throw new TypeError(
      'Cannot merge into non-data-structure value: ' + collection
    );
  }
  if (isImmutable(collection)) {
    return typeof merger === 'function' && collection.mergeWith
      ? collection.mergeWith(merger, ...sources)
      : collection.merge
      ? collection.merge(...sources)
      : collection.concat(...sources);
  }
  const isArray = Array.isArray(collection);
  let merged = collection;
  const Collection = isArray ? IndexedCollection : KeyedCollection;
  const mergeItem = isArray
    ? value => {
        // Copy on write
        if (merged === collection) {
          merged = shallowCopy(merged);
        }
        merged.push(value);
      }
    : (value, key) => {
        const hasVal = hasOwnProperty.call(merged, key);
        const nextVal =
          hasVal && merger ? merger(merged[key], value, key) : value;
        if (!hasVal || nextVal !== merged[key]) {
          // Copy on write
          if (merged === collection) {
            merged = shallowCopy(merged);
          }
          merged[key] = nextVal;
        }
      };
  for (let i = 0; i < sources.length; i++) {
    Collection(sources[i]).forEach(mergeItem);
  }
  return merged;
}

/**
 * 创建一个深度合并函数
 * 如果是 immutable 内置对象则调用 mergeWithSources 方法合并
 * 否则使用传入的 merger 函数
 * 如果都不满足则直接返回新值
 */
function deepMergerWith(merger) {
  function deepMerger(oldValue, newValue, key) {
    if (
      isDataStructure(oldValue) &&
      isDataStructure(newValue) &&
      areMergeable(oldValue, newValue)
    ) {
      return mergeWithSources(oldValue, [newValue], deepMerger);
    }
    if (merger) {
      return merger(oldValue, newValue, key);
    }
    return newValue;
  }
  return deepMerger;
}

/**
 * It's unclear what the desired behavior is for merging two collections that
 * fall into separate categories between keyed, indexed, or set-like, so we only
 * consider them mergeable if they fall into the same category.
 * 判断是否为同一类别的集合
 */
function areMergeable(oldDataStructure, newDataStructure) {
  const oldSeq = Seq(oldDataStructure);
  const newSeq = Seq(newDataStructure);
  // This logic assumes that a sequence can only fall into one of the three
  // categories mentioned above (since there's no `isSetLike()` method).
  return (
    isIndexed(oldSeq) === isIndexed(newSeq) &&
    isKeyed(oldSeq) === isKeyed(newSeq)
  );
}
