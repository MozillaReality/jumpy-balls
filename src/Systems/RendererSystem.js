import { System } from "../../node_modules/ecsy/build/ecsy.module.js";
import { CameraRig, Object3D } from "../Components/components.mjs";

export class RendererSystem extends System {
  init() {
    window.addEventListener(
      "resize",
      () => {
        this.world.components.threeContext.renderer.setSize(
          window.innerWidth,
          window.innerHeight
        );
      },
      false
    );

    return {
      queries: {
        activeCamera: { components: [CameraRig] }
      }
    };
  }

  execute() {
    var threeContext = this.world.components.threeContext;
    var camera = this.queries.activeCamera[0].getComponent(Object3D).object
      .children[0];
    threeContext.renderer.render(threeContext.scene, camera);
  }
}
