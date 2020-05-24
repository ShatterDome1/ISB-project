import { Engine } from "./Engine";
import { ValueModel } from "./models/ValueModel";
import { ValueView } from "./views/ValueView";
import { ShapeController } from "./controllers/ShapeController";
import { GravityController } from "./controllers/GravityController";
import { IntervalController } from "./controllers/IntervalController";
import { AreaTotalController } from "./controllers/AreaTotalController";
import { ShapesTotalController } from "./controllers/ShapesTotalController";

window.onload = create;

function create() {
  const engine = new Engine({
    containerId: "game",
    app: {
      backgroundColor: 0xcccccc,
    },
  });

  // Gravity
  const gravityModel = new ValueModel(2);
  const gravityView = new ValueView(
    "gravityValue",
    gravityModel.getValue().toString()
  );

  // Interval
  const intervalModel = new ValueModel(4);
  const intervalView = new ValueView(
    "intervalValue",
    intervalModel.getValue().toString()
  );

  // Area total
  const areaTotalModel = new ValueModel(0);
  const areaTotalView = new ValueView(
    "areaTotal",
    areaTotalModel.getValue().toString()
  );
  const areaTotalController = new AreaTotalController(
    areaTotalView,
    areaTotalModel
  );

  // Number of shapes
  const shapesTotalModel = new ValueModel(0);
  const shapesTotalView = new ValueView(
    "shapesTotal",
    shapesTotalModel.getValue().toString()
  );
  const shapesTotalController = new ShapesTotalController(
    shapesTotalView,
    shapesTotalModel
  );

  // Shape controller
  const shapeController = new ShapeController(
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
    shapeController
  );

  new IntervalController(
    intervalView,
    intervalModel,
    "intervalUp",
    "intervalDown",
    shapeController
  );
}
