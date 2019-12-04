import { System } from "ecsy";
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

var levels = [
  {
    targets: [
      {
        position: { x: 1.5, y: 0.8, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
      }
    ],
    generators: [
      {
        position: { x: 1, y: 2.5, z: 0 },
        linearVelocity: { x: -2, y: 3.5, z: 0 }
      }
      //{ position: { x: -1, y: 1, z: 0 } }
    ],
    elements: [
      {
        type: 2,
        position: { x: -0.75, y: 1.5, z: 0 },
        rotation: { x: 0, y: 0, z: 6 }
      },
      {
        type: 0,
        position: { x: -0.2, y: 0.8, z: 0 },
        rotation: { x: 0, y: 0, z: -0.3 }
      },
      {
        type: 1,
        position: { x: 0.5, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0.1 }
      },
      {
        type: 1,
        position: { x: 1, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0.1 }
      },
      {
        type: 3,
        position: { x: 0.6, y: 0.8, z: 0 },
        rotation: { x: 0, y: 0, z: 0.1 }
      }
    ]
  },
  {
    targets: [
      {
        position: { x: 2, y: 1.8, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
      }
    ],
    generators: [
      {
        position: { x: -1, y: 1.5, z: 0 },
        linearVelocity: { x: 2, y: 3.5, z: 0 }
      }
      //{ position: { x: -1, y: 1, z: 0 } }
    ],
    elements: [
      {
        type: 1,
        position: { x: 1.5, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0.1 }
      },
      {
        type: 1,
        position: { x: 1, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0.1 }
      },
      {
        type: 3,
        position: { x: 0.6, y: 0.8, z: 0 },
        rotation: { x: 0, y: 0, z: 0.1 }
      },


    ]
  }
];

export class LevelManager extends System {
  execute(delta, time) {
    this.queries.levels.added.forEach(entity => {
      this.initializeLevel(entity.getComponent(Level).level);
    });

    this.queries.levels.changed.forEach(entity => {
      this.initializeLevel(entity.getComponent(Level).level);
    });
  }

  clearCurrentLevel() {
    var items = this.queries.levelItems;
    for (var i = items.length - 1; i >= 0; i--) {
      console.log(i);
      items[i].remove();
    }
  }

  initializeLevel(levelId) {
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
