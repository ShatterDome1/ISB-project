import * as PIXI from "pixi.js";

export type ShapeDimensions = {
  width: number;
  height: number;
  coordinates?: PIXI.Point[];
};

export abstract class ShapeModel {
  protected area: number = 0;

  protected abstract calculateArea(dimensions: ShapeDimensions): void;

  getArea() {
    return this.area;
  }
}
