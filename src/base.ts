export class UnreachableCaseError extends Error {
  constructor(value: never) {
    super(`Unreachable case: ${value}`);
  }
}

export function assert(condition: any, msg: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}

export function assertIsDefined<T>(
  val: T,
  msg: string,
): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(
      `Expected 'val' to be defined, but received ${val}. Error msg: ${msg}`,
    );
  }
}
