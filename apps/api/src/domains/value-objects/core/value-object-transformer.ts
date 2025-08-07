import { ValueTransformer } from 'typeorm';

import { ValueObject } from './value-object';

interface NewableClass<T> {
  new (...args: any[]): T;
}

export function ValueObjectTransformer<T>(
  ValueObjectClass: NewableClass<ValueObject<T>>,
): ValueTransformer {
  return {
    from: (value): string => new ValueObjectClass(value).toString(),
    to: ({ value }: ValueObject<T>): T => value,
  };
}
