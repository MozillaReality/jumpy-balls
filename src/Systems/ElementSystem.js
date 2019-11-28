/* global THREE */
import { System } from "ecsy";
import {
  Element,
  GLTFModel,
  Parent,
  Geometry,
  Shape,
  Draggable,
  RigidBody
} from "../Components/components.js";

export class ElementSystem extends System {
  execute() {
    var entitiesAdded = this.queries.entities.added;
    for (let i = 0; i < entitiesAdded.length; i++) {
      var entity = entitiesAdded[i];
      var component = entity.getComponent(Element);

      const elementTypes = [
        {
          width: 0.3,
          height: 0.03,
          depth: 0.15,
          restitution: 1,
          draggable: true
        },
        {
          width: 0.4,
          height: 0.03,
          depth: 0.4,
          restitution: 2,
          draggable: true
        },
        {
          width: 0.3,
          height: 0.1,
          depth: 0.2,
          restitution: 0.8,
          draggable: true
        },
        {
          width: 0.3,
          height: 0.3,
          depth: 0.3,
          restitution: 0.1,
          draggable: false
        }
      ];

      const config = elementTypes[component.type];

      if (component.type === 0) {
        //entity.addComponent(GLTFModel, { url: "ConcreteSlab.glb" });
        entity
          .addComponent(Geometry, {
            primitive: "box",
            width: config.width,
            height: config.height,
            depth: config.depth
          })
          .addComponent(Shape, {
            primitive: "box",
            width: config.width,
            height: config.height,
            depth: config.depth
          })
          .addComponent(Parent, { value: window.entityScene });
      } else {
        entity
          .addComponent(Geometry, {
            primitive: "box",
            width: config.width,
            height: config.height,
            depth: config.depth
          })
          .addComponent(Shape, {
            primitive: "box",
            width: config.width,
            height: config.height,
            depth: config.depth
          })
          .addComponent(Parent, { value: window.entityScene });
      }

      entity.addComponent(RigidBody, {
        weight: 0.0,
        restitution: config.restitution,
        friction: 0,
        linearDamping: 0.0,
        angularDamping: 0.0
      });
      if (config.draggable) {
        entity.addComponent(Draggable);
      }
    }
  }
}

ElementSystem.queries = {
  entities: {
    components: [Element],
    listen: {
      added: true
    }
  }
};
