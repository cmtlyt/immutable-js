/**
 * 如果传入的对象为否值，则抛出指定错误
 */
export default function invariant(condition, error) {
  if (!condition) throw new Error(error);
}
