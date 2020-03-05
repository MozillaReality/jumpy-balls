import * as THREE from "three";
import { TagComponent } from "ecsy";

export {
  Active,
  Animation,
  Camera,
  CameraRig,
  Colliding,
  CollisionStart,
  CollisionStop,
  Draggable,
  Dragging,
  Environment,
  Geometry,
  GLTFLoader,
  GLTFModel,
  InputState,
  Material,
  Object3D,
  Parent,
  ParentObject3D,
  Play,
  Position,
  RenderPass,
  RigidBody,
  Scale,
  Scene,
  Shape,
  Sound,
  Stop,
  TextGeometry,
  Transform,
  Visible,
  VRController,
  WebGLRendererContext
} from "ecsy-three";

export class LevelItem {
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
    this.numBallsTotal = 0;
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

    this.layerMask = 0;
  }
}
export class Raycaster {
  constructor() {
    this.reset();
  }

  reset() {
    this.enabled = true;
    this.currentEntity = null;

    this.layerMask = 0;
  }
}

export class Floor extends TagComponent {}
