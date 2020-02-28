import { System } from "ecsy";
import * as THREE from "three";
import {
  Element,
  GLTFLoader,
  Active,
  FloorCollided,
  Floor,
  Shape,
  Ball,
  Colliding,
  CollisionStart,
  Draggable,
  Sound,
  RigidBody
} from "../Components/components.js";
import * as Materials from "../materials.js";
import PositionalAudioPolyphonic from "../vendor/PositionalAudioPolyphonic.js";

export class ElementSystem extends System {
  execute() {
    var entitiesAdded = this.queries.entities.added;
    for (let i = 0; i < entitiesAdded.length; i++) {
      let entity = entitiesAdded[i];
      var component = entity.getComponent(Element);

      const elementTypes = [
        {
          model: "metal",
          restitution: 1,
          draggable: true,
          scale: 1,
          sound: "metal.ogg"
        },
        {
          model: "rubber",
          restitution: 2.5,
          draggable: true,
          scale: 1,
          sound: "rubber.ogg"
        },
        {
          model: "wood",
          restitution: 0.8,
          draggable: true,
          scale: 1,
          sound: "wood.ogg"
        },
        {
          model: "static",
          restitution: 0.1,
          draggable: false,
          scale: 0.3,
          sound: "static.ogg"
        }
      ];

      const config = elementTypes[component.type];

      entity
        .addComponent(GLTFLoader, {
          url: "/assets/models/" + config.model + ".glb",
          onLoaded: model => {
            let mesh = model.children[0];
            let geometry = mesh.geometry;
            if (config.scale) {
              geometry.scale(config.scale, config.scale, config.scale);
              geometry.computeBoundingBox();
            }

            // Compute the boundingbox size to create the physics shape for it
            let min = geometry.boundingBox.min;
            let max = geometry.boundingBox.max;

            let w = Math.abs(max.x - min.x);
            let h = Math.abs(max.y - min.y);
            let d = Math.abs(max.z - min.z);

            mesh.material.envMap = Materials.environmentMap;

            entity.addComponent(Shape, {
              primitive: "box",
              width: w,
              height: h,
              depth: d
            });

            entity.addComponent(Sound, {
              url: config.sound
            });
          }
        })
        .addComponent(RigidBody, {
          weight: 0.0,
          restitution: config.restitution,
          friction: 0.5,
          linearDamping: 0.0,
          angularDamping: 0.0
        });

      if (config.draggable) {
        entity.addComponent(Draggable);
      }
    }

    this.queries.colliding.results.forEach(entity => {
      let collision = entity.getComponent(Colliding);
      let hasBall = entity.hasComponent(Ball);
      let ball = hasBall ? entity : collision.collidingWith[0];
      let block = !hasBall ? entity : collision.collidingWith[0];

      if (block.hasComponent(Floor)) {
        if (ball.hasComponent(Active)) {
          block.getComponent(Sound).sound.play();
          ball.removeComponent(Active);
          // Wait a bit before spawning a new bullet from the generator
          ball.addComponent(FloorCollided);
        }
      } else {
        if (block.hasComponent(Sound)) {
          block.getComponent(Sound).sound.play();
        }
      }
    });
  }
}

ElementSystem.queries = {
  entities: {
    components: [Element],
    listen: {
      added: true
    }
  },
  colliding: {
    components: [CollisionStart]
  }
};
