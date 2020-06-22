/* global Ammo */
import * as THREE from "three";
import { System } from "ecsy";
import {
  VRController,
  Draggable,
  ParentObject3D,
  Dragging,
  Object3DComponent,
  Raycaster,
  RaycastReceiver,
  WebGLRendererContext
} from "../Components/components.js";
import { InputSystem } from "ecsy-three";

var raycaster = new THREE.Raycaster();
var tempMatrix = new THREE.Matrix4();
var intersected = [];

function setEmisive(object, color, channel) {
  object.traverse(child => {
    if (child.material && child.material.emissive) {
      if (channel) {
        child.material.emissive[channel] = color;
      } else {
        child.material.emissive.set(color);
      }
    }
  });
}

export class VRControllerInteraction extends System {
  execute() {
    this.queries.dragging.results.forEach(entity => {
      this.reposition(entity.getObject3D(), true);
    });

    this.queries.objects.added.forEach(entity => {
      let object = entity.getObject3D().children[0];
      entity.addComponent(RaycastReceiver, {
        layerMask: 2,
        onHover: (intersection, raycasterEntity) => {
          let lineParent = raycasterEntity.getObject3D();
          let line = lineParent.getObjectByName("line");
          line.scale.z = intersection.distance;
        },
        onEnter: () => {
          setEmisive(object, 0x224455);
        },
        onLeave: raycasterEntity => {
          let lineParent = raycasterEntity.getObject3D();
          let line = lineParent.getObjectByName("line");
          line.scale.z = 10;
          setEmisive(object, 0x000000);
        },
        onSelectStart: this.onSelectStart.bind(this)
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
      entity.addComponent(Raycaster, {
        value: raycaster,
        layerMask: 4
      });

      var geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -1)
      ]);
      var line = new THREE.Line(geometry);
      line.name = "line";
      line.scale.z = 5;

      let obj = entity.getObject3D().getObjectByName("controller");

      this.world
        .createEntity()
        .addComponent(Object3DComponent, { value: line })
        .addComponent(ParentObject3D, { value: obj });
    });

    this.cleanIntersected();
  }

  onSelectStart(intersection, obj) {
    var controller = obj;
    tempMatrix.getInverse(controller.matrixWorld);

    var object = intersection.object.parent;
    object.matrix.premultiply(tempMatrix);
    object.matrix.decompose(object.position, object.quaternion, object.scale);
    setEmisive(object, 1, "b");
    object.userData.previousParent = object.parent;
    controller.add(object);

    object.children[0].material.transparent = true;
    object.children[0].renderOrder = 20;
    object.children[0].material.opacity = 0.5;

    controller.userData.selected = object;
    this.disablePhysics(object);
  }

  onSelectEnd(controller) {
    if (controller.userData.selected !== undefined) {
      var object = controller.userData.selected;
      object.children[0].material.transparent = false;

      object.userData.entity.removeComponent(Dragging);

      object.matrix.premultiply(controller.matrixWorld);
      object.matrix.decompose(object.position, object.quaternion, object.scale);
      setEmisive(object, 0, "b");
      object.userData.previousParent.add(object);

      controller.userData.selected = undefined;
      this.reposition(object);
    }
  }

  disablePhysics(object) {
    // Currently we just move it out from the play area O:)
    const initialTransform = new Ammo.btTransform();
    initialTransform.setIdentity();
    initialTransform.setOrigin(new Ammo.btVector3(0, -10, 0));
    object.userData.body.setWorldTransform(initialTransform);
  }

  reposition(object, world) {
    if (!object.userData.body) {
      return;
    }

    if (world) {
      var position = new THREE.Vector3();
      var scale = new THREE.Vector3();
      var quaternion = new THREE.Quaternion();
      object.updateWorldMatrix(true);
      object.matrixWorld.decompose(position, quaternion, scale);

      var wxform = object.userData.body.getWorldTransform();
      wxform.setIdentity();

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
    }
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
    components: [Draggable, Object3DComponent],
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
