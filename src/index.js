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
  TextGeometry,
  Transform,
  Visible,
  UI,
  Button,
  WebGLRendererContext
} from "./Components/components.js";

import {
  BallGeneratorSystem,
  CameraRigSystem,
  DissolveSystem,
  ElementSystem,
  FloorCollisionSystem,
  GameStateSystem,
  LevelManager,
  OutputSystem,
  PhysicsSystem,
  RotatingSystem,
  TargetSystem,
  RaycasterSystem,
  UISystem,
  InputSystem,
  VRControllerInteraction
} from "./Systems/systems.mjs";

import {
  GeometrySystem,
  GLTFLoaderSystem,
  TextGeometrySystem,
  VRControllerSystem,
  VisibilitySystem,
  SDFTextSystem,
  Position,
  Text,
  initializeDefault
} from "ecsy-three";
import { Vector3 } from "three";

var world;

function initGame() {
  world = new World();

  world
    .registerSystem(InputSystem)
    .registerSystem(LevelManager)
    .registerSystem(RaycasterSystem)
    .registerSystem(UISystem)
    .registerSystem(DissolveSystem)
    .registerSystem(ElementSystem)
    .registerSystem(BallGeneratorSystem)
    .registerSystem(VRControllerInteraction)
    .registerSystem(VRControllerSystem)
    .registerSystem(CameraRigSystem)
    .registerSystem(GameStateSystem)
    .registerSystem(PhysicsSystem)
    .registerSystem(VisibilitySystem)
    .registerSystem(FloorCollisionSystem)
    .registerSystem(TargetSystem)
    .registerSystem(SDFTextSystem)
    .registerSystem(RotatingSystem)
    .registerSystem(OutputSystem)
    .registerSystem(TextGeometrySystem)
    .registerSystem(GLTFLoaderSystem)
    .registerSystem(GeometrySystem);

  let data = initializeDefault(world, { vr: true });

  var scene = data.entities.scene.getComponent(Object3D).value;
  window.entityScene = data.entities.scene;

  let level = 1;

  // Singleton entity
  world
    .createEntity("singleton")
    .addComponent(Scene, { value: data.entities.scene })
    .addComponent(GameState, {
      levelStartTime: performance.now(),
      gameStartTime: performance.now()
    })
    .addComponent(Level, { value: level });

  world.getSystem(PhysicsSystem).stop();

  init(data);

  function init(data) {

    scene.fog = new THREE.FogExp2(new THREE.Color(0x5ac5dc), 0.05);

    scene.add(new THREE.HemisphereLight(0xCCCCCC, 0x707070));

    var light = new THREE.DirectionalLight(0xAAAAAA);
    light.position.set(0.2, 1.7, 0.7);
    light.castShadow = true;
    light.shadow.camera.top = 1;
    light.shadow.camera.bottom = -1;
    light.shadow.camera.right = 10;
    light.shadow.camera.left = -10;
    light.shadow.mapSize.set(4096, 4096);
    scene.add(light);
    //scene.add( new THREE.CameraHelper( light.shadow.camera ) );

    window.world = world;
    window.Level = Level;

    // Scene
    createScene(data);
    //world.getSystem(GameStateSystem).playGame();

    let startButton = world
      .createEntity("startbutton")
      .addComponent(UI)
      .addComponent(Button, {
        onClick: () => {
          console.log("Let's gooo", this);
          world.getSystem(GameStateSystem).playGame();
          setTimeout(() => {
            startButton.addComponent(Visible, { value: false });
          }, 300);
          //this.world.entityManager.getEntityByName("singleton").getMutableComponent(GameState).playing = true;
        }
      })
      .addComponent(Parent, { value: data.entities.scene })
      .addComponent(Position, { value: new Vector3(-1, 1, -1) });

    world
      .createEntity("numberBallsText")
      .addComponent(Text, {
        color: "#ffffff",
        fontSize: 0.5,
        anchor: "left",
        textAlign: "center",
        baseline: "center",
        font: "assets/PatrickHand-Regular.ttf",
        maxWidth: 10,
        lineHeight: 1.3,
        text: "Balls counter!"
      })
      .addComponent(Parent, { value: data.entities.scene })
      .addComponent(Position, { value: new Vector3(-1, 2, -1) });

    world
      .createEntity("level")
      .addComponent(Text, {
        color: "#ffffff",
        fontSize: 0.5,
        anchor: "left",
        textAlign: "center",
        baseline: "center",
        maxWidth: 10,
        font: "assets/PatrickHand-Regular.ttf",
        lineHeight: 1.3,
        text: "Level: " + level
      })
      .addComponent(Parent, { value: data.entities.scene })
      .addComponent(Position, { value: new Vector3(-1, 3, -1) });

    world
      .createEntity("timer")
      .addComponent(Text, {
        color: "#ffffff",
        fontSize: 0.5,
        anchor: "left",
        textAlign: "center",
        baseline: "center",
        maxWidth: 10,
        font: "assets/PatrickHand-Regular.ttf",
        lineHeight: 1.3,
        text: "Balls counter!"
      })
      .addComponent(Parent, { value: data.entities.scene })
      .addComponent(Position, { value: new Vector3(-1, 4, -1) });

    // @todo This first one remove
    world.execute(0.016, 0);

    data.entities.renderer.getComponent(WebGLRendererContext).value.outputEncoding = THREE.sRGBEncoding;
  }

  function createScene(data) {
    // world.createEntity().addComponent(Sky);
    createFloor(data);

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
      .addComponent(GLTFModel, {
        url: "set.glb",
        onLoaded: model => {
            const cloudsMaterial = model.getChildByName('clouds').material;
            cloudsMaterial.transparent = true;
            cloudsMaterial.fog = false;
            const skyMaterial = model.getChildByName('sky').material;
            skyMaterial.fog = false;
            //model.getChildByName('floor').receiveShadow = true;
          }
      })
      .addComponent(Parent, { value: data.entities.scene });
/*
    world
      .createEntity()
      .addComponent(GLTFModel, { url: "BouncyFrame.glb" })
      .addComponent(Transform, {
        position: { x: 1, y: 2, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      })
      .addComponent(Parent, { value: data.entities.scene });
*/
  }

  function createFloor(data) {
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
