import * as PIXI from "pixi.js";
import { Autobind } from "./decorators/Autobind";

type EngineParams = {
  containerId: string;
  app: {
    canvasW?: number;
    canvasH?: number;
    backgroundColor?: number;
  };
};

export class Engine {
  // loader, renderer, stage defaulted
  public app: PIXI.Application;
  public container: HTMLDivElement;

  constructor(params: EngineParams) {
    this.app = new PIXI.Application(params.app);

    this.container = document.getElementById(
      params.containerId
    )! as HTMLDivElement;
    this.container.appendChild(this.app.view);

    this.app.resizeTo = this.container;

    this.app.stage.interactive = true;

    this.app.stage.hitArea = new PIXI.Rectangle(
      0,
      0,
      this.app.view.width,
      this.app.view.height
    );

    // Update the canvas hit area when resizing the window
    // because the resizeTo does not do it implicitely
    window.addEventListener("resize", this.updateHitArea);
  }

  @Autobind
  private updateHitArea() {
    this.app.stage.hitArea = new PIXI.Rectangle(
      0,
      0,
      this.app.view.width,
      this.app.view.height
    );
  }
}
