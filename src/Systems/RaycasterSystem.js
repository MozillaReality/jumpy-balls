import { System } from "ecsy";
import * as THREE from "three";
import {
  Raycaster,
  RaycastReceiver,
  Object3DComponent,
  InputState
} from "../Components/components.js";

export class RaycasterSystem extends System {
  init() {
    this.world.registerComponent(Raycaster);
  }

  execute() {
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

      var objects = this.queries.receivers.results
        .filter(entity => {
          var mask = entity.getComponent(RaycastReceiver).layerMask;
          return (mask & raycasterComponent.layerMask) !== 0;
        })
        .map(entity => {
          var object = entity.getObject3D();
          object.traverse(child => {
            child.userData.entity = entity;
          });
          return object;
        });

      if (objects.length === 0) {
        return;
      }

      let raycast = raycasterComponent.value;

      var tempMatrix = new THREE.Matrix4();
      var holder = raycaster.getObject3D().getObjectByName("controller");
      tempMatrix.identity().extractRotation(holder.matrixWorld);

      raycast.ray.origin.setFromMatrixPosition(holder.matrixWorld);
      raycast.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

      //tempMatrix.identity().extractRotation(controller.matrixWorld);

      //raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
      //raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
      let intersections = raycast.intersectObjects(objects, true);

      //inputState.
      let obj = raycaster.getObject3D();
      let vrcontrollerGroup = obj ? obj.children[0] : null; //@hack
      let controllerInputState = inputState.vrcontrollers.get(
        vrcontrollerGroup
      );

      //console.log('>>>',);

      if (intersections.length > 0) {
        // @hack to fix on the sdf text mesh
        let intersection = intersections[0].object.parent
          ? intersections[0]
          : intersections[1];

        let object = intersection.object;
        let entity = object.userData.entity;
        while (!entity && object.parent) {
          object = object.parent;
          entity = object.userData.entity;
        }

        if (entity) {
          const receiverHandler = entity.getComponent(RaycastReceiver);

          if (receiverHandler && !receiverHandler.hovering) {
            receiverHandler.hovering = true;
            receiverHandler.onEnter(intersection, raycaster);
          }

          receiverHandler.onHover &&
            receiverHandler.onHover(intersection, raycaster);

          if (controllerInputState) {
            if (
              controllerInputState.selectStart &&
              receiverHandler.onSelectStart
            ) {
              receiverHandler.onSelectStart(intersection, vrcontrollerGroup);
            }
          }

          raycasterComponent.currentEntity = entity;
        }
      } else {
        if (raycasterComponent.currentEntity) {
          const receiverHandler = raycasterComponent.currentEntity.getComponent(
            RaycastReceiver
          );

          if (receiverHandler && receiverHandler.hovering) {
            receiverHandler.hovering = false;
            receiverHandler.onLeave && receiverHandler.onLeave(raycaster);
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
