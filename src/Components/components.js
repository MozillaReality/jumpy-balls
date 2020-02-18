import * as THREE from "three";
import { TagComponent } from "ecsy";

export {
  Object3D,
  Parent,
  Environment,
  Visible,
  CameraRig,
  Camera,
  Draggable,
  Scene,
  Dragging,
  Active,
  Transform,
  WebGLRendererContext,
  Geometry,
  GLTFModel,
  RenderPass,
  VRController,
  Material,
  TextGeometry
} from "ecsy-three";

export class LevelItem {
  reset() {}
}

export class Shape {
  reset() {}
}

export class Level {
  constructor() {
    this.value = 0;
  }

  reset() {
    this.value = 0;
  }
}

export class FloorCollided extends TagComponent {}
export class Cleared extends TagComponent {}

export class Element {
  constructor() {}
  reset() {}
}

export class Rotating {
  constructor() {
    this.speed = new THREE.Vector3(0, 0, 0);
  }

  reset() {
    this.speed.set(0, 0, 0);
  }
}

export class Dissolve {
  constructor() {
    this.value = 1;
    this.speed = 1;
  }

  reset() {
    this.value = 1;
    this.speed = 1;
  }
}

export class GameState {
  constructor() {
    this.reset();
  }
  reset() {
    this.playing = false;
    this.prevPlaying = false;
    this.levelFinished = false;
    this.numBallsFailed = 0;
    this.levelStartTime = 0;
    this.gameStartTime = 0;
  }
}

export class BallGenerator {
  constructor() {
    this.position = new THREE.Vector3();
    this.linearVelocity = new THREE.Vector3();
  }

  copy(src) {
    this.position.copy(src.position);
    this.linearVelocity.copy(src.linearVelocity);
  }
  reset() {}
}

export class Ball {
  constructor() {
    this.radius = 0.4;
  }

  reset() {
    this.radius = 0.4;
  }

  copy(src) {
    this.radius = src.radius;
  }
}

export class Target {
  constructor() {
    this.position = new THREE.Vector3();
  }

  reset() {}
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
  reset() {}
}

export class UI extends TagComponent {}

export class Button {
  constructor() {}
  reset() {}
}

export class RaycastReceiver {
  constructor() {
    this.reset();
  }

  reset() {
    this.hovering = false;
    this.selecting = false;

    this.onHover = null;
    this.onEnter = null;
    this.onLeave = null;
    this.onSelectStart = null;
    this.onSelect = null;
    this.onSelectEnd = null;
  }
}
export class Raycaster {
  constructor() {
    this.reset();
  }

  reset() {
    this.enabled = true;
    this.currentEntity = null;
  }
}

export class InputState {
  constructor() {
    this.vrcontrollers = new Map();
    this.keyboard = {};
    this.mouse = {};
    this.gamepads = {};
  }

  reset() {}
}
