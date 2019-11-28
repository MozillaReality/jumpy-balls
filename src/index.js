/* global Ammo */
import * as THREE from "three";
import { WEBVR } from "three/examples/jsm/vr/WebVR.js";
import { World } from "ecsy";
import {
  Geometry,
  Transform,
  ThreeContext,
  GameState,
  Shape,
  Level,
  CameraRig,
  Sky,
  Scene,
  Parent,
  Object3D,
  Visible,
  TextGeometry,
  Environment,
  RigidBody
} from "./Components/components.js";
import {
  VRControllerSystem,
  ElementSystem,
  TargetSystem,
  RendererSystem,
  DissolveSystem,
  SkySystem,
  EnvironmentSystem,
  OutputSystem,
  CameraRigSystem,
  FloorCollisionSystem,
  PhysicsSystem,
  BallGeneratorSystem,
  TransformSystem,
  RotatingSystem,
  GameStateSystem,
  LevelManager,
  BallSystem
} from "./Systems/systems.mjs";

import {
  TextGeometrySystem,
  VisibilitySystem,
  GeometrySystem,
  GLTFLoaderSystem
} from "ecsy-three";

var entityScene = null;

function initGame() {
  const world = new World();
  const scene = new THREE.Scene();
  window.scene = scene;

  let singletonEntity = world
    .createEntity()
    .addComponent(Environment)
    .addComponent(ThreeContext)
    .addComponent(GameState);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.shadowMap.enabled = true;
  renderer.vr.enabled = true;
  document.body.appendChild(renderer.domElement);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(WEBVR.createButton(renderer));
  const clock = new THREE.Clock();

  var threeContext = singletonEntity.getMutableComponent(ThreeContext);
  threeContext.renderer = renderer;
  threeContext.scene = scene;

  window.entityScene = entityScene = world
    .createEntity()
    .addComponent(Scene)
    .addComponent(Object3D, { value: scene });

  world
    .registerSystem(EnvironmentSystem)
    .registerSystem(GLTFLoaderSystem)
    .registerSystem(LevelManager)
    .registerSystem(DissolveSystem)
    .registerSystem(ElementSystem)
    .registerSystem(GeometrySystem)
    .registerSystem(CameraRigSystem)
    .registerSystem(BallGeneratorSystem)
    .registerSystem(BallSystem)

    .registerSystem(VRControllerSystem)
    .registerSystem(GameStateSystem)
    .registerSystem(PhysicsSystem)
    .registerSystem(VisibilitySystem)
    .registerSystem(FloorCollisionSystem)
    .registerSystem(TargetSystem)
    .registerSystem(SkySystem)
    .registerSystem(RotatingSystem)
    .registerSystem(OutputSystem)
    .registerSystem(TextGeometrySystem)
    // .registerSystem(ExplosiveMeshSystem)
    .registerSystem(TransformSystem)
    .registerSystem(RendererSystem);

  init();
  function init() {
    scene.add(new THREE.HemisphereLight(0x808080, 0x606060));

    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 4, 0);
    light.castShadow = true;
    light.shadow.camera.top = 1;
    light.shadow.camera.bottom = -1;
    light.shadow.camera.right = 10;
    light.shadow.camera.left = -10;
    light.shadow.mapSize.set(4096, 4096);
    scene.add(light);
    //scene.add( new THREE.CameraHelper( light.shadow.camera ) );

    // camera rig & controllers
    world.createEntity().addComponent(CameraRig);

    // @Hack to workaround singletonComponents
    world.entity = world.createEntity();
    world.entity.addComponent(Level, { level: 0 });

    // Scene
    createScene();
  }

  function createScene() {
    world.createEntity().addComponent(Sky);
    createFloor();

    var text = world.createEntity();
    text.addComponent(TextGeometry, { text: "" }).addComponent(Transform, {
      position: { x: 0, y: 0, z: -3 },
      rotation: { x: 0, y: -0.4, z: 0 }
    });

    window.text = text; //@fixme megahack

    world
      .createEntity()
      .addComponent(TextGeometry, { text: "mozilla" })
      .addComponent(Transform, {
        position: { x: -5, y: 0, z: -1 },
        rotation: { x: 0, y: 0.4, z: 0 }
      });

    //world.createEntity().addComponent(GLTFModel, { url: "BouncyFrame.glb" });
  }

  function createFloor() {
    world
      .createEntity()
      .addComponent(Geometry, {
        primitive: "box",
        width: 100,
        height: 0.1,
        depth: 100
      })
      .addComponent(Shape, {
        primitive: "box",
        width: 100,
        height: 0.1,
        depth: 100
      })
      .addComponent(Visible, { value: false })
      .addComponent(Transform, {
        position: { x: 0, y: -0.05, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      })
      .addComponent(RigidBody, {
        weight: 0.0,
        restitution: 1.0,
        friction: 1.0,
        linearDamping: 0.0,
        angularDamping: 0.0
      })
      .addComponent(Parent, { value: entityScene });
  }

  function animate() {
    world.execute(clock.getDelta(), clock.elapsedTime);
  }
}

Ammo().then(initGame);
