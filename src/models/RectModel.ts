import { ShapeModel, ShapeDimensions } from "./ShapeModel";

export class RectModel extends ShapeModel {
  constructor(dimensions: ShapeDimensions) {
    super();

    this.calculateArea(dimensions);
  }

  // Round the resulting area for better viewing
  calculateArea(rectDimensions: ShapeDimensions) {
    this.area = Math.round(rectDimensions.width * rectDimensions.height);
  }
}
