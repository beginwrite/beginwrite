export abstract class ValueObject<T> {
  abstract readonly __name: string;
  public readonly value: T;

  public constructor(value: T) {
    this.value = value;
  }

  public toString(): string {
    return String(this.value);
  }
}
