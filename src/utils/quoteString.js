/**
 * Converts a value to a string, adding quotes if a string was provided.
 * 将值转为字符串, 如果提供了一个字符串, 则添加引号
 */
export default function quoteString(value) {
  try {
    return typeof value === 'string' ? JSON.stringify(value) : String(value);
  } catch (_ignoreError) {
    return JSON.stringify(value);
  }
}
