/* global THREE */
import { System } from "../../node_modules/ecsy/build/ecsy.module.js";
import {
  Element,
  Geometry,
  Draggable,
  RigidBody
} from "../Components/components.mjs";

export class ElementSystem extends System {
  init() {
    return {
      queries: {
        entities: {
          components: [Element],
          events: {
            added: { event: "EntityAdded" }
          }
        }
      }
    };
  }

  execute() {
    var events = this.events.entities;
    for (let i = 0; i < events.added.length; i++) {
      var entity = events.added[i];
      var component = entity.getComponent(Element);

      const elementTypes = [
        {width: 0.3, height: 0.03, depth: 0.15, restitution: 1},
        {width: 0.4, height: 0.03, depth: 0.4, restitution: 2},
        {width: 0.3, height: 0.03, depth: 0.15, restitution: 0}
      ];

      const config = elementTypes[component.type];

      entity
        .addComponent(Geometry, {
          primitive: "box",
          width: config.width,
          height: config.height,
          depth: config.depth
        })
        .addComponent(Draggable)
        .addComponent(RigidBody, {
          weight: 0.0,
          restitution: config.restitution,
          friction: 0,
          linearDamping: 0.0,
          angularDamping: 0.0
        });
    }
  }
}
