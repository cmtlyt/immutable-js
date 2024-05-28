/**
 * 判断对象存在且具有 equals 和 hashCode 方法
 */
export function isValueObject(maybeValue) {
  return Boolean(
    maybeValue &&
      typeof maybeValue.equals === 'function' &&
      typeof maybeValue.hashCode === 'function'
  );
}
