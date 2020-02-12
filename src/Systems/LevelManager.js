import { System } from "ecsy";
import { Text } from "ecsy-three";
import {
  Level,
  Target,
  Geometry,
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
    level.generators.forEach(g => {
      // Ball generator
      this.world
        .createEntity()
        .addComponent(BallGenerator, {
          position: g.position,
          linearVelocity: g.linearVelocity
        })
        .addComponent(Active)
        .addComponent(LevelItem);

      this.world
        .createEntity()
        .addComponent(Geometry, { primitive: "sphere", radius: 0.15 })
        .addComponent(Transform, {
          position: g.position,
          rotation: { x: 0, y: 0, z: 0 }
        })
        .addComponent(LevelItem)
        .addComponent(Parent, { value: window.entityScene });
    });

    // Targets
    level.targets.forEach(t => {
      window.target = this.world
        .createEntity()
        .addComponent(Target)
        .addComponent(Geometry, {
          primitive: "torus",
          radius: 0.3,
          tube: 0.02,
          radialSegments: 8,
          tubularSegments: 30
        })
        .addComponent(Transform, {
          position: t.position,
          rotation: t.rotation
        })
        .addComponent(LevelItem)
        .addComponent(Parent, { value: window.entityScene });
    });

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
