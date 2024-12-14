export function Sleep(ms: number): MethodDecorator {
    return function (target, propertyKey, descriptor: PropertyDescriptor) {
        const orginalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            await new Promise((resolve) => setTimeout(resolve, ms));
            return orginalMethod.apply(this, args)
        }

        return descriptor;
    }
}