import * as THREE from "three";
import { System } from "ecsy";
import {
  Object3DComponent,
  Parent,
  Active,
  UpdateAspectOnResizeTag,
  Camera,
  CameraRig,
  VRController
} from "../Components/components.js";
import { Position } from "ecsy-three";

export class CameraRigSystem extends System {
  init() {
    window.addEventListener("resize", this.onWindowResize.bind(this), false);
  }

  execute() {
    this.queries.entities.added.forEach(entity => {
      var cameraRig = new THREE.Group();
      entity
        .addComponent(Object3DComponent, { value: cameraRig })
        .addComponent(Position, { value: new THREE.Vector3(0, 0, 0.5) });

      // Deactivate all the other cameras
      let activeCams = this.world.entityManager.queryComponents([
        Camera,
        Active
      ]).entities;
      activeCams.forEach(entity => {
        entity.removeComponent(Active);
      });

      this.world
        .createEntity()
        .addComponent(Position, {
          value: new THREE.Vector3(0, 1.6, -0.6)
        })
        .addObject3DComponent(
          new THREE.PerspectiveCamera(
            90,
            window.innerWidth / window.innerHeight,
            0.1,
            500
          ),
          entity
        )
        .addComponent(UpdateAspectOnResizeTag)
        //.addComponent(Parent, { value: entity });
        .addComponent(Active);

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
      /*
      var camera = entity.getObject3D().children[0];
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      */
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
