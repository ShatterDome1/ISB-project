import { ShapeComponent, ShapePosition, ShapeStyle } from "./ShapeComponent";
import * as PIXI from "pixi.js";

export class RectView extends ShapeComponent {
  constructor(
    rectPosition: ShapePosition,
    rectStyle: ShapeStyle,
    width: number,
    height: number
  ) {
    super(rectPosition);

    this.drawShape(new PIXI.Rectangle(0, 0, width, height), rectStyle);
  }
}
