import { EllipseView } from "../views/EllipseView";
import { PolygonView } from "../views/PolygonView";
import { Autobind } from "../decorators/Autobind";
import { ShapeStyle } from "../views/ShapeComponent";
import * as PIXI from "pixi.js";
import { RectView } from "../views/RectView";
import { RectModel } from "../models/RectModel";
import { EllipseModel } from "../models/EllipseModel";
import { PolygonModel } from "../models/PolygonModel";
import { AreaTotalController } from "./AreaTotalController";
import { ShapesTotalController } from "./ShapesTotalController";

// Not really the best typing. Generics would fit better
type ShapeObject = {
  view: EllipseView | PolygonView | RectView;
  model: EllipseModel | PolygonModel | RectModel;
};

enum ShapeType {
  CIRCLE = 1,
  ELLIPSE,
  POLIGON,
  RECTANGLE,
}

export class ShapeController {
  private shapes: ShapeObject[] = [];
  private engineApp: PIXI.Application;
  private gravity: number = 0;
  private interval: number;
  private areaTotalController: AreaTotalController;
  private shapesTotalController: ShapesTotalController;

  // Could have also used the shortened version by adding private
  // to the parameters in the constructor.
  constructor(
    engineApp: PIXI.Application,
    gravity: number,
    interval: number,
    areaTotalController: AreaTotalController,
    shapesTotalController: ShapesTotalController
  ) {
    this.engineApp = engineApp;
    this.gravity = gravity;
    this.interval = interval;
    this.areaTotalController = areaTotalController;
    this.shapesTotalController = shapesTotalController;

    setInterval(this.spawnRandom, 1000.0);

    this.engineApp.stage.on("pointerdown", this.createShapeAtPos);
    this.engineApp.ticker.add(this.fallDown);
  }

  @Autobind
  spawnRandom() {
    for (let i = 0; i < this.interval; i++) {
      this.createRandomShape(
        this.generateRandomInt(this.engineApp.view.width - 60, 30),
        -60
      );
    }
  }

  @Autobind
  createShapeAtPos(e: PIXI.interaction.InteractionEvent) {
    let pos = e.data.global;
    this.createRandomShape(pos.x, pos.y);
  }

  createRandomShape(x: number, y: number) {
    // Generate a random number from 1 to 4
    let shapeType = this.generateRandomInt(4, 1);

    switch (shapeType) {
      case ShapeType.CIRCLE:
        const circleRadius = this.generateRandomInt(30, 30);

        const circleView = new EllipseView(
          { x: x, y: y },
          this.generateRandomStyle(),
          circleRadius,
          circleRadius
        );

        const circleModel = new EllipseModel({
          width: circleRadius,
          height: circleRadius,
        });
        this.addView({ view: circleView, model: circleModel });
        break;

      case ShapeType.ELLIPSE:
        const ellipseWidthRadius = this.generateRandomInt(30, 30);
        const ellipseHeightRadius = this.generateRandomInt(30, 30);

        const ellipseView = new EllipseView(
          { x: x, y: y },
          this.generateRandomStyle(),
          ellipseWidthRadius,
          ellipseHeightRadius
        );

        const ellipseModel = new EllipseModel({
          width: ellipseWidthRadius,
          height: ellipseHeightRadius,
        });
        this.addView({ view: ellipseView, model: ellipseModel });
        break;

      case ShapeType.POLIGON:
        let points: PIXI.Point[] = [];

        // generates a number between 3-6
        const noOfPoints = this.generateRandomInt(4, 3);
        const baseLength = 20;

        // Manipulate the randomness of the points as the resulting objects
        // will not look as expected
        if (noOfPoints >= 3) {
          // x positive, y positive (first quadrant)
          points.push(
            new PIXI.Point(
              this.generateRandomInt(30, baseLength),
              this.generateRandomInt(30, baseLength)
            )
          );
          // x negative, y positive (second quadrant)
          points.push(
            new PIXI.Point(
              Math.floor(-(Math.random() * 30 + baseLength)),
              this.generateRandomInt(30, baseLength)
            )
          );
          // x negative, y negative (third quadrant)
          points.push(
            new PIXI.Point(
              Math.floor(-(Math.random() * 30 + baseLength)),
              Math.floor(-(Math.random() * 30 + baseLength))
            )
          );
        }

        if (noOfPoints >= 4) {
          // x = 0, y negative
          points.push(
            new PIXI.Point(0, Math.floor(-(Math.random() * 30 + baseLength)))
          );
        }

        if (noOfPoints >= 5) {
          // x positive, y negative (fourth quadrant)
          points.push(
            new PIXI.Point(
              this.generateRandomInt(30, baseLength),
              -this.generateRandomInt(30, baseLength)
            )
          );
        }

        if (noOfPoints === 6) {
          // x positive, y = 0
          points.push(
            new PIXI.Point(this.generateRandomInt(30, baseLength), 0)
          );
        }

        const polygonView = new PolygonView(
          { x: x, y: y },
          this.generateRandomStyle(),
          points
        );

        const polygonModel = new PolygonModel({
          width: 0,
          height: 0,
          coordinates: points,
        });

        this.addView({ view: polygonView, model: polygonModel });
        break;

      case ShapeType.RECTANGLE:
        const rectWidth = this.generateRandomInt(30, 30);
        const rectHeight = this.generateRandomInt(30, 30);
        const rectView = new RectView(
          { x: x, y: y },
          this.generateRandomStyle(),
          rectWidth,
          rectHeight
        );

        const rectModel = new RectModel({
          width: rectWidth,
          height: rectHeight,
        });

        this.addView({ view: rectView, model: rectModel });
        break;
    }
  }

  generateRandomStyle(): ShapeStyle {
    // Random hex color generator taken from the following link
    // https://dev.to/akhil_001/generating-random-color-with-single-line-of-js-code-fhj
    const fill = "0x" + this.generateRandomInt(16777215).toString(16);
    const style = "0x" + this.generateRandomInt(16777215).toString(16);
    const border = this.generateRandomInt(4, 3);

    return { fillColor: +fill, lineStyle: [border, +style] };
  }

  // Function that returns a random integer from y to y + (x - 1)
  // Defaults are x = 1 and y = 0
  generateRandomInt(x: number = 1, y: number = 0) {
    return Math.floor(Math.random() * x + y);
  }

  @Autobind
  fallDown() {
    for (let i = 0; i < this.shapes.length; i++) {
      if (
        this.shapes[i].view.getShape().y -
          this.shapes[i].view.getShape().height >
        this.engineApp.view.height
      ) {
        this.removeView(i);
      } else {
        this.shapes[i].view.moveDown(this.gravity);
      }
    }
  }

  @Autobind
  removeClickedShape(e: PIXI.interaction.InteractionEvent) {
    for (let i = 0; i < this.shapes.length; i++) {
      if (
        e.currentTarget.x === this.shapes[i].view.getShape().x &&
        e.currentTarget.y === this.shapes[i].view.getShape().y
      ) {
        this.removeView(i);
        break;
      }
    }
  }

  addView(object: ShapeObject) {
    this.shapes.push(object);
    object.view.add(this.engineApp.stage);
    object.view.getShape().on("pointerdown", this.removeClickedShape);

    this.areaTotalController.shapeAdded(object.model.getArea());
    this.shapesTotalController.shapeAdded();
  }

  removeView(position: number) {
    this.shapes[position].view.remove(this.engineApp.stage);

    this.areaTotalController.shapeRemoved(
      this.shapes[position].model.getArea()
    );
    this.shapesTotalController.shapeRemoved();

    this.shapes.splice(position, 1);
  }

  setGravity(updatedValue: number) {
    this.gravity = updatedValue;
  }

  setInterval(updatedValue: number) {
    this.interval = updatedValue;
  }

  getShapes() {
    return this.shapes;
  }
}
