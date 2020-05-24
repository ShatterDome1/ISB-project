// This will be used to display the number of shapes spawned per second,
// total area, gravity and speed values
export class ValueView {
  private element: HTMLElement;

  constructor(id: string, value: string) {
    this.element = document.getElementById(id)!;
    this.element.innerHTML = value;
  }

  updateValue(updatedValue: string) {
    this.element.innerHTML = updatedValue;
  }
}
