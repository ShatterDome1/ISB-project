import { ShapeComponent, ShapePosition, ShapeStyle } from "./ShapeComponent";
import * as PIXI from "pixi.js";

export class PolygonView extends ShapeComponent {
  constructor(
    polygonPosition: ShapePosition,
    polygonStyle: ShapeStyle,
    points: PIXI.Point[]
  ) {
    super(polygonPosition);

    this.drawShape(new PIXI.Polygon(points), polygonStyle);
  }
}
