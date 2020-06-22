import * as THREE from "three";
import { Component, TagComponent } from "ecsy";
import { Types, ThreeTypes } from "ecsy-three";

export * from "ecsy-three";

export class LevelItem extends Component {}

export class Level extends Component {}
Level.schema = {
  value: { default: 0, type: Types.Number }
};

export class FloorCollided extends TagComponent {}
export class Cleared extends TagComponent {}

export class Element extends Component {}
Element.schema = {
  value: { default: 0, type: Types.Number },
  type: { default: 0, type: Types.Number }
};

export class Rotating extends Component {}
Rotating.schema = {
  speed: {
    default: new THREE.Vector3(0, 0, 0),
    type: ThreeTypes.Vector3Type
  }
};

export class Dissolve extends Component {}
Dissolve.schema = {
  speed: { default: 1, type: Types.Number },
  value: { default: 1, type: Types.Number }
};

export class GameState extends Component {}
GameState.schema = {
  playing: { default: false, type: Types.Boolean },
  prevPlaying: { default: false, type: Types.Boolean },
  levelFinished: { default: false, type: Types.Boolean },
  numBallsFailed: { default: 0, type: Types.Number },
  numBallsTotal: { default: 0, type: Types.Number },
  levelStartTime: { default: 0, type: Types.Number },
  gameStartTime: { default: 0, type: Types.Number }
};

export class BallGenerator extends Component {}
BallGenerator.schema = {
  position: { default: new THREE.Vector3(), type: ThreeTypes.Vector3Type },
  linearVelocity: { default: new THREE.Vector3(), type: ThreeTypes.Vector3Type }
};

export class Ball extends Component {}
Ball.schema = {
  radius: { default: 0.4, type: Types.Number },
  position: { default: new THREE.Vector3(), type: ThreeTypes.Vector3Type },
  linearVelocity: { default: new THREE.Vector3(), type: ThreeTypes.Vector3Type }
};

export class Target extends Component {}
Target.schema = {
  position: { default: new THREE.Vector3(), type: ThreeTypes.Vector3Type }
};

export class UI extends TagComponent {}

export class Button extends Component {}
Button.schema = {
  text: { default: "", type: Types.String },
  onClick: { default: null, type: Types.Object }
};

export class RaycastReceiver extends Component {}
RaycastReceiver.schema = {
  hovering: { default: false, type: Types.Boolean },
  selecting: { default: false, type: Types.Boolean },

  onHover: { default: null, type: Types.Object },
  onEnter: { default: null, type: Types.Object },
  onLeave: { default: null, type: Types.Object },
  onSelectStart: { default: null, type: Types.Object },
  onSelect: { default: null, type: Types.Object },
  onSelectEnd: { default: null, type: Types.Object },

  layerMask: { default: 0, type: Types.Number }
};

export class Raycaster extends Component {}
Raycaster.schema = {
  enabled: { default: true, type: Types.Boolean },
  currentEntity: { default: null, type: Types.Object },
  layerMask: { default: 0, type: Types.Number },
  value: { default: null, type: Types.Object }
};

export class Floor extends TagComponent {}
