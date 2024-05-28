/**
 * 复制数组, 支持跳过前几个元素
 */
// http://jsperf.com/copy-array-inline
export default function arrCopy(arr, offset) {
  offset = offset || 0;
  // ? len 实际是数组元素的数量, 而不是数组的长度
  const len = Math.max(0, arr.length - offset);
  const newArr = new Array(len);
  // ? 这里为什么不直接把 ii 设置为 offset 而是每次都进行一次下标计算呢
  for (let ii = 0; ii < len; ii++) {
    newArr[ii] = arr[ii + offset];
  }
  return newArr;
}
