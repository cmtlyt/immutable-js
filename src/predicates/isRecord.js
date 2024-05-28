export const IS_RECORD_SYMBOL = '@@__IMMUTABLE_RECORD__@@';

/**
 * 判断对象是 immutable Record
 */
export function isRecord(maybeRecord) {
  return Boolean(maybeRecord && maybeRecord[IS_RECORD_SYMBOL]);
}
