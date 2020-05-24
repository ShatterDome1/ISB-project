import { ShapeModel, ShapeDimensions } from "./ShapeModel";

// A circle is basically an ellipse with the same width and height radius
export class EllipseModel extends ShapeModel {
  constructor(dimensions: ShapeDimensions) {
    super();
    this.calculateArea(dimensions);
  }

  // Round the resulting area for better viewing
  calculateArea(circleDimensions: ShapeDimensions) {
    this.area = Math.round(
      Math.PI * circleDimensions.width * circleDimensions.height
    );
  }
}
