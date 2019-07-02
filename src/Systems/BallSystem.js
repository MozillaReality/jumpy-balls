/* global THREE */
import { System } from "../../node_modules/ecsy/build/ecsy.module.js";
import {
  LevelItem,
  Ball,
  Shape,
  Geometry,
  RigidBody
} from "../Components/components.mjs";

/**
 * Process [Ball] components and adds geometry and rigidbody for the simulation
 */
export class BallSystem extends System {
  init() {
    return {
      queries: {
        entities: {
          components: [Ball],
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
        });
    });
  }
}
