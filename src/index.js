/* global Ammo THREE WEBVR */
import { World } from "../../node_modules/ecsy/build/ecsy.module.js";
import {
  Geometry,
  Transform,
  Draggable,
  ThreeContext,
  VRController,
  Target,
  GameState,
  Active,
  Object3D,
  BallGenerator,
  RigidBody
} from "./Components/components.mjs";
import {
  VRControllerSystem,
  TargetSystem,
  GeometrySystem,
  FloorCollisionSystem,
  PhysicsSystem,
  BallGeneratorSystem,
  GameStateSystem,
  BallSystem
} from "./Systems/systems.mjs";

Ammo().then(() => {
  const world = (window.world = new World());

  var group = new THREE.Group();
  var controller1, controller2;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x808080);
  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  world
    .registerSystem(GeometrySystem)
    .registerSystem(BallGeneratorSystem)
    .registerSystem(BallSystem)
    .registerSystem(VRControllerSystem)
    .registerSystem(GameStateSystem)
    .registerSystem(PhysicsSystem)
    .registerSystem(FloorCollisionSystem)
    .registerSystem(TargetSystem);
  world
    .registerSingletonComponent(ThreeContext)
    .registerSingletonComponent(GameState);

  world
    .createEntity()
    .addComponent(BallGenerator, { position: { x: 1, y: 2.5, z: 0 } })
    .addComponent(Active);
  world
    .createEntity()
    .addComponent(Geometry, { primitive: "sphere", radius: 0.3 })
    .addComponent(Transform, {
      position: { x: 1, y: 2.5, z: 0 },
      rotation: { x: 0, y: 0, z: 0 }
    });

  var cameraRig = new THREE.Group();
  cameraRig.add(camera);
  cameraRig.position.set(2, 2, 7);
  scene.add(cameraRig);

  const renderer = new THREE.WebGLRenderer({ antialias: true });

  world.components.threeContext.renderer = renderer;
  world.components.threeContext.scene = scene;

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.shadowMap.enabled = true;
  renderer.vr.enabled = true;
  document.body.appendChild(renderer.domElement);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(WEBVR.createButton(renderer));
  window.addEventListener("resize", onWindowResize, false);
  const clock = new THREE.Clock();

  init();
  function init() {
    scene.add(new THREE.HemisphereLight(0x808080, 0x606060));

    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 6, 0);
    light.castShadow = true;
    light.shadow.camera.top = 2;
    light.shadow.camera.bottom = -2;
    light.shadow.camera.right = 2;
    light.shadow.camera.left = -2;
    light.shadow.mapSize.set(4096, 4096);
    scene.add(light);

    scene.add(group);

    // controllers

    controller1 = renderer.vr.getController(0);
    cameraRig.add(controller1);

    controller2 = renderer.vr.getController(1);
    cameraRig.add(controller2);

    world
      .createEntity()
      .addComponent(VRController, { id: 0 })
      .addComponent(Object3D, { object: controller1 });
    world
      .createEntity()
      .addComponent(VRController, { id: 1 })
      .addComponent(Object3D, { object: controller2 });

    //

    var geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -1)
    ]);

    var line = new THREE.Line(geometry);
    line.name = "line";
    line.scale.z = 5;

    controller1.add(line.clone());
    controller2.add(line.clone());

    createGround();
    createBox().addComponent(Transform, {
      position: { x: -1, y: 1.5, z: 0 },
      rotation: { x: 0, y: 0, z: 6 }
    });
    createBox().addComponent(Transform, {
      position: { x: 0, y: 1, z: 0 },
      rotation: { x: 0, y: 0, z: -0.3 }
    });
    createBox().addComponent(Transform, {
      position: { x: 2.5, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0.1 }
    });
    createBox().addComponent(Transform, {
      position: { x: 1.5, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0.1 }
    });
    //createBox().addComponent(Transform, {position: {x: 2.5, y: 0.2, z:0}, rotation: {x:0,y:0, z: 0.1}});
    //createBox().addComponent(Transform, {position: {x: 3.5, y: 0.2, z:0}, rotation: {x:0,y:0, z: 0.1}});

    createTarget();

    function createTarget() {
      world
        .createEntity()
        .addComponent(Target)
        .addComponent(Geometry, { primitive: "sphere", radius: 0.8 })
        .addComponent(Transform, {
          position: { x: 3, y: 0.8, z: 0 },
          rotation: { x: 0, y: 0, z: 0 }
        });
    }

    function createBox() {
      var s = 0.2;
      const entity = world.createEntity();
      entity
        .addComponent(Geometry, {
          primitive: "box",
          width: 3 * s,
          height: s / 2,
          depth: 3 * s
        })
        .addComponent(Draggable)
        .addComponent(RigidBody, {
          weight: 0.0,
          restitution: 1,
          friction: 1.0,
          linearDamping: 0.0,
          angularDamping: 0.0
        });
      return entity;
    }
  }

  function createGround() {
    world
      .createEntity()
      .addComponent(Geometry, {
        primitive: "box",
        width: 500,
        height: 0.1,
        depth: 500
      })
      .addComponent(Transform, {
        position: { x: 0, y: -0.1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      })
      .addComponent(RigidBody, {
        weight: 0.0,
        restitution: 1.0,
        friction: 1.0,
        linearDamping: 0.0,
        angularDamping: 0.0
      });
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    world.execute(clock.getDelta(), clock.elapsedTime);
    renderer.render(scene, camera);
  }
});
