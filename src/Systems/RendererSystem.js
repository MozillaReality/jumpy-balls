import { System } from "../../node_modules/ecsy/build/ecsy.module.js";
import {
  ThreeContext,
  CameraRig,
  Object3D
} from "../Components/components.mjs";

export class RendererSystem extends System {
  init() {
    window.addEventListener(
      "resize",
      () => {
        var threeContext = this.queries.threeContext.results[0].getComponent(
          ThreeContext
        );

        threeContext.renderer.setSize(window.innerWidth, window.innerHeight);
      },
      false
    );
  }

  execute() {
    var threeContext = this.queries.threeContext.results[0].getComponent(
      ThreeContext
    );
    var camera = this.queries.activeCamera.results[0].getComponent(Object3D)
      .value.children[0];
    threeContext.renderer.render(threeContext.scene, camera);
  }
}

RendererSystem.queries = {
  activeCamera: {
    components: [CameraRig]
  },
  threeContext: {
    components: [ThreeContext]
  }
};
