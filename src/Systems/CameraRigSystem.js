/* global THREE */
import { System } from "../../node_modules/ecsy/build/ecsy.module.js";
import {
  Object3D,
  Parent,
  CameraRig,
  VRController
} from "../Components/components.mjs";

export class CameraRigSystem extends System {
  init() {
    window.addEventListener("resize", this.onWindowResize.bind(this), false);

    return {
      queries: {
        entities: {
          components: [CameraRig],
          events: {
            added: {
              event: "EntityAdded"
            }
          }
        }
      }
    };
  }

  execute() {
    this.events.entities.added.forEach(entity => {
      var cameraRig = new THREE.Group();
      const camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      cameraRig.add(camera);
      entity.addComponent(Object3D, { object: cameraRig });
      cameraRig.add(camera);
      cameraRig.position.set(0, 0, 1);
      //cameraRig.position.set(0, 0, 5);

      // Controllers
      this.world
        .createEntity()
        .addComponent(VRController, { id: 0 })
        .addComponent(Parent, { parent: cameraRig });
      this.world
        .createEntity()
        .addComponent(VRController, { id: 1 })
        .addComponent(Parent, { parent: cameraRig });

      this.world.components.threeContext.scene.add(cameraRig);
    });
  }

  onWindowResize() {
    this.queries.entities.forEach(entity => {
      // ugly
      var camera = entity.getComponent(Object3D).object.children[0];
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });
  }
}
