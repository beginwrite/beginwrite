import { ValueObject } from '../core/value-object';

export class UuidValueObject extends ValueObject<string> {
  declare readonly __name: 'UuidValueObject';

  public constructor(value: string) {
    super(value);
  }

  public static fromString(value: string): UuidValueObject {
    if (!this.isValid(value)) {
      throw new Error('Invalid UUID format');
    }
    return new UuidValueObject(value);
  }

  public static isValid(value: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
  }
}
