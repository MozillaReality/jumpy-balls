import { System } from "ecsy";
import * as THREE from "three";
import { Text } from "ecsy-three";
import {
  Level,
  Target,
  GLTFModel,
  GameState,
  BallGenerator,
  Active,
  Parent,
  Transform,
  LevelItem,
  Element
} from "../Components/components.js";
import { levels } from "../levels.js";

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
    this.world.entityManager
      .getEntityByName("level")
      .getMutableComponent(Text).text = `Level ${levelId}`;

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

      // Cannon
      this.world
        .createEntity()
        .addComponent(GLTFModel, {
          url: "cannon.glb",
          onLoaded: model => {
            model.scale.multiplyScalar(-1);
          }
        })
        .addComponent(Transform, {
          position: g.position,
          rotation: {
            x: THREE.Math.radToDeg(g.linearVelocity.x),
            y: THREE.Math.radToDeg(g.linearVelocity.y),
            z: THREE.Math.radToDeg(g.linearVelocity.z)
          }
        })
        .addComponent(LevelItem)
        .addComponent(Parent, { value: window.entityScene });
    });

    // Targets
    level.targets.forEach(t => {
      window.target = this.world
        .createEntity()
        .addComponent(Target)
        .addComponent(GLTFModel, { url: "target.glb" })
        .addComponent(Transform, {
          position: t.position,
          rotation: t.rotation
        })
        .addComponent(LevelItem)
        .addComponent(Parent, { value: window.entityScene });
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
        .addComponent(LevelItem);
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
