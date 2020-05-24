// Autobind decorator
export function Autobind(
  _target: any,
  _name: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const customDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };

  return customDescriptor;
}
