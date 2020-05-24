import { ValueView } from "../views/ValueView";
import { ValueModel } from "../models/ValueModel";

export interface InteractiveValue {
  increment(): void;
  decrement(): void;
}

export abstract class ValueController {
  protected view: ValueView;
  protected model: ValueModel;

  constructor(view: ValueView, model: ValueModel) {
    this.view = view;
    this.model = model;
  }
}
