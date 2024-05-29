import { isImmutable } from '../predicates/isImmutable';
import { has } from './has';

/**
 * 从集合中获取 key 对应的值, 如果不存在则返回 notSetValue
 */
export function get(collection, key, notSetValue) {
  if(isImmutable(collection)){
    return collection.get(key, notSetValue);
  } else if (!has(collection, key)) {
    // * 前置判断不存在 key 则直接返回 notSetValue, 后面的 get 就不需要考虑不存在的情况返回 notSetValue 了
    return notSetValue;
  } else if (typeof collection.get === 'function') {
    return collection.get(key);
  } else {
    return collection[key];
  }
}
