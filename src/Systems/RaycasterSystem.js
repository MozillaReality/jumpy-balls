import { System } from "ecsy";
import * as THREE from "three";
import { Position, Text } from "ecsy-three";
import {
  UI,
  Parent,
  Geometry,
  Button,
  Raycaster,
  RaycastReceiver,
  Object3D,
  InputState
} from "../Components/components.js";

export class RaycasterSystem extends System {
  execute(delta, time) {
    /*
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      const component = entity.getComponent(RaycastReceiver);
      console.log(component);
    }
    */

    let inputState = this.queries.inputState.results[0].getComponent(
      InputState
    );

    this.queries.raycasters.added.forEach(raycaster => {
      var raycaster = new THREE.Raycaster();
    });

    this.queries.raycasters.results.forEach(raycaster => {
      let raycasterComponent = raycaster.getComponent(Raycaster);
      if (!raycasterComponent.enabled) {
        return;
      }

      var objects = this.queries.receivers.results.map(entity => {
        var object = entity.getComponent(Object3D).value;
        object.userData.entity = entity;
        return object;
      });

      let raycast = raycasterComponent.value;

      var tempMatrix = new THREE.Matrix4();
      var holder = raycaster.getComponent(Object3D).value.children[0];
      tempMatrix.identity().extractRotation(holder.matrixWorld);

      raycast.ray.origin.setFromMatrixPosition(holder.matrixWorld);
      raycast.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

      //tempMatrix.identity().extractRotation(controller.matrixWorld);

      //raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
      //raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
      let intersections = raycast.intersectObjects(objects, true);

      //inputState.
      let obj = raycaster.getComponent(Object3D).value;
      let vrcontrollerGroup = obj ? obj.children[0] : null; //@hack
      let controllerInputState = inputState.vrcontrollers.get(
        vrcontrollerGroup
      );

      if (intersections.length > 0) {
        let intersection = intersections[0];
        let object = intersection.object;
        let entity = object.userData.entity;
        while (!entity && object.parent) {
          object = object.parent;
          entity = object.userData.entity;
        }

        if (entity) {
          const receiverHandler = entity.getComponent(RaycastReceiver);

          if (!receiverHandler.hovering) {
            receiverHandler.hovering = true;
            receiverHandler.onEnter(intersection);
          }
          receiverHandler.onHover && receiverHandler.onHover(intersection);

          if (controllerInputState && controllerInputState.selectStart) {
            receiverHandler.onSelectStart &&
              receiverHandler.onSelectStart(intersection);
          }

          raycasterComponent.currentEntity = entity;
        }
      } else {
        if (raycasterComponent.currentEntity) {
          const receiverHandler = raycasterComponent.currentEntity.getComponent(
            RaycastReceiver
          );

          if (receiverHandler.hovering) {
            receiverHandler.hovering = false;
            receiverHandler.onLeave && receiverHandler.onLeave();
          }

          raycasterComponent.currentEntity = null;
        }
      }
    });
  }
}

RaycasterSystem.queries = {
  raycasters: {
    components: [Raycaster],
    listen: {
      added: true,
      removed: true,
      changed: true // [RaycasterReceiver]
    }
  },
  receivers: {
    components: [RaycastReceiver],
    listen: {
      added: true,
      removed: true,
      changed: true // [RaycasterReceiver]
    }
  },
  inputState: {
    components: [InputState]
  }
};