import { System } from "ecsy";
import {
  LevelItem,
  Ball,
  Shape,
  Geometry,
  Parent,
  RigidBody
} from "../Components/components.js";

/**
 * Process [Ball] components and adds geometry and rigidbody for the simulation
 */
export class BallSystem extends System {
  execute() {
    this.queries.entities.added.forEach(entity => {
      var ball = entity.getComponent(Ball);
      entity
        .addComponent(Geometry, {
          primitive: "sphere",
          radius: ball.radius
        })
        .addComponent(Shape, {
          primitive: "sphere",
          radius: ball.radius
        })
        .addComponent(LevelItem)
        .addComponent(RigidBody, {
          weight: 10.0,
          restitution: 0.5,
          friction: 0.5,
          linearDamping: 0.0,
          angularDamping: 0.0,
          linearVelocity: ball.linearVelocity
        })
        .addComponent(Parent, { value: window.entityScene });
    });
  }
}

BallSystem.queries = {
  entities: {
    components: [Ball],
    listen: {
      added: true
    }
  }
};
