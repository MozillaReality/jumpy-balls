import { System } from 'http://192.168.1.129:8080/build/ecsy.module.js';
import {
  Ball,
  Geometry,
  RigidBody,
} from '../components.mjs';

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
        },
      }
    }
  }

  execute() {
    var entities = this.events.entities.added;
    entities.forEach(entity => {
      entity
        .addComponent(Geometry, {
          primitive: 'sphere',
          radius: 0.4
        })
        .addComponent(RigidBody, {
          weight: 10.0,
          restitution: 0.5,
          friction: 0.5,
          linearDamping: 0.0,
          angularDamping: 0.0,
          linearVelocity: new THREE.Vector3(-5,15,0)
        });
    });
  }
}
