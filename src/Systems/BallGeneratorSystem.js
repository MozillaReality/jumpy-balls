import { System } from "../../node_modules/ecsy/build/ecsy.module.js";
import {
  Ball,
  Active,
  Transform,
  Geometry,
  BallGenerator
} from "../Components/components.mjs";

export class BallGeneratorSystem extends System {
  execute() {
    this.queries.entities.added.forEach(entity => {
      var component = entity.getComponent(BallGenerator);

      var radius = 0.1;

      // Ball dispatcher object
      var ball = this.world.createEntity();
      ball
        .addComponent(Geometry, { primitive: "sphere", radius: radius })
        .addComponent(Transform, {
          position: {x:0,y:1, z:0},
          rotation: { x: 0, y: 0, z: 0 }
        })
        .addComponent(Ball, {
          position: component.position,
          radius: radius,
          linearVelocity: component.linearVelocity
        })
        .addComponent(Active);

      entity.removeComponent(Active);
    });
  }
}

BallGeneratorSystem.queries = {
  entities: {
    components: [BallGenerator, Active],
    listen: {
      added: true
    }
  }
};
