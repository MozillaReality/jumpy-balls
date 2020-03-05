import { System } from "ecsy";
import * as THREE from "three";
import { Text, Position } from "ecsy-three";
import {
  Level,
  Target,
  Play,
  Sound,
  Transform,
  GLTFLoader,
  GameState,
  BallGenerator,
  Draggable,
  Active,
  Parent,
  Animation,
  LevelItem,
  Element
} from "../Components/components.js";
import { levels } from "../levels.js";
import * as Materials from "../materials.js";

const urlParams = new URLSearchParams(window.location.search);
var editMode = urlParams.has("edit");

export class LevelManager extends System {
  execute() {
    this.queries.levels.added.forEach(entity => {
      this.initializeLevel(entity.getComponent(Level).value);
    });

    this.queries.levels.changed.forEach(entity => {
      this.initializeLevel(entity.getComponent(Level).value);
    });
  }

  clearCurrentLevel() {
    var items = this.queries.levelItems.results;
    for (var i = items.length - 1; i >= 0; i--) {
      items[i].remove();
    }
  }

  initializeLevel(levelId) {
    if (levelId > levels.length) {
      levelId = 0;
    }

    let levelLabel = this.world.entityManager.getEntityByName("level");
    if (levelLabel) {
      levelLabel.getMutableComponent(Text).text = levelId;
    }

    let levelGroup = this.world.entityManager.getEntityByName("levelGroup");

    this.clearCurrentLevel();
    var level = levels[levelId];

    // Generators
    let worldSingleton = this.world.entityManager.getEntityByName("singleton");

    level.generators.forEach(g => {
      let linearVelocity = new THREE.Vector3()
        .copy(g.linearVelocity)
        .normalize();

      // Ball generator
      let ballGenerator = this.world
        .createEntity()
        .addComponent(BallGenerator, {
          position: g.position,
          linearVelocity: g.linearVelocity
        })
        .addComponent(LevelItem)
        .addComponent(GLTFLoader, {
          url: "assets/models/cannon.glb",
          onLoaded: (model, gltf) => {
            //model.scale.multiplyScalar(-1);
            model.lookAt(linearVelocity);
            const material = model.getObjectByName("cannon").material;
            material.envMap = Materials.environmentMap;

            let mixer = (model.userData.mixer = new THREE.AnimationMixer(
              model
            ));
            const clip = THREE.AnimationClip.findByName(
              gltf.animations,
              "cannonAction"
            );
            const action = mixer.clipAction(clip, model);
            //action.loop = THREE.LoopOnce;
            model.userData.animationClip = action;
          }
        })
        .addComponent(Animation, { duration: 2.35 })
        .addComponent(Sound, { url: "assets/sounds/cannon.ogg" })
        .addComponent(Position, {
          value: new THREE.Vector3().copy(g.position)
        })
        .addComponent(LevelItem)
        .addComponent(Parent, { value: levelGroup });

      if (editMode) {
        ballGenerator.addComponent(Draggable);
      }

      if (worldSingleton.getComponent(GameState).playing) {
        // ballGenerator.addComponent(Active);
        setTimeout(() => {
          ballGenerator.addComponent(Play);

          setTimeout(() => {
            ballGenerator.addComponent(Active);
          }, 1900);
        }, 2000);
      }
    });

    // Targets
    level.targets.forEach(t => {
      let target = this.world
        .createEntity()
        .addComponent(Target)
        .addComponent(GLTFLoader, {
          url: "assets/models/target.glb",
          onLoaded: model => {
            model.children[0].material.envMap = Materials.environmentMap;
          }
        })
        .addComponent(Transform, {
          position: t.position,
          rotation: t.rotation
        })
        .addComponent(LevelItem)
        .addComponent(Parent, { value: levelGroup })
        .addComponent(Sound, { url: "assets/sounds/target.ogg" });

      if (editMode) {
        target.addComponent(Draggable);
      }
    });

    // Boxes (draggable and fixed)
    level.elements.forEach(element => {
      this.world
        .createEntity()
        .addComponent(Element, { type: element.type })
        .addComponent(Transform, {
          position: element.position,
          rotation: element.rotation
        })
        .addComponent(LevelItem)
        .addComponent(Parent, { value: levelGroup });
    });
  }
}

LevelManager.queries = {
  /* @todo singleton */
  levels: {
    components: [Level],
    listen: {
      added: true,
      changed: true
    }
  },
  levelItems: {
    components: [LevelItem]
  }
};
