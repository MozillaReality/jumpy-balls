import { System } from "ecsy";
import * as THREE from "three";
import { Text, Position } from "ecsy-three";
import {
  Level,
  Target,
  Transform,
  GLTFModel,
  GameState,
  BallGenerator,
  Active,
  Parent,
  LevelItem,
  Element
} from "../Components/components.js";
import { levels } from "../levels.js";
import * as Materials from "../materials.js";

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
      // Ball generator
      let ballGenerator = this.world
        .createEntity()
        .addComponent(BallGenerator, {
          position: g.position,
          linearVelocity: g.linearVelocity
        })
        .addComponent(LevelItem);

      if (worldSingleton.getComponent(GameState).playing) {
        ballGenerator.addComponent(Active);
      }

      let linearVelocity = new THREE.Vector3()
        .copy(g.linearVelocity)
        .normalize();

      // Cannon
      this.world
        .createEntity()
        .addComponent(GLTFModel, {
          url: "cannon.glb",
          onLoaded: model => {
            //model.scale.multiplyScalar(-1);
            model.lookAt(linearVelocity);
            const material = model.getChildByName("cannon").material;
            material.envMap = Materials.environmentMap;
          }
        })
        .addComponent(Position, {
          value: new THREE.Vector3().copy(g.position)
        })
        .addComponent(LevelItem)
        .addComponent(Parent, { value: levelGroup });
    });

    // Targets
    level.targets.forEach(t => {
      window.target = this.world
        .createEntity()
        .addComponent(Target)
        .addComponent(GLTFModel, {
          url: "target.glb",
          onLoaded: model => {
            model.children[0].material.envMap = Materials.environmentMap;
          }
        })
        .addComponent(Transform, {
          position: t.position,
          rotation: t.rotation
        })
        .addComponent(LevelItem)
        .addComponent(Parent, { value: levelGroup });
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
