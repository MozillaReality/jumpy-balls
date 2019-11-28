import { System } from "ecsy";
import {
  Ball,
  Active,
  Parent,
  Transform,
  Geometry,
  BallGenerator
} from "../Components/components.js";

const RADIUS = 0.1;

export class BallGeneratorSystem extends System {
  execute() {
    this.queries.entities.added.forEach(generator => {
      var ballGeneratorComponent = generator.getComponent(BallGenerator);

      // Ball dispatcher object
      var ball = this.world.createEntity();
      ball
        .addComponent(Geometry, { primitive: "sphere", radius: RADIUS })
        .addComponent(Transform, {
          position: ballGeneratorComponent.position,
          rotation: { x: 0, y: 0, z: 0 }
        })
        .addComponent(Ball, {
          position: ballGeneratorComponent.position,
          radius: RADIUS,
          linearVelocity: ballGeneratorComponent.linearVelocity
        })
        .addComponent(Active)
        .addComponent(Parent, { value: window.entityScene });

      generator.removeComponent(Active);
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
