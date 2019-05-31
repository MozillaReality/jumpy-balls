import { System } from "http://192.168.1.129:8080/build/ecsy.module.js";
import {
  Ball,
  Active,
  Transform,
  Geometry,
  BallGenerator
} from "../Components/components.mjs";

export class BallGeneratorSystem extends System {
  init() {
    return {
      queries: {
        entities: {
          components: [BallGenerator, Active],
          events: {
            added: {
              event: "EntityAdded"
            }
          }
        }
      }
    };
  }

  execute() {
    var entities = this.events.entities.added;
    entities.forEach(entity => {
      var component = entity.getComponent(BallGenerator);

      var radius = 0.3;

      // Ball dispatcher object
      var ball = this.world.createEntity();
      ball
        .addComponent(Geometry, { primitive: "sphere", radius: radius })
        .addComponent(Transform, {
          position: component.position,
          rotation: { x: 0, y: 0, z: 0 }
        })
        .addComponent(Ball, { position: component.position, radius: radius })
        .addComponent(Active);

      entity.removeComponent(Active);
    });
  }
}
