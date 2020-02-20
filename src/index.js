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
  ParentObject3D,
  RigidBody,
  Scene,
  Shape,
  GLTFLoader,
  TextGeometry,
  Transform,
  Visible,
  UI,
  Button,
  WebGLRendererContext
} from "./Components/components.js";

// For debugging
import * as Components from "./Components/components.js";
window.Components = Components;
import * as Systems from "./Systems/systems.mjs";
window.Systems = Systems;

import {
  BallGeneratorSystem,
  CameraRigSystem,
  DissolveSystem,
  ElementSystem,
  FloorCollisionSystem,
  AnimationSystem,
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

const urlParams = new URLSearchParams(window.location.search);

function initGame() {
  world = new World();

  world
    .registerSystem(InputSystem)
    .registerSystem(GameStateSystem)
    .registerSystem(LevelManager)
    .registerSystem(AnimationSystem)
    .registerSystem(RaycasterSystem)
    .registerSystem(UISystem)
    .registerSystem(DissolveSystem)
    .registerSystem(ElementSystem)
    .registerSystem(BallGeneratorSystem)
    .registerSystem(VRControllerInteraction)
    .registerSystem(VRControllerSystem)
    .registerSystem(CameraRigSystem)
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

  let level = urlParams.has("level") ? parseInt(urlParams.get("level")) : 1;

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

    scene.add(new THREE.HemisphereLight(0xcccccc, 0x707070));

    var light = new THREE.DirectionalLight(0xaaaaaa);
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

    createScene(data);

    let startButton = world
      .createEntity("startbutton")
      .addComponent(UI)
      .addComponent(Button, {
        onClick: () => {
          world.getSystem(GameStateSystem).playGame();
          setTimeout(() => {
            startButton.addComponent(Visible, { value: false });
          }, 300);
          //this.world.entityManager.getEntityByName("singleton").getMutableComponent(GameState).playing = true;
        }
      })
      .addComponent(Parent, { value: data.entities.scene })
      .addComponent(Position, { value: new Vector3(-1, 1, -1) })
      .addComponent(Visible, { value: !urlParams.has("autostart") });

    if (urlParams.has("autostart")) {
      world.getSystem(GameStateSystem).playGame();
    }

    // @todo This first one remove
    world.execute(0.016, 0);

    data.entities.renderer.getComponent(
      WebGLRendererContext
    ).value.outputEncoding = THREE.sRGBEncoding;
  }

  function createScene(data) {
    createFloor(data);

    let playingGroup = world
      .createEntity("playingGroup")
      .addComponent(Object3D, { value: new THREE.Group() })
      .addComponent(Parent, { value: data.entities.scene })
      .addComponent(Visible, { value: urlParams.has("autostart") });

    // Scene
    world
      .createEntity("levelGroup")
      .addComponent(Object3D, { value: new THREE.Group() })
      .addComponent(Parent, { value: playingGroup })
      .addComponent(Visible, { value: true });

    world
      .createEntity()
      .addComponent(GLTFLoader, {
        url: "set.glb",
        onLoaded: model => {
          const cloudsMaterial = model.getChildByName("clouds").material;
          cloudsMaterial.transparent = true;
          cloudsMaterial.fog = false;
          const skyMaterial = model.getChildByName("sky").material;
          skyMaterial.fog = false;
          //model.getChildByName('floor').receiveShadow = true;
        }
      })
      .addComponent(Parent, { value: data.entities.scene });

    // panels
    world
      .createEntity("finished")
      .addComponent(
        Text,
        getTextParameters(
          "Finished!\nyour time: 12:30\nballs used: 20",
          "#ffffff",
          0.6,
          "center"
        )
      )
      .addComponent(Parent, { value: data.entities.scene })
      .addComponent(Position, { value: new Vector3(0, 2, -0.5) })
      .addComponent(Visible, { value: false });

    const panelLevel = world
      .createEntity("panelLevel")
      .addComponent(GLTFLoader, {
        url: "panellevel.glb",
        onLoaded: model => {
          model.children[0].material.transparent = true;
          model.children[0].renderOrder = 1;
          world
            .createEntity("levelLabel")
            .addComponent(
              Text,
              getTextParameters("Level", "#20b4d6", 0.09, "center")
            )
            .addComponent(ParentObject3D, { value: model.children[0] })
            .addComponent(Position, { value: new Vector3(0, 0.13, 0.01) });

          world
            .createEntity("level")
            .addComponent(
              Text,
              getTextParameters("1", "#90cdeb", 0.2, "center")
            )
            .addComponent(ParentObject3D, { value: model.children[0] })
            .addComponent(Position, { value: new Vector3(0, 0, 0.01) });

          //model.children[0].lookAt(data.entities.camera.getComponent(Object3D).value);
        }
      })
      .addComponent(Parent, { value: playingGroup });

    const panelInfo = world
      .createEntity("panelInfo")
      .addComponent(GLTFLoader, {
        url: "panelinfo.glb",
        onLoaded: model => {
          model.children[0].material.transparent = true;
          model.children[0].renderOrder = 1;

          world
            .createEntity("numberBallsLabel")
            .addComponent(
              Text,
              getTextParameters("Balls", "#c0095d", 0.13, "center")
            )
            .addComponent(ParentObject3D, { value: model.children[0] })
            .addComponent(Position, { value: new Vector3(-0.29, 0.2, 0.01) });

          world
            .createEntity("numberBalls")
            .addComponent(
              Text,
              getTextParameters("0/0", "#f9258b", 0.15, "center")
            )
            .addComponent(ParentObject3D, { value: model.children[0] })
            .addComponent(Position, { value: new Vector3(-0.31, 0, 0.01) });

          world
            .createEntity("timeLabel")
            .addComponent(
              Text,
              getTextParameters("Time", "#836000", 0.14, "center")
            )
            .addComponent(ParentObject3D, { value: model.children[0] })
            .addComponent(Position, { value: new Vector3(0.25, 0.22, 0.01) });

          world
            .createEntity("totalTimeLabel")
            .addComponent(
              Text,
              getTextParameters("Total", "#836000", 0.08, "center")
            )
            .addComponent(ParentObject3D, { value: model.children[0] })
            .addComponent(Position, { value: new Vector3(0.1, -0.16, 0.01) });

          world
            .createEntity("timer")
            .addComponent(
              Text,
              getTextParameters("00:00", "#ebb808", 0.18, "center")
            )
            .addComponent(ParentObject3D, { value: model.children[0] })
            .addComponent(Position, { value: new Vector3(0.25, 0.04, 0.01) });

          world
            .createEntity("timerTotal")
            .addComponent(
              Text,
              getTextParameters("00:00", "#ebb808", 0.09, "left")
            )
            .addComponent(ParentObject3D, { value: model.children[0] })
            .addComponent(Position, { value: new Vector3(0.25, -0.095, 0.01) });

          //model.children[0].lookAt(data.entities.camera.getComponent(Object3D).value);
        }
      })
      .addComponent(Parent, { value: playingGroup });

    /*
    world
      .createEntity()
      .addComponent(GLTFLoader, { url: "BouncyFrame.glb" })
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

  function getTextParameters(text, color, size, align) {
    return {
      color: color || "0xFFFFFF",
      fontSize: size || 0.5,
      anchor: align || "center",
      textAlign: align || "center",
      baseline: align || "center",
      font: "assets/WetinCaroWant.ttf",
      maxWidth: 10,
      lineHeight: 1.3,
      text: text || "LOREM IPSUM"
    };
  }
}

Ammo().then(initGame);

/*

// Object position helper

window.addEventListener('wheel', ev => {
  var v;
  var pos = world.entityManager.getEntityByName("numberBalls").getMutableComponent(Position);
  if (ev.shiftKey) {
    v = pos.value.x + ev.deltaX / 100;
    pos.value.x = v;
  } else {
    v = pos.value.y + ev.deltaY / 100;
    pos.value.y = v;
  }
  console.log(
    `${Math.floor(pos.value.x * 100) / 100}, ${Math.floor(pos.value.y * 100) / 100}`
    );
});
*/
