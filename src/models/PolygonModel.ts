import { ShapeModel, ShapeDimensions } from "./ShapeModel";

export class PolygonModel extends ShapeModel {
  constructor(dimensions: ShapeDimensions) {
    super();

    this.calculateArea(dimensions);
  }

  // Round the resulting area for better viewing
  calculateArea(dimensions: ShapeDimensions) {
    if (dimensions.coordinates) {
      // https://www.mathsisfun.com/geometry/area-irregular-polygons.html
      let width = 0;
      let height = 0;
      let result = 0;
      for (let i = 0; i < dimensions.coordinates.length - 1; i++) {
        height =
          (dimensions.coordinates[i].y + dimensions.coordinates[i + 1].y) / 2;
        width = dimensions.coordinates[i].x - dimensions.coordinates[i + 1].x;
        result += width * height;
      }
      this.area = Math.round(result);
    } else {
      throw new Error("Irregular polygons should be given the points");
    }
  }
}
