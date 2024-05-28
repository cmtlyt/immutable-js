export const IS_STACK_SYMBOL = '@@__IMMUTABLE_STACK__@@';

/**
 * 判断对象是 immutable Stack
 */
export function isStack(maybeStack) {
  return Boolean(maybeStack && maybeStack[IS_STACK_SYMBOL]);
}
