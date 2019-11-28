import * as THREE from "three";
import { System } from "ecsy";
import {
  Object3D,
  Parent,
  CameraRig,
  ThreeContext,
  VRController
} from "../Components/components.js";

export class CameraRigSystem extends System {
  init() {
    window.addEventListener("resize", this.onWindowResize.bind(this), false);
  }

  execute() {
    var threeContext = this.queries.threeContext.results[0].getComponent(
      ThreeContext
    );

    this.queries.entities.added.forEach(entity => {
      var cameraRig = new THREE.Group();
      const camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      cameraRig.add(camera);
      entity.addComponent(Object3D, { value: cameraRig });
      cameraRig.add(camera);
      cameraRig.position.set(0, 0, 1);
      cameraRig.position.set(0, 1, 5);

      // Controllers
      window.controller = this.world
        .createEntity()
        .addComponent(VRController, { id: 0 })
        .addComponent(Parent, { value: entity });
      this.world
        .createEntity()
        .addComponent(VRController, { id: 1 })
        .addComponent(Parent, { value: entity });

      threeContext.scene.add(cameraRig);
    });
  }

  onWindowResize() {
    this.queries.entities.results.forEach(entity => {
      // ugly
      var camera = entity.getComponent(Object3D).value.children[0];
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });
  }
}

CameraRigSystem.queries = {
  entities: {
    components: [CameraRig],
    listen: {
      added: true
    }
  },
  threeContext: {
    components: [ThreeContext]
  }
};
