import { ValueController } from "./ValueController";
import { ValueView } from "../views/ValueView";
import { ValueModel } from "../models/ValueModel";

export class ShapesTotalController extends ValueController {
  constructor(view: ValueView, model: ValueModel) {
    super(view, model);
  }

  shapeAdded() {
    let currentValue = this.model.getValue();
    this.model.setValue(++currentValue);
    // currentValue is now incremented
    this.view.updateValue(currentValue.toString());
  }

  shapeRemoved() {
    let currentValue = this.model.getValue();
    this.model.setValue(--currentValue);
    // currentValue is now decremented
    this.view.updateValue(currentValue.toString());
  }
}
