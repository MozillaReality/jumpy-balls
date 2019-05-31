/* global Ammo THREE */
import { Matrix4 } from "https://cdnjs.cloudflare.com/ajax/libs/three.js/105/three.module.js";
import { System } from "http://192.168.1.129:8080/build/ecsy.module.js";
import {
  VRController,
  Draggable,
  Object3D
} from "../Components/components.mjs";

var raycaster = new THREE.Raycaster();
var tempMatrix = new Matrix4();
var intersected = [];

export class VRControllerSystem extends System {
  init() {
    return {
      queries: {
        controllers: {
          components: [VRController],
          events: {
            added: {
              event: "EntityAdded"
            }
          }
        },
        objects: { components: [Draggable] }
      }
    };
  }

  onSelectStart(event) {
    var controller = event.target;
    var intersections = this.getIntersections(controller);

    if (intersections.length > 0) {
      var intersection = intersections[0];

      tempMatrix.getInverse(controller.matrixWorld);

      var object = intersection.object;
      object.matrix.premultiply(tempMatrix);
      object.matrix.decompose(object.position, object.quaternion, object.scale);
      object.material.emissive.b = 1;
      object.userData.previousParent = object.parent;
      controller.add(object);

      controller.userData.selected = object;
    }
  }

  onSelectEnd(event) {
    var controller = event.target;

    if (controller.userData.selected !== undefined) {
      var object = controller.userData.selected;
      object.matrix.premultiply(controller.matrixWorld);
      object.matrix.decompose(object.position, object.quaternion, object.scale);
      object.material.emissive.b = 0;
      object.userData.previousParent.add(object);

      controller.userData.selected = undefined;

      // Reposition
      const initialTransform = new Ammo.btTransform();
      initialTransform.setIdentity();
      initialTransform.setOrigin(
        new Ammo.btVector3(
          object.position.x,
          object.position.y,
          object.position.z
        )
      );
      initialTransform.setRotation(
        new Ammo.btQuaternion(
          object.quaternion.x,
          object.quaternion.y,
          object.quaternion.z,
          object.quaternion.w
        )
      );
      object.userData.body.setWorldTransform(initialTransform);
    }
  }

  execute() {
    this.events.controllers.added.forEach(c => {
      var controller = c.getComponent(Object3D).object;
      controller.addEventListener("selectstart", this.onSelectStart.bind(this));
      controller.addEventListener("selectend", this.onSelectEnd.bind(this));
    });

    this.cleanIntersected();

    this.queries.controllers.forEach(controller => {
      this.intersectObjects(controller.getComponent(Object3D).object);
    });
  }

  intersectObjects(controller) {
    // Do not highlight when already selected
    if (controller.userData.selected !== undefined) return;
    var line = controller.getObjectByName("line");
    var intersections = this.getIntersections(controller);

    if (intersections.length > 0) {
      var intersection = intersections[0];
      var object = intersection.object;
      object.material.emissive.r = 1;
      intersected.push(object);

      line.scale.z = intersection.distance;
    } else {
      line.scale.z = 5;
    }
  }

  getIntersections(controller) {
    tempMatrix.identity().extractRotation(controller.matrixWorld);

    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
    var objects = this.queries.objects.map(
      o => o.getComponent(Object3D).object
    );

    return raycaster.intersectObjects(objects);
  }

  cleanIntersected() {
    while (intersected.length) {
      var object = intersected.pop();
      object.material.emissive.r = 0;
    }
  }
}
