import { is } from '../is';
import { NOT_SET } from '../TrieUtils';
import { isCollection } from '../predicates/isCollection';
import { isKeyed } from '../predicates/isKeyed';
import { isIndexed } from '../predicates/isIndexed';
import { isAssociative } from '../predicates/isAssociative';
import { isOrdered } from '../predicates/isOrdered';

/**
 * 深度比较两个对象相等
 */
export default function deepEqual(a, b) {
  // 两个对象全等
  if (a === b) {
    return true;
  }

  // 不是对象
  const notObject = !isCollection(b);
  // 不是同样大小
  const notSameSize =
    a.size !== undefined && b.size !== undefined && a.size !== b.size;
  // 不是同样hash
  const notSameHash =
    a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash;
  // 使用不同的索引方式
  const notSameKeyed =
    isKeyed(a) !== isKeyed(b) || isIndexed(a) !== isIndexed(b);
  // 否是都是有序的
  const notSameOrdered = isOrdered(a) !== isOrdered(b);
  if (
    notObject ||
    notSameSize ||
    notSameHash ||
    notSameKeyed ||
    notSameOrdered
  ) {
    return false;
  }

  // 空对象
  if (a.size === 0 && b.size === 0) {
    return true;
  }

  // 是否能被索引
  const notAssociative = !isAssociative(a);

  // 如果有序的话, 遍历判断元素、索引、长度是否相等
  if (isOrdered(a)) {
    const entries = a.entries();
    return (
      b.every((v, k) => {
        const entry = entries.next().value;
        // 判断值是否相等, 判断键是否相等
        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
      }) &&
      // 判断是否遍历完
      entries.next().done
    );
  }

  // 判断对象是否被交换
  let flipped = false;

  // 如果不存在 size 属性, 尝试缓存 a 对象, 或尝试交换对象
  if (a.size === undefined) {
    if (b.size === undefined) {
      if (typeof a.cacheResult === 'function') {
        a.cacheResult();
      }
    } else {
      flipped = true;
      const _ = a;
      a = b;
      b = _;
    }
  }

  let allEqual = true;

  // TODO: 未知...
  const bSize = b.__iterate((v, k) => {
    // 判断两个对象中的值是否相等
    if (
      notAssociative
        ? // 判断 a 中是否存在 b 中的值
          !a.has(v)
        : 
        // ? 这个反转的必要性在哪
        flipped
        ? !is(v, a.get(k, NOT_SET))
        : !is(a.get(k, NOT_SET), v)
    ) {
      allEqual = false;
      return false;
    }
  });

  // 判断值是否相等, 并且长度一致
  return allEqual && a.size === bSize;
}
