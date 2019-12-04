/* global Ammo */
import * as THREE from "three";
import { World } from "ecsy";
import {
  Environment,
  GameState,
  Geometry,
  Level,
  Object3D,
  Parent,
  RigidBody,
  Scene,
  Shape,
  GLTFModel,
  Sky,
  TextGeometry,
  Transform,
  Visible
} from "./Components/components.js";
import {
  BallGeneratorSystem,
  BallSystem,
  CameraRigSystem,
  DissolveSystem,
  ElementSystem,
  EnvironmentSystem,
  FloorCollisionSystem,
  GameStateSystem,
  LevelManager,
  OutputSystem,
  PhysicsSystem,
  RotatingSystem,
  SkySystem,
  TargetSystem,
  VRControllerSystem
} from "./Systems/systems.mjs";

import {
  GeometrySystem,
  GLTFLoaderSystem,
  TextGeometrySystem,
  VisibilitySystem,
  initializeDefault
} from "ecsy-three";

var world;

function initGame() {
  world = new World();

  world
    .registerSystem(GLTFLoaderSystem)
    .registerSystem(LevelManager)
    .registerSystem(DissolveSystem)
    .registerSystem(ElementSystem)
    .registerSystem(EnvironmentSystem)
    .registerSystem(BallGeneratorSystem)
    .registerSystem(BallSystem)
    .registerSystem(VRControllerSystem)
    .registerSystem(CameraRigSystem)
    .registerSystem(GameStateSystem)
    .registerSystem(PhysicsSystem)
    .registerSystem(VisibilitySystem)
    .registerSystem(FloorCollisionSystem)
    .registerSystem(TargetSystem)
    .registerSystem(SkySystem)
    .registerSystem(RotatingSystem)
    .registerSystem(OutputSystem)
    .registerSystem(TextGeometrySystem)
    .registerSystem(GeometrySystem);

  let data = initializeDefault(world, { vr: true });

  var scene = data.entities.scene.getComponent(Object3D).value;
  window.entityScene = data.entities.scene;

  // Singleton entity
  world
    .createEntity()
    .addComponent(Environment)
    .addComponent(Scene, { value: data.entities.scene })
    .addComponent(GameState);

  init(data);

  function init(data) {
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

    // @Hack to workaround singletonComponents
    world.entity = world.createEntity();
    world.entity.addComponent(Level, { level: 0 });

    // Scene
    createScene(data);

    // @todo This first one remove
    world.execute(0.016, 0);
  }

  function createScene() {
    world.createEntity().addComponent(Sky);
    createFloor();

    var text = world.createEntity();
    text.addComponent(TextGeometry, { text: "" }).addComponent(Transform, {
      position: { x: 0, y: 0, z: -3 },
      rotation: { x: 0, y: -0.4, z: 0 }
    });

    world
      .createEntity()
      .addComponent(TextGeometry, { text: "mozilla" })
      .addComponent(Transform, {
        position: { x: -5, y: 0, z: -1 },
        rotation: { x: 0, y: 0.4, z: 0 }
      });

    world
      .createEntity()
      .addComponent(GLTFModel, { url: "BouncyFrame.glb" })
      .addComponent(Transform, {
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      })
      .addComponent(Parent, { value: data.entities.scene });

    world
      .createEntity()
      .addComponent(GLTFModel, { url: "BouncyFrame.glb" })
      .addComponent(Transform, {
        position: { x: 1, y: 2, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      })
      .addComponent(Parent, { value: data.entities.scene });
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
      .addComponent(Parent, { value: data.entities.scene });
  }
}

Ammo().then(initGame);
