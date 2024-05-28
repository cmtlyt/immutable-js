const toString = Object.prototype.toString;

/**
 * 判断是否是纯粹的对象
 */
export default function isPlainObject(value) {
  // The base prototype's toString deals with Argument objects and native namespaces like Math
  if (
    !value ||
    typeof value !== 'object' ||
    toString.call(value) !== '[object Object]'
  ) {
    return false;
  }

  const proto = Object.getPrototypeOf(value);
  if (proto === null) {
    return true;
  }

  // 判断是主页面的对象还是iframe的对象
  // Iteratively going up the prototype chain is needed for cross-realm environments (differing contexts, iframes, etc)
  let parentProto = proto;
  let nextProto = Object.getPrototypeOf(proto);
  while (nextProto !== null) {
    parentProto = nextProto;
    nextProto = Object.getPrototypeOf(parentProto);
  }
  return parentProto === proto;
}
