import { Engine } from "../Engine";
import { ShapeController } from "./ShapeController";
import { ValueModel } from "../models/ValueModel";
import { ValueView } from "../views/ValueView";
import { GravityController } from "./GravityController";
import { IntervalController } from "./IntervalController";
import { AreaTotalController } from "./AreaTotalController";
import { ShapesTotalController } from "./ShapesTotalController";

export class AppController {
  private engine: Engine;
  private shapeController: ShapeController;

  constructor(engine: Engine) {
    this.engine = engine;

    // Gravity
    const gravityModel = new ValueModel(2);
    const gravityView = new ValueView(
      "gravityValue",
      gravityModel.getValue().toString()
    );

    // No of shapes per second
    const intervalModel = new ValueModel(4);
    const intervalView = new ValueView(
      "intervalValue",
      intervalModel.getValue().toString()
    );

    const areaTotalModel = new ValueModel(0);
    const areaTotalView = new ValueView(
      "areaTotal",
      areaTotalModel.getValue().toString()
    );
    const areaTotalController = new AreaTotalController(
      areaTotalView,
      areaTotalModel
    );

    const shapesTotalModel = new ValueModel(0);
    const shapesTotalView = new ValueView(
      "shapesTotal",
      shapesTotalModel.getValue().toString()
    );
    const shapesTotalController = new ShapesTotalController(
      shapesTotalView,
      shapesTotalModel
    );

    this.shapeController = new ShapeController(
      engine.app,
      gravityModel.getValue(),
      intervalModel.getValue(),
      areaTotalController,
      shapesTotalController
    );

    new GravityController(
      gravityView,
      gravityModel,
      "gravityUp",
      "gravityDown",
      this.shapeController
    );

    new IntervalController(
      intervalView,
      intervalModel,
      "intervalUp",
      "intervalDown",
      this.shapeController
    );

    this.engine.app.ticker.add(this.shapeController.fallDown);
  }
}
