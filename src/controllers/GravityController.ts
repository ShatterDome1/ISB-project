import { ValueController, InteractiveValue } from "./ValueController";
import { ShapeController } from "./ShapeController";
import { ValueView } from "../views/ValueView";
import { ValueModel } from "../models/ValueModel";
import { Autobind } from "../decorators/Autobind";

export class GravityController extends ValueController
  implements InteractiveValue {
  private upButton: HTMLButtonElement;
  private downButton: HTMLButtonElement;
  private shapeController: ShapeController;

  constructor(
    view: ValueView,
    model: ValueModel,
    upID: string,
    downID: string,
    shapeController: ShapeController
  ) {
    super(view, model);
    this.upButton = document.getElementById(upID) as HTMLButtonElement;
    this.downButton = document.getElementById(downID) as HTMLButtonElement;

    this.upButton.addEventListener("click", this.increment);
    this.downButton.addEventListener("click", this.decrement);

    this.shapeController = shapeController;
  }

  @Autobind
  increment() {
    let currentValue = this.model.getValue();
    this.model.setValue(++currentValue);
    this.view.updateValue(currentValue.toString());
    this.shapeController.setGravity(currentValue);
  }

  @Autobind
  decrement() {
    let currentValue = this.model.getValue();
    if (currentValue >= 1) {
      this.model.setValue(--currentValue);
      this.view.updateValue(currentValue.toString());
      this.shapeController.setGravity(currentValue);
    }
  }
}
