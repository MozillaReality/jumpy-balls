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
      let entity = entitiesAdded[i];
      var component = entity.getComponent(Element);

      const elementTypes = [
        {
          model: "metal",
          width: 0.3,
          height: 0.03,
          depth: 0.15,
          restitution: 1,
          draggable: true
        },
        {
          model: "rubber",
          width: 0.4,
          height: 0.03,
          depth: 0.4,
          restitution: 2,
          draggable: true
        },
        {
          model: "wood",
          width: 0.3,
          height: 0.1,
          depth: 0.2,
          restitution: 0.8,
          draggable: true
        },
        {
          model: "static",
          width: 0.3,
          height: 0.3,
          depth: 0.3,
          restitution: 0.1,
          draggable: false,
          scale: 0.3
        }
      ];

      const config = elementTypes[component.type];

      entity
        .addComponent(GLTFModel, {
          url: config.model + ".glb",
          onLoaded: model => {
            let min = model.children[0].geometry.boundingBox.min;
            let max = model.children[0].geometry.boundingBox.max;

            let w = Math.abs(min.x) + Math.abs(max.x);
            let h = Math.abs(min.y) + Math.abs(max.y);
            let d = Math.abs(min.z) + Math.abs(max.z);

            if (config.scale) {
              model.children[0].scale.multiplyScalar(config.scale);
              w*=config.scale;
              h*=config.scale;
              d*=config.scale;
            }

            entity.addComponent(Shape, {
              primitive: "box",
              width: w,
              height: h,
              depth: d
            });
          }
        })
        /*
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
        */
        .addComponent(Parent, { value: window.entityScene });

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
