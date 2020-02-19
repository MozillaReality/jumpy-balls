/* global Ammo */
import * as THREE from "three";
import { System } from "ecsy";
import {
  VRController,
  Draggable,
  Dragging,
  Object3D,
  Raycaster,
  RaycastReceiver,
  WebGLRendererContext
} from "../Components/components.js";
import { InputSystem } from "../Systems/InputSystem.js";

var raycaster = new THREE.Raycaster();
var tempMatrix = new THREE.Matrix4();
var intersected = [];

export class VRControllerInteraction extends System {
  execute() {
    this.queries.dragging.results.forEach(entity => {
      this.reposition(entity.getComponent(Object3D).value, true);
    });

    this.queries.objects.added.forEach(entity => {
      let object = entity.getComponent(Object3D).value.children[0];
      entity.addComponent(RaycastReceiver, {
        onHover: () => {},
        onEnter: () => {
          object.material.emissive.set(0x224455);
        },
        onLeave: () => {
          object.material.emissive.set(0x000000);
        },
        onSelectStart: this.onSelectStart.bind(this)
        //onSelectEnd: this.onSelectEnd.bind(this)
      });
    });

    this.world
      .getSystem(InputSystem)
      .inputStateComponent.vrcontrollers.forEach((state, controller) => {
        if (state.selectEnd) {
          this.onSelectEnd(controller);
        }
      });

    this.queries.controllers.added.forEach(entity => {
      entity.addComponent(Raycaster, { value: raycaster });

      /*
      let geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, -1], 3)
      );

      var line = new THREE.Line(geometry);
      line.name = "line";
      line.scale.z = 5;
      controller.add(line);

      let geometry2 = new THREE.BoxBufferGeometry(0.1, 0.1, 0.1);
      let material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      let cube = new THREE.Mesh(geometry2, material2);
      controller.name = "VRController";
      controller.add(cube);
*/
    });

    this.cleanIntersected();
  }

  onSelectStart(intersection, obj) {
    var controller = obj;
    tempMatrix.getInverse(controller.matrixWorld);

    var object = intersection.object.parent;
    //object.userData.entity.addComponent(Dragging);
    object.matrix.premultiply(tempMatrix);
    object.matrix.decompose(object.position, object.quaternion, object.scale);
    object.children[0].material.emissive.b = 1;
    object.userData.previousParent = object.parent;
    controller.add(object);

    controller.userData.selected = object;
  }

  onSelectEnd(controller) {
    if (controller.userData.selected !== undefined) {
      var object = controller.userData.selected;
      object.userData.entity.removeComponent(Dragging);

      object.matrix.premultiply(controller.matrixWorld);
      object.matrix.decompose(object.position, object.quaternion, object.scale);
      object.children[0].material.emissive.b = 0;
      object.userData.previousParent.add(object);

      controller.userData.selected = undefined;
      this.reposition(object);
    }
  }

  reposition(object, world) {
    if (world) {
      var position = new THREE.Vector3();
      var scale = new THREE.Vector3();
      var quaternion = new THREE.Quaternion();
      object.updateWorldMatrix(true);
      object.matrixWorld.decompose(position, quaternion, scale);

      var wxform = object.userData.body.getWorldTransform();
      wxform.setIdentity();
      var origin = wxform.getOrigin();
      var quat = wxform.getRotation();

      const initialTransform = new Ammo.btTransform();
      initialTransform.setIdentity();
      initialTransform.setOrigin(
        new Ammo.btVector3(position.x, position.y, position.z)
      );
      initialTransform.setRotation(
        new Ammo.btQuaternion(
          quaternion.x,
          quaternion.y,
          quaternion.z,
          quaternion.w
        )
      );
      object.userData.body.setWorldTransform(initialTransform);
    } else {
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

      /*
      var wxform = object.userData.body.getWorldTransform();
      wxform.setIdentity();
      var origin = wxform.getOrigin();
      var quat = wxform.getRotation();
      origin.setValue(object.position.x, object.position.y, object.position.z);
      quat.setValue(
        object.quaternion.x,
        object.quaternion.y,
        object.quaternion.z,
        object.quaternion.w
      );
      */
    }
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
    // @fixme expensive
    var objects = this.queries.objects.results.map(entity => {
      var object = entity.getComponent(Object3D).value;
      object.userData.entity = entity;
      return object;
    });

    return raycaster.intersectObjects(objects);
  }

  cleanIntersected() {
    while (intersected.length) {
      var object = intersected.pop();
      object.material.emissive.r = 0;
    }
  }
}

VRControllerInteraction.queries = {
  controllers: {
    components: [VRController],
    listen: {
      added: true
    }
  },
  objects: {
    components: [Draggable, Object3D],
    listen: {
      added: true
    }
  },
  dragging: { components: [Dragging] },
  rendererContext: {
    components: [WebGLRendererContext],
    mandatory: true
  }
};
