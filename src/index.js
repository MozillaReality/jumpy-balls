/* global Ammo THREE WEBVR */
import { World } from "../../node_modules/ecsy/build/ecsy.module.js";
import {
  Geometry,
  Transform,
  Draggable,
  ThreeContext,
  Target,
  GameState,
  Active,
  ExplosiveMesh,
  CameraRig,
  Sky,
  Environment,
  BallGenerator,
  RigidBody
} from "./Components/components.mjs";
import {
  VRControllerSystem,
  TargetSystem,
  RendererSystem,
  DissolveSystem,
  GeometrySystem,
  SkySystem,
  EnvironmentSystem,
  CameraRigSystem,
  FloorCollisionSystem,
  PhysicsSystem,
  BallGeneratorSystem,
  RotatingSystem,
  GameStateSystem,
  ExplosiveMeshSystem,
  BallSystem
} from "./Systems/systems.mjs";

Ammo().then(() => {
  const world = (window.world = new World());
  const scene = new THREE.Scene();

  world
    .registerSingletonComponent(Environment)
    .registerSingletonComponent(ThreeContext)
    .registerSingletonComponent(GameState);

  const renderer = new THREE.WebGLRenderer({ antialias: true });

  world.components.threeContext.renderer = renderer;
  world.components.threeContext.scene = scene;

  world
    .registerSystem(EnvironmentSystem)
    .registerSystem(GeometrySystem)
    .registerSystem(CameraRigSystem)
    .registerSystem(BallGeneratorSystem)
    .registerSystem(BallSystem)
    .registerSystem(VRControllerSystem)
    .registerSystem(GameStateSystem)
    .registerSystem(PhysicsSystem)
    .registerSystem(FloorCollisionSystem)
    .registerSystem(TargetSystem)
    .registerSystem(SkySystem)
    .registerSystem(DissolveSystem)
    .registerSystem(RotatingSystem)
    //.registerSystem(ExplosiveMeshSystem)
    .registerSystem(RendererSystem);

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

    world.createEntity().addComponent(Sky);

    // Ball generator
    world
      .createEntity()
      .addComponent(BallGenerator, { position: { x: 1, y: 2.5, z: 0 } })
      .addComponent(Active);

    world
      .createEntity()
      .addComponent(Geometry, { primitive: "sphere", radius: 0.15 })
      .addComponent(Transform, {
        position: { x: 1, y: 2.5, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      });

    // camera rig & controllers
    world.createEntity().addComponent(CameraRig);

    //

    createGround();
    createBox().addComponent(Transform, {
      position: { x: -0.75, y: 1.5, z: 0 },
      rotation: { x: 0, y: 0, z: 6 }
    });
    /*
    createBox().addComponent(Transform, {
      position: { x: 0, y: 1, z: 0 },
      rotation: { x: 0, y: 0, z: -0.3 }
    });

    createBox().addComponent(Transform, {
      position: { x: 0.5, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0.1 }
    });
    */
    createBox().addComponent(Transform, {
      position: { x: 1, y: 1, z: 0 },
      rotation: { x: 0, y: 0, z: 0.1 }
    });

    createTarget().addComponent(Transform, {
      position: { x: 1.5, y: 0.8, z: 0 },
      rotation: { x: 0, y: Math.PI / 2, z: 0 }
    });

    function createTarget() {
      return world
        .createEntity()
        .addComponent(Target)
        .addComponent(Geometry, {
          primitive: "torus",
          radius: 0.3,
          tube: 0.02,
          radialSegments: 8,
          tubularSegments: 30
        });
    }

    function createBox() {
      const entity = world.createEntity();
      entity
        .addComponent(Geometry, {
          primitive: "box",
          width: 0.3,
          height: 0.03,
          depth: 0.15
        })
        .addComponent(Draggable)
        .addComponent(RigidBody, {
          weight: 0.0,
          restitution: 1,
          friction: 0,
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
        width: 100,
        height: 0.1,
        depth: 100
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

  function animate() {
    world.execute(clock.getDelta(), clock.elapsedTime);
  }
});
