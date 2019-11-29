import * as THREE from "three";
import { System } from "ecsy";
import {
  Object3D,
  Parent,
  Active,
  Camera,
  CameraRig,
  VRController
} from "../Components/components.js";

export class CameraRigSystem extends System {
  init() {
    window.addEventListener("resize", this.onWindowResize.bind(this), false);
  }

  execute() {
    this.queries.entities.added.forEach(entity => {
      var cameraRig = new THREE.Group();
      entity.addComponent(Object3D, { value: cameraRig });
      this.world
        .createEntity()
        .addComponent(Camera, {
          fov: 90,
          aspect: window.innerWidth / window.innerHeight,
          near: 1,
          far: 1000,
          layers: 1,
          handleResize: true
        })
        .addComponent(Active)
        .addComponent(Parent, { value: entity });

      // Controllers
      this.world
        .createEntity()
        .addComponent(VRController, { id: 0 })
        .addComponent(Parent, { value: entity });
      this.world
        .createEntity()
        .addComponent(VRController, { id: 1 })
        .addComponent(Parent, { value: entity });
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
  }
};
