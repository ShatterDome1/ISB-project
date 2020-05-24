import { Engine } from "./Engine";
import { AppController } from "./controllers/AppController";

const engine = new Engine({
  containerId: "game",
  app: {
    backgroundColor: 0xcccccc,
  },
});

window.onload = create;

function create() {
  new AppController(engine);
}
