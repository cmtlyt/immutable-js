export const IS_SEQ_SYMBOL = '@@__IMMUTABLE_SEQ__@@';

/**
 * 判断对象是 immutable Seq
 */
export function isSeq(maybeSeq) {
  return Boolean(maybeSeq && maybeSeq[IS_SEQ_SYMBOL]);
}
