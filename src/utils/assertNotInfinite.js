import invariant from './invariant';

/**
 * 断言尺寸不为无穷
 */
export default function assertNotInfinite(size) {
  invariant(
    size !== Infinity,
    'Cannot perform this action with an infinite size.'
  );
}
