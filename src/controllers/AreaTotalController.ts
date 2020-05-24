import { ValueController } from "./ValueController";
import { ValueView } from "../views/ValueView";
import { ValueModel } from "../models/ValueModel";

export class AreaTotalController extends ValueController {
  constructor(view: ValueView, model: ValueModel) {
    super(view, model);
  }

  shapeAdded(area: number) {
    let updatedValue = this.model.getValue() + area;
    this.model.setValue(updatedValue);
    this.view.updateValue(updatedValue.toString());
  }

  shapeRemoved(area: number) {
    let updatedValue = this.model.getValue() - area;
    this.model.setValue(updatedValue);
    this.view.updateValue(updatedValue.toString());
  }
}
