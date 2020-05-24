import { ShapeComponent, ShapePosition, ShapeStyle } from "./ShapeComponent";
import * as PIXI from "pixi.js";

// A circle is basically an ellipse with the same width and height radius
export class EllipseView extends ShapeComponent {
  constructor(
    ellipsePosition: ShapePosition,
    ellipseStyle: ShapeStyle,
    widthRadius: number,
    heightRadius: number
  ) {
    super(ellipsePosition);

    this.drawShape(
      new PIXI.Ellipse(0, 0, widthRadius, heightRadius),
      ellipseStyle
    );
  }
}
