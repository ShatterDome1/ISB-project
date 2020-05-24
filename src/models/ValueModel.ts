// This will be used to model the number of shapes spawned per second,
// total area, gravity and speed values
export class ValueModel {
  private value: number;

  constructor(value: number) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  setValue(updatedValue: number) {
    this.value = updatedValue;
  }
}
