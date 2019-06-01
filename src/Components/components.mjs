/* global THREE */
export class Geometry {
  constructor() {
    this.primitive = "box";
  }
}

export class Parent {
  constructor() {
    this.parent = null;
  }
}

export class CameraRig {
  constructor() {
    this.leftHand = null;
    this.rightHand = null;
    this.camera = null;
  }
}

export class Material {
  constructor() {
    this.color = 0xff0000;
  }
}

export class Transform {
  constructor() {
    this.position = new THREE.Vector3();
    this.rotation = new THREE.Vector3();
  }

  copy(src) {
    this.position.copy(src.position);
    this.rotation.copy(src.rotation);
  }
}

export class GameState {
  constructor() {
    this.levelFinished = false;
    this.numBallsFailed = 0;
  }
}

export class ThreeContext {
  constructor() {
    this.scene = null;
    this.renderer = null;
  }
}

export class VRController {
  constructor() {
    this.id = 0;
    this.controller = null;
  }
}

export class Draggable {
  constructor() {}
}

export class Active {
  constructor() {}
}

export class Object3D {
  constructor() {
    this.object = null;
  }
}

export class BallGenerator {
  constructor() {
    this.position = new THREE.Vector3();
  }

  copy(src) {
    this.position.copy(src.position);
  }
}

export class Ball {
  constructor() {
    this.position = new THREE.Vector3();
    this.radius = 0.4;
  }

  copy(src) {
    this.position.copy(src.position);
    this.radius = src.radius;
  }
}

export class Target {
  constructor() {
    this.position = new THREE.Vector3();
  }

  copy(src) {
    this.position.copy(src.position);
  }
}

export class RigidBody {
  constructor() {
    this.object = null;
    this.weight = 0;
    this.restitution = 1;
    this.friction = 1;
    this.linearDamping = 0;
    this.angularDamping = 0;
    this.linearVelocity = { x: 0, y: 0, z: 0 };
  }
}
