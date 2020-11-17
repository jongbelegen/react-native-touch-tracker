export type ReactNativeFiberHostComponent = {
  _nativeTag: number;
  _children: [number | ReactNativeFiberHostComponent];
};

/* eslint-disable no-underscore-dangle */

export function getNodeIdsDeep(
  reactNode: ReactNativeFiberHostComponent
): number[] {
  return [
    reactNode._nativeTag,
    ...reactNode._children.map((child) => {
      if (typeof child === "number") {
        return child;
      }
      return getNodeIdsDeep(child);
    }),
  ].flat();
}

export function isReactFiberComponentType(
  obj: unknown
): obj is ReactNativeFiberHostComponent {
  const castedObj = obj as ReactNativeFiberHostComponent;
  return "_nativeTag" in castedObj && "_children" in castedObj;
}

export function isNodeDescendantOf(
  node: ReactNativeFiberHostComponent,
  ofNode: ReactNativeFiberHostComponent
): boolean {
  const nodes = getNodeIdsDeep(ofNode);
  return nodes.includes(node._nativeTag);
}
