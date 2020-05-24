import * as PIXI from "pixi.js";

export type ShapePosition = {
  x: number;
  y: number;
};

export type ShapeStyle = {
  fillColor: number;
  lineStyle: [number, number];
};

export class ShapeComponent {
  protected shape: PIXI.Graphics;

  constructor(shapePosition: ShapePosition) {
    this.shape = new PIXI.Graphics();

    this.shape.x = shapePosition.x;
    this.shape.y = shapePosition.y;

    this.shape.interactive = true;
    this.shape.buttonMode = true;
  }

  drawShape(
    shape: PIXI.Circle | PIXI.Ellipse | PIXI.Polygon | PIXI.Rectangle,
    shapeStyle: ShapeStyle
  ) {
    // Draw the shape with the specific colors
    this.shape.lineStyle(shapeStyle.lineStyle[0], shapeStyle.lineStyle[1]);
    this.shape.beginFill(shapeStyle.fillColor);
    this.shape.drawShape(shape);
    this.shape.endFill();
    this.shape.closePath();
  }

  add(stage: PIXI.Container) {
    stage.addChild(this.shape);
  }

  remove(stage: PIXI.Container) {
    stage.removeChild(this.shape);
  }

  moveDown(value: number) {
    this.shape.y += value;
  }

  getShape() {
    return this.shape;
  }
}
